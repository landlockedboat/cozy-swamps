module.exports = function Cell(cellTop, cellLeft)
{
  if(cellTop)
  {
    this.cellTop = cellTop;
    cellTop.cellBot = this;
  }

  if(cellLeft)
  {
    this.cellLeft = cellLeft;
    cellLeft.cellRight = this;
  }

  this.getWalkable = cellGetWalkable;
  this.getEmoji = cellGetEmoji;
  this.players = {};
};

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
