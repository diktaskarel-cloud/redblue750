require('dotenv').config();
const mineflayer = require('mineflayer');
const { MicrosoftAuthenticator } = require('mineflayer-microsoft');

const auth = new MicrosoftAuthenticator({
  email: diktas.karel@gmail.com,
  password: RedBlue005
});

auth.getToken().then(token => {
  const bot = mineflayer.createBot({
    host: donutsmp.net,
    port: 25565,
    username: token.username,
    auth: 'microsoft',
    accessToken: token.accessToken
  });

  bot.on('login', () => console.log('Bot connecté avec Microsoft ! AFK activé.'));

  bot.on('end', () => {
    console.log('Bot déconnecté, reconnexion...');
    setTimeout(() => auth.getToken().then(t => bot.connect()), 5000);
  });

  bot.on('message', msg => console.log(msg.toAnsi()));
}).catch(err => console.error('Erreur authentification Microsoft :', err));
