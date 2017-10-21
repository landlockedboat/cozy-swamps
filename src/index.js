const TelegramBot = require('node-telegram-bot-api');
const Swamp = require('./swamp.js');
const secrets = require('../secrets/secrets.js');
const token = secrets.token; 
const bot = new TelegramBot(token, {polling: true});

var swamp = new Swamp();

swamp.world.addPlayer(3, 3, 'wextia', 'calcium boi');

bot.on('message', (msg) => {
  console.log(
    msg.from.id +
    ' (' + msg.from.username + '): ' +
    msg.text);
});

bot.onText(/move (.+)/, (msg, match) => {
  swamp.world.players[msg.from.username].move(match[1]);

  bot.sendMessage(
    msg.chat.id,
    // eslint-disable-next-line no-useless-escape
    // "send \/start to login"
    swamp.world.printSurroundings(3,3,5)
  );
});

bot.onText(/\/start/, (msg) => {
  var chatId = msg.chat.id;

  if(!swamp.world.players[msg.from.username])
  {
    swamp.world.addPlayer(3, 3, msg.from.username, 'calcium boi');
  }

  bot.sendMessage(
    chatId,
    // eslint-disable-next-line no-useless-escape
    // "send \/start to login"
    swamp.world.printSurroundings(3,3,5)
  );

});
