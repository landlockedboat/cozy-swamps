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

bot.onText(/\/me/, (msg) => {
  var player = world.players[msg.from.username];
  bot.sendMessage(
    msg.chat.id,
    player.getInfo()
  );
});

bot.onText(/kidnap (.+)/, (msg, match) => {
  var player = world.players[msg.from.username];

  if(!player.cell.village)
  {
    bot.sendMessage(
      msg.chat.id,
      'There is no village here dude'      
    );
    return;
  }

  var ammount = parseInt(match[1]);
  if(world.kidnap(player, player.cell.village, ammount))
  {
    bot.sendMessage(
      msg.chat.id,
      'U kidnapped ' + ammount + ' bois'
    );
    return;
  }
  bot.sendMessage(
    msg.chat.id,
    'NOt enough bois in village!!'
  );
});

bot.onText(/\/look/, (msg) => {
  var cell = world.players[msg.from.username].cell;

  bot.sendMessage(
    msg.chat.id,
    cell.getInfo(msg.from.username)
  );
});

bot.onText(/build lair/, (msg) => {
  var player = world.players[msg.from.username];
  if(world.addLair(player.cell, player.name + '\'s lair', player))
  {
    bot.sendMessage(
      msg.chat.id,
      'Your lair has been built...'
    );
  }
  else
  {
    bot.sendMessage(
      msg.chat.id,
      'You cannot build a lair here!'
    );
  }

  bot.sendMessage(
    msg.chat.id,
    player.cell.getInfo(msg.from.username)
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
