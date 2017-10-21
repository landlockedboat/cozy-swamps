module.exports = function Cell(y, x, cellNorth, cellWest)
{
  this.y = y;
  this.x = x;
  if(cellNorth)
  {
    this.cellNorth = cellNorth;
    cellNorth.cellSouth = this;
  }

  if(cellWest)
  {
    this.cellWest = cellWest;
    cellWest.cellEast = this;
  }

  this.getWalkable = cellGetWalkable;
  this.getEmoji = cellGetEmoji;
  this.players = {};
  this.getInfo = cellGetInfo;
};

function cellGetInfo(playername)
{
  var ret = 'You look around...\n';
  if(this.tile)
  {
    ret += 'Terrain: ' + this.tile.type + '\n';
  }
  if(this.village)
  {
    ret += 'Village:\n';
    ret += '  Population: ' + this.village.villagers + '\n';
  }
  if(this.players)
  {
    var keys = Object.keys(this.players);
    if(keys.length > 1)
    {
      ret += 'Users:\n';
      for(var index = 0; index < keys.length; index++)
      {
        var key = keys[index];
        if(key === playername)
        {
          continue;
        }
        var player = this.players[key];
        ret += '  ' + player.name + '\n';
      }
    }
    
  }
  return ret;
}

function cellGetWalkable()
{
  if(!this.tile)
  {
    return false;
  }
  return this.tile.walkable;
}

function cellGetEmoji()
{
  if(this.players)
  {
    var keys = Object.keys(this.players);
    if(keys.length > 0)
    {
      if(keys.length == 1)
      {
        var key = keys[0];
        return this.players[key].emoji;
      }
      return keys.length;
    }
  }

  if(this.tile)
  {
    return this.tile.emoji;
  }

  return '🚫';
}
