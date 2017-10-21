const TelegramSouth = require('node-telegram-bot-api');
const Swamp = require('./swamp.js');
const secrets = require('../secrets/secrets.js');
const token = secrets.token; 
const bot = new TelegramSouth(token, {polling: true});

var swamp = new Swamp();
var world = swamp.world;

world.addPlayer(3, 3, 'wextia', 'calcium boi');
world.addPlayer(3, 3, 'bones', 'calcium boi');

bot.on('message', (msg) => {
  console.log(
    msg.from.id +
    ' (' + msg.from.username + '): ' +
    msg.text);
});

bot.onText(/move (.+)/, (msg, match) => {
  var player = world.players[msg.from.username];
  player.move(match[1]);
  var y = player.cell.y;
  var x = player.cell.x;

  bot.sendMessage(
    msg.chat.id,
    world.printSurroundings(y, x, 5)
  );
});

bot.onText(/look/, (msg) => {
  var cell = world.players[msg.from.username].cell;

  bot.sendMessage(
    msg.chat.id,
    cell.getInfo(msg.from.username)
  );
});

bot.onText(/\/start/, (msg) => {
  var chatId = msg.chat.id;

  if(!world.players[msg.from.username])
  {
    world.addPlayer(3, 3, msg.from.username, 'calcium boi');
  }

  bot.sendMessage(
    chatId,
    // eslint-disable-next-line no-useless-escape
    // "send \/start to login"
    world.printSurroundings(3,3,5)
  );

});
