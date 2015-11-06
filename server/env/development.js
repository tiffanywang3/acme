module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "MXisyz23BeK6SmGTaRBeAF9vM",
    "consumerSecret": "pZHbo18NuptDUDIxMco4VMup8q88ArB132j7bgknYRXoUNF5Z6",
    "callbackUrl": "http://127.0.0.1:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "INSERT_FACEBOOK_CLIENTID_HERE",
    "clientSecret": "INSERT_FACEBOOK_CLIENT_SECRET_HERE",
    "callbackURL": "INSERT_FACEBOOK_CALLBACK_HERE"
  },
  "GOOGLE": {
    "clientID": "108733817637-mom8unaj1ohoq7ft4roqav77utrdqv9v.apps.googleusercontent.com",
    "clientSecret": "xCDaRh93UleJaxJZxARrbHAo",
    "callbackURL": "http://127.0.0.1:1337/auth/google/callback"
  }
};