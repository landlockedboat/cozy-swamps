const TelegramBot = require("node-telegram-bot-api");
const swamp = require("./swamp.js");
const secrets = require("../secrets/secrets.js");
const token = secrets.token; 
const bot = new TelegramBot(token, {polling: true});

const users = swamp.users;

bot.on("message", (msg) => {
  console.log(
    msg.from.id +
    " (" + msg.from.username + "): " +
    msg.text);
});

function printLoginInfo(chatId)
{
  bot.sendMessage(
    chatId,
    // eslint-disable-next-line no-useless-escape
    "send \/start to login"
  );
}

bot.onText(/\/start/, (msg) => {
  var chatId = msg.chat.id;
  if(!users.exists(msg.from))
  {
    users.add(msg.from);
    console.log("New user added: " + msg.from.username);
    console.log(users.list);
    bot.sendMessage(chatId, "u logged in success");
  }
  else
  {
    bot.sendMessage(chatId, "u already logged");
  }
});

bot.onText(/move (.+)/, (msg, match) => {
  if(!users.exists(msg.from))
  {
    printLoginInfo(msg.chat.id);
    return;
  }

  if(users.move(msg.from.id, match[1]))
  {
    // user moved
  }
  else
  {
    // user not moved
  }

  showKeyboard(msg.chat.id, msg.from);
});

function showKeyboard(chatId, user)
{
  bot.sendMessage(chatId, users.getInfo(user.id), {
    "reply_markup": {
      "keyboard": 
      [
        ["bup", "move north", "bup"],
        ["move west", "look", "move east"],
        ["bup", "move south", "bup"],
      ]
    }
  });
}


