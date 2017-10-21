module.exports = function Tile(cell, type)
{
  this.cell = cell;
  this.type = type;

  var emoji;
  var walkable = true;

  if(type === 'ground')
  {
    emoji = '🌱';
  }
  else if(type === 'wall')
  {
    emoji = '🌲';
    walkable = false;
  }
  else if(type === 'village')
  {
    emoji = '🏠';
  }
  else
  {
    emoji = '🚫';
  }

  this.emoji = emoji;
  this.walkable = walkable;
};
