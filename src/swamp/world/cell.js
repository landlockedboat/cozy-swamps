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
  var ret = 'LOOKING uuu SEE:\n';
  if(this.tile)
  {
    ret += 'ThE GROUN iS: ' + this.tile.type + '\n';
  }
  if(this.village)
  {
    ret += 'THERE IS A VILLAG heRE:\n';
    ret += 'THE bIlLLAgE has: ' + this.village.villagers + ' BOIeIES\n';
  }
  if(this.lair)
  {
    ret += 'H*CK!!! thER IS A lAIR HERE?!!';
    ret += 'ITi isS cALLED: ' + this.lair.name + '\n';
    ret += 'TheERE HARE SoME BOIESS: ' + this.lair.villagers + '\n';
  }
  if(this.players)
  {
    var keys = Object.keys(this.players);
    if(keys.length > 1)
    {
      ret += 'WOW SOM SPOOKPALS ARE HERE:\n';
      for(var index = 0; index < keys.length; index++)
      {
        var key = keys[index];
        if(key === playername)
        {
          continue;
        }
        var player = this.players[key];
        ret += '  ' + player.name + ' (' + player.race + ')' + '\n';
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
      if(keys.length == 2)
      {
	return '2⃣';
      }
      if(keys.length == 3)
      {
	return '3⃣';
      }
      if(keys.length == 4)
      {
	return '4⃣';
      }
      return '🔢';
    }
  }

  if(this.lair)
  {
    return this.lair.emoji;
  }

  if(this.tile)
  {
    return this.tile.emoji;
  }

  return '🚫';
}
