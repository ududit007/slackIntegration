import slack
from datetime import datetime, timedelta

from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .constants import MESSAGES_PER_PAGE
from .models import Token, Channel, Conversation, Sender


class CreateTokenApiView(APIView):
    """
    API View to save token in db and return channel list
    """

    def post(self, request):
        """
        Save token in db, get channel list from slack
        :param request: request object
        :return: response object with channel list
        """
        token_team = request.data.get('token_team')
        token_object, created = Token.objects.get_or_create(token_team=token_team)
        channel_list = []
        channel_object_list = []
        client = slack.WebClient(token=token_team)
        res = client.conversations_list()

        for channel in res['channels']:
            channel_id = channel.get('id')
            channel_name = channel.get('name')
            channel_object_list.append(
                Channel(
                    channel_id=channel_id,
                    channel_name=channel_name,
                    token=token_object
                )
            )
            channel_list.append({
                'channel_id': channel_id,
                'channel_name': channel.get('name'),
                'token_team': token_team
            })
        Channel.objects.filter(token=token_object.id).delete()
        Channel.objects.bulk_create(channel_object_list)

        return Response(channel_list)


class GetConversationApiView(ListAPIView):
    queryset = []

    def sender_details(self, sender_id, token_team):
        """
        Get message sender details using slack sdk
        :param sender_id: sender id from message
        :param token_team: token
        :return: dictionary with sender details
        """
        client = slack.WebClient(token=token_team)
        res = client.users_info(user=sender_id)
        res = res['user'].get('profile')
        detail = {
            'sender_id': sender_id,
            'real_name': res.get('real_name', ''),
            'display_name': res.get('display_name', ''),
            'email': res.get('email', '')
        }

        return detail

    def message_details(self, channel_id, client, thread_ts, obj, token_team):
        sender_details = []
        thread_conversation_list = []
        response = client.conversations_replies(
            channel=channel_id,
            ts=thread_ts
        )
        threaded_messages = response['messages']
        for msg in threaded_messages:
            message = msg.get('text')
            message_date = float(msg.get('ts'))
            message_date = datetime.fromtimestamp(message_date)
            sender_id = msg.get('user') if msg.get('user') else msg.get('bot_id')
            reactions = len(msg.get('reactions')) if msg.get('reactions') else 0

            if not any(d['sender_id'] == sender_id for d in sender_details):
                if not (sender_id.startswith('B')):
                    sender_dict = obj.sender_details(sender_id, token_team)

                else:
                    sender_dict = {
                        'sender_id': sender_id,
                        'real_name': "bot",
                        'display_name': "bot",
                        'email': ""
                    }

                sender_details.append(sender_dict)

            thread_conversation_list.append({
                'message': message,
                'message_date': message_date.strftime("%d/%m/%Y"),
                'sender_id': sender_id,
                'channel': channel_id,
                'reactions': reactions
            })
            for item in thread_conversation_list:
                for sender in sender_details:
                    if item['sender_id'] == sender['sender_id']:
                        item.update({
                            'sender_name': sender['real_name'],
                            'sender_email': sender['email']
                        })
        return thread_conversation_list

    def list(self, request, *args, **kwargs):
        """
        get all messages from the channel using slack sdk
        :param request: request object
        :param args: extra argument
        :param kwargs: extra arguments e.g: url parameters
        :return: response object with messages
        """
        obj = GetConversationApiView()

        channel_id_param = request.query_params.get('id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        start_date = datetime.strptime(start_date, "%Y-%m-%d")
        end_date = datetime.strptime(end_date, "%Y-%m-%d")
        end_date = end_date + timedelta(days=1)
        start_date = datetime.timestamp(start_date)
        end_date = datetime.timestamp(end_date)
        conversation_list = []
        conversation_objects_list = []
        sender_object_list = []
        sender_details = []

        channel_obj = get_object_or_404(
            Channel.objects.select_related('token'),
            channel_id=channel_id_param
        )

        channel_id = channel_obj.channel_id
        token_team = channel_obj.token.token_team
        client = slack.WebClient(token=token_team)

        # To get list of users of selected channel
        res = client.channels_info(channel=channel_id)
        user_list = res['channel'].get('members')

        response = client.conversations_history(
            channel=channel_id,
            limit=MESSAGES_PER_PAGE,
            oldest=int(start_date),
            latest=int(end_date)
        )
        assert response["ok"]
        messages_all = response['messages']

        for msg in messages_all:
            thread_ts = msg.get('thread_ts') if msg.get('thread_ts') else 0
            if thread_ts:
                thread_conversation_list = obj.message_details(channel_id, client, thread_ts, obj, token_team)
            message = msg.get('text')
            message_date = float(msg.get('ts'))
            message_date = datetime.fromtimestamp(message_date)
            sender_id = msg.get('user') if msg.get('user') else msg.get('bot_id')
            reactions = len(msg.get('reactions')) if msg.get('reactions') else 0

            if not any(d['sender_id'] == sender_id for d in sender_details):
                if not (sender_id.startswith('B')):
                    sender_dict = obj.sender_details(sender_id, token_team)

                else:
                    sender_dict = {
                        'sender_id': sender_id,
                        'real_name': "bot",
                        'display_name': "bot",
                        'email': ""
                    }

                sender_details.append(sender_dict)
                sender_object_list.append(
                    Sender(
                        real_name=sender_dict.get('real_name'),
                        display_name=sender_dict.get('display_name'),
                        email=sender_dict.get('email'),
                        sender_id=sender_dict.get('sender_id'),
                        channel=channel_obj
                    )
                )

            conversation_objects_list.append(
                Conversation(
                    message=message,
                    message_date=message_date,
                    sender_id=sender_id,
                    channel=channel_obj
                )
            )
            conversation_list.append({
                'message': message,
                'message_date': message_date.strftime("%d/%m/%Y"),
                'sender_id': sender_id,
                'channel': channel_id,
                'reactions': reactions,
                'threaded_message': thread_conversation_list if thread_ts else None
            })
            for item in conversation_list:
                for sender in sender_details:
                    if item['sender_id'] == sender['sender_id']:
                        item.update({
                            'sender_name': sender['real_name'],
                            'sender_email': sender['email']
                        })
        channel_user = []
        for user in user_list:
            for sender in sender_details:
                if user == sender['sender_id']:
                    channel_user.append({user:sender['real_name']})

        conversation_user_list=[]
        conversation_user_list.append({'conversation_list': conversation_list, 'channel_user': channel_user})
        Sender.objects.filter(channel=channel_obj.id).delete()
        Conversation.objects.filter(channel=channel_obj.id).delete()
        Sender.objects.bulk_create(sender_object_list)
        Conversation.objects.bulk_create(conversation_objects_list)

        return Response(conversation_user_list)



