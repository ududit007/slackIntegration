from django.db import models


class Token(models.Model):
    token_team = models.CharField(max_length=100, null=False, blank=False)
    team_id = models.CharField(max_length=100, null=True, blank=False)
    team_name = models.CharField(max_length=100, null=True, blank=False)

    def __str__(self):
        return '{}'.format(self.token_team)

    def __repr__(self):
        return '<Token {}>'.format(self.token_team)

    class Meta:
        db_table = 'token'
        verbose_name = 'Token'


class Channel(models.Model):
    channel_id = models.CharField(max_length=20)
    channel_name = models.CharField(max_length=50)
    token = models.ForeignKey(Token, on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.channel_name)

    def __repr__(self):
        return '<Channel {}>'.format(self.channel_name)

    class Meta:
        db_table = 'channel'
        verbose_name = 'Channel'


class Conversation(models.Model):
    message = models.CharField(max_length=200, null=True, blank=True)
    message_date = models.DateTimeField()
    sender_id = models.CharField(max_length=20)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.message)

    def __repr__(self):
        return '<Conversation {}>'.format(self.message)

    class Meta:
        db_table = 'conversation'
        verbose_name = 'Conversation'


class Sender(models.Model):
    real_name = models.CharField(max_length=50, null=True, blank=True)
    display_name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    sender_id = models.CharField(max_length=50, null=True, blank=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.real_name)

    def __repr__(self):
        return '<Sender {}>'.format(self.real_name)

    class Meta:
        db_table = 'sender'
        verbose_name = 'Sender'