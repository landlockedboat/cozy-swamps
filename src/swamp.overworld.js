var fs = require("fs");
var overworld = {};


var data = fs.readFileSync("./data/overworld.data", "utf8");
overworld = JSON.parse(data);

overworld.emojis =
  {
    0: "🌱",
    1: "🌲",
    blank: "🌫",
    player: "🐶",
    user: "🦊"
  };

overworld.emojify = function (x, y, radius)
{
  var ret = "";
  for(var i = y - radius; i < y + radius; i++)
  {
    for(var j = x - radius; j < x + radius; j++)
    {

      if(i < 0 || i >= this.length || j < 0 || j >= this[0].length)
      {
        ret += this.emojis.blank;
        continue;
      }

      var value = this[i][j];

      if(value < 0)
      {
        ret += this.emojis.blank;
        continue;
      }

      if(i === y && j === x)
      {
        ret += this.emojis.player;
        continue;
      }

      var user = this.users.getFromPos(j, i);

      if(user != null)
      {
        ret += this.emojis.user;
        continue;
      }
      
      ret += this.emojis[value];
    }
    ret += "\n";
  }
  return ret;
};

module.exports = overworld;

