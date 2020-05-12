const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

export const uiConst = {
    url: process.env.REACT_APP_URL,
    clientId: clientId,
    clientSecret: clientSecret,
    siginInImageUrl: "https://api.slack.com/img/sign_in_with_slack.png",
    slackTokenUrl: `https://slack.com/api/oauth.v2.access?client_id=${clientId}&client_secret=${clientSecret}&code=`,
    slackAuthUrl: `https://slack.com/oauth/v2/authorize?user_scope=channels:read,users:read,groups:read,mpim:read,im:read,channels:history,groups:history,mpim:history,im:history,users:read.email&client_id=${clientId}`
};



