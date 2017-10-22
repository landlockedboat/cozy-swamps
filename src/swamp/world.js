var Village = require('./world/village.js');
var Tile = require('./world/tile.js');
var Cell = require('./world/cell.js');
var Player = require('./world/player.js');
var Lair = require('./world/lair.js');

module.exports = function World()
{
  this.map = generateMap();
  this.printSurroundings = worldPrintSurroundings;
  this.players = {};
  this.addPlayer = function (y, x, name, race)
  {
    var newPlayer = new Player(this.map[y][x], name, race);
    this.players[name] = newPlayer;
    console.log('New player added: ' + name);
    return newPlayer;
  };
  this.addLair = function (cell, name, player)
  {
    if(cell.lair || cell.village)
    {
      return false;
    }
    cell.lair = new Lair(cell, name, player);     
    console.log("New lair added: \"" + name + "\" of " + player.name);
    return true;
  };
  this.kidnap = function (player, cell, ammount)
  {
    var place;
    if(cell.village)
    {
      place = cell.village;
    }
    else if(cell.lair)
    {
      place = cell.lair;
    }

    if(!place){ return false }

    var pop = place.villagers;
    if(ammount > pop)
    {
      return false;
    }

    player.kidnapped += ammount;
    place.villagers -= ammount;
    return true;
  };
};

function generateMap()
{
  var fs = require('fs');

  var data = fs.readFileSync('./data/overworld.data', 'utf8');
  var map = JSON.parse(data);

  var ret = [];
  for(var i = 0; i < map.length; i++)
  {
    ret[i] = [];
    for(var j = 0; j < map[0].length; j++)
    {
      var type;
      switch(map[i][j])
      {
      case 0:
        type = 'ground';
        break;
      case 1:
        type = 'wall';
        break;
      case 2:
        type = 'village';
        break;
      default:
        type = 'unknown';
        break;
      }

      var cellNorth;
      if(i > 0)
      {
        cellNorth = ret[i - 1][j];
      }
      var cellWest;
      if(j > 0)
      {
        cellWest = ret[i][j - 1];
      }

      var cell = new Cell(i, j, cellNorth, cellWest);
      ret[i][j] = cell;
      ret[i][j].tile = new Tile(cell, type);
      if(type === 'village')
      {
        ret[i][j].village = new Village(cell, 100);
      }
    }
  }
  return ret;
}

function worldPrintSurroundings (y, x, radius)
{
  var ret = '';
  for(var i = y - radius; i < y + radius; i++)
  {
    for(var j = x - radius; j < x + radius; j++)
    {
      if(i < 0 || i >= this.map.length || j < 0 || j >= this.map[0].length)
      {
        ret += '☁️';
        continue;
      }
      var cell = this.map[i][j];
      ret += cell.getEmoji();
    }
    ret += '\n';
  }
  return ret;
}
