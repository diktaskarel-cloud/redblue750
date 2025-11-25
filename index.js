require('dotenv').config();
const mineflayer = require('mineflayer');
const { MicrosoftAuthenticator } = require('mineflayer-microsoft');

const auth = new MicrosoftAuthenticator({
  email: process.env.MINECRAFT_EMAIL,
  password: process.env.MINECRAFT_PASSWORD
});

auth.getToken().then(token => {
  const bot = mineflayer.createBot({
    host: process.env.MINECRAFT_SERVER,
    port: parseInt(process.env.MINECRAFT_PORT),
    username: token.username,
    auth: 'microsoft',
    accessToken: token.accessToken
  });

  bot.on('login', () => console.log('Bot connecté via Microsoft !'));

  bot.on('end', () => {
    console.log('Bot déconnecté, reconnexion...');
    setTimeout(() => auth.getToken().then(t => bot.connect()), 5000);
  });

  bot.on('message', msg => console.log(msg.toAnsi()));
}).catch(err => console.error('Erreur Microsoft Auth :', err));
