var Village = require('./world/village.js');
var Tile = require('./world/tile.js');
var Cell = require('./world/cell.js');
var Player = require('./world/player.js');

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

      var cellTop;
      if(i > 0)
      {
        cellTop = ret[i - 1][j];
      }
      var cellLeft;
      if(j > 0)
      {
        cellLeft = ret[i][j - 1];
      }

      var cell = new Cell(cellTop, cellLeft);
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

function worldPrintSurroundings (x, y, radius)
{
  var ret = '';
  for(var i = y - radius; i < y + radius; i++)
  {
    for(var j = x - radius; j < x + radius; j++)
    {
      if(i < 0 || i >= this.map.length || j < 0 || j >= this.map[0].length)
      {
        ret += '🌫';
        continue;
      }
      // TODO ERASE
      var cell = this.map[i][j];
      //      if (i === 3 && j === 3)
      //      {
      //        console.log(cell.players);
      //      }
      ret += cell.getEmoji();
    }
    ret += '\n';
  }
  return ret;
}
