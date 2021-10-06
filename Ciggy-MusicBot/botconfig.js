module.exports = {
  Admins: ["UserID", "UserID"], //Admins of the bot
  ExpressServer: true,//If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || ">", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "", //Support Server Link
  Token:  "", //Discord Bot Token
  ClientID:  "", //Discord Client ID
  ClientSecret:  "", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  CallbackURL: "/api/callback", //Discord OAuth2 Callback URL
  "24/7": false, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "nirvana rocks", //A Secret like a password
  IconURL:
    "https://github.com/thelastcig/nda/blob/master/donelogo.gif?raw=true", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  EmbedColor: "RANDOM", //Color of most embeds | Dont edit unless you want a specific color instead of a random one each time https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif
  Permissions: 2205280576, //Bot Inviting Permissions
  Website: process.env.Website || "0.0.0.0", //Website where it was hosted at includes http or https || Use "0.0.0.0" if you using Heroku

  //Lavalink
   Lavalink: {
    id: "Main",
    host: "lava.link",
    port: 80,
    pass: "friday", 
    secure: false, // Set this to true if you're self-hosting lavalink on replit.
  },


  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "64caeb7783e74c64a037718708a51823", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "4fc60f69fda042b680e165261f5ef2c9", //Spotify Client Secret
  },
};
