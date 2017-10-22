const TelegramSouth = require('node-telegram-bot-api');
const Swamp = require('./swamp.js');
const secrets = require('../secrets/secrets.js');
const token = secrets.token; 
const bot = new TelegramSouth(token, {polling: true});

var swamp = new Swamp();
var world = swamp.world;

// world.addPlayer(3, 3, 'wextia', 'calcium boi');
// world.addPlayer(3, 3, 'bones', 'calcium boi');

bot.on('message', (msg) => {
  console.log(
    msg.from.id +
    ' (' + msg.from.username + '): ' +
    msg.text);
});

function playerExists(msg)
{
  var name = msg.from.username;
  if(world.players[name])
  {
    return true;
  }
  bot.sendMessage(
    msg.chat.id,
    // eslint-disable-next-line no-useless-escape
    'yO what de fucc i dont know you. logIN with \/start'
  );
  return false;
}

bot.onText(/\/ranking/, (msg) => {
  if(!playerExists(msg)){ return; }

  var ret = 'ranKING?:\n';
  for(var key in world.players)
  {
    var player = world.players[key];
    ret += player.name;
    if(player.lair)
    {
      ret += ' -> bois in lair: ' + player.lair.villagers;
    }
    else
    {
      ret += ' has no LaIR???? wat tGe FUCC';
    }
    ret += '\n';
  }

  bot.sendMessage(
    msg.chat.id,
    ret
  );
});

bot.onText(/bork/, (msg) => {
  bot.sendAudio(msg.chat.id, 'sounds/bork.mp3');
});

bot.onText(/move (.+)/, (msg, match) => {
  if(!playerExists(msg)){ return; }

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
  if(!playerExists(msg)){ return; }
  var player = world.players[msg.from.username];
  bot.sendMessage(
    msg.chat.id,
    player.getInfo()
  );
});

bot.onText(/deposit/, (msg) => {
  if(!playerExists(msg)){ return; }
  var player = world.players[msg.from.username];
  var lair = player.cell.lair;
  if(!lair || lair.owner.name !== player.name)
  {

    bot.sendMessage(
      msg.chat.id,
      'U CAaNNOOT maKE a D E P O S I T here!!??\n' + 
      'Go TO YOUR! lair!!!'
    );
    return;
  }

  lair.villagers += player.kidnapped;
  player.kidnapped = 0;
  bot.sendMessage(
    msg.chat.id,
    'U mADE! A dDEEPOSIT! go F E TCH MOre bois!!'
  );
});

function warnNoLair(msg)
{
  bot.sendMessage(
    msg.chat.id,
    'YOU CANNOT KIDNAP If nO lairrrrr',
    {
      'reply_markup': {
        'keyboard': [
          ['move north'],
          ['move west', 'move east'],
          ['move south'],
          ['build lair']
        ]}
    });
}

bot.onText(/kidnap (.+)/, (msg, match) => {
  if(!playerExists(msg)){ return; }
  var player = world.players[msg.from.username];
  if(!player.lair){ warnNoLair(msg); return; }

  if(!player.cell.village && !player.cell.lair)
  {
    bot.sendMessage(
      msg.chat.id,
      'yO!!! gO 2 a VILLAg oR a LAIR!!! theRE isS noONe here!?'      
    );
    return;
  }

  var ammount = parseInt(match[1]);

  if(ammount < 0)
  {
    bot.sendMessage(
      msg.chat.id,
      'U cannot kidnap negative people dumbass'
    );
    return;
  }

  if(player.kidnapped + ammount > player.capacity)
  {
    bot.sendMessage(
      msg.chat.id,
      'Uu caNNOT kndinap any more BOieS!\n' +
      'max bois you CaN HANDLE: ' + player.capacity + '\n'
    );
    return;
  }

  if(world.kidnap(player, player.cell, ammount))
  {
    bot.sendMessage(
      msg.chat.id,
      'U kidnapped ' + ammount + ' bois!\n' +
      'max bois you CaN HANDLE: ' + player.capacity + '\n'
    );
    return;
  }
  bot.sendMessage(
    msg.chat.id,
    'NOt enough bois in thiS PlAEC?!!'
  );
});

bot.onText(/\/look/, (msg) => {
  if(!playerExists(msg)){ return; }
  var cell = world.players[msg.from.username].cell;

  bot.sendMessage(
    msg.chat.id,
    cell.getInfo(msg.from.username)
  );
});

function warnLair(msg)
{
  bot.sendMessage(
    msg.chat.id,
    'You already have a lair DUDE',
    {
      'reply_markup': {
        'keyboard': [
          ['move north'],
          ['move west', 'move east'],
          ['move south'],
          ['kidnap 10', 'deposit']
        ]}
    });
}

bot.onText(/build lair/, (msg) => {
  if(!playerExists(msg)){ return; }
  var player = world.players[msg.from.username];
  if(player.lair) { warnLair(msg); return; }
  if(world.addLair(player.cell, player.name + '\'s lair', player))
  {
    bot.sendMessage(
      msg.chat.id,
      'Your lair has been built...',
      {
        'reply_markup': {
          'keyboard': [
            ['move north'],
            ['move west', 'move east'],
            ['move south'],
            ['kidnap 10', 'deposit']
          ]}
      });
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

function playerLoggedIn(msg)
{
  if(!world.players[msg.from.username])
  {
    return false;
  }
  bot.sendMessage(
    msg.from.username,
    'u alred logged in boie'
  );
  return true;
}

function greet(msg)
{
  var player = world.players[msg.from.username];
  bot.sendMessage(
    msg.chat.id,
    'welCUM tO SWAMPYY LANDS\n' +
    world.printSurroundings(player.cell.y, player.cell.x, 5),
    {
      'reply_markup': {
        'keyboard': [
          ['move north'],
          ['move west', 'move east'],
          ['move south'],
          ['build lair']
        ]}
    });
}

bot.onText(/👻 h\*cky spooker/, (msg) => {
  if(playerLoggedIn(msg)) { return; }
  world.addPlayer(3,3, msg.from.username, 'h*cky spooker');
  greet(msg);
});

bot.onText(/🤡 laugh buddy/, (msg) => {
  if(playerLoggedIn(msg)) { return; }
  world.addPlayer(3,3, msg.from.username, 'laugh buddy');
  greet(msg);
});

bot.onText(/🦑 inky pupper/, (msg) => {
  if(playerLoggedIn(msg)) { return; }
  world.addPlayer(3,3, msg.from.username, 'inky pupper');
  greet(msg);
});

bot.onText(/💀 calcium boi/, (msg) => {
  if(playerLoggedIn(msg)) { return; }
  world.addPlayer(3,3, msg.from.username, 'calcium boi');
  greet(msg);
});

bot.onText(/\/start/, (msg) => {
  var chatId = msg.chat.id;

  if(world.players[msg.from.username])
  {
    bot.sendMessage(
      chatId,
      'u alred logged in boie',
      {
        'reply_markup': {
          'keyboard': [
            ['move north'],
            ['move west', 'move east'],
            ['move south'],
            ['build lair']
          ]}
      });
    return;
  }

  bot.sendMessage(
    chatId,
    'HEllO! What kind of spookThinG are you, frinedo?',
    {
      'reply_markup': {
        'keyboard': [
          ['👻 h*cky spooker', '🤡 laugh buddy'],
          ['🦑 inky pupper', '💀 calcium boi']
        ]}
    });
});
