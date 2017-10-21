module.exports = function Player(cell, name, race)
{
  this.cell = cell;
  this.cell.players[name] = this;
  this.name = name;
  this.race = race;
  this.emoji = generateEmoji(race);
  this.move = playerMove;
};

function playerMove(dir)
{
  if(dir === 'west')
  {
    return tryMove(this, this.cell, this.cell.cellLeft);
  }
  if(dir === 'east')
  {
    return tryMove(this, this.cell, this.cell.cellRight);
  }
  if(dir === 'north')
  {
    return tryMove(this, this.cell, this.cell.cellTop);
  }
  if(dir === 'south')
  {
    return tryMove(this, this.cell, this.cell.cellBot);
  }
}

function tryMove(player, source, destination)
{
  if(destination && destination.getWalkable())
  {
    destination.players[player.name] = player;
    player.cell = destination;
    delete source.players[player.name];
    return true;
  }
  console.log('Cannot move');
  return false;
}

function generateEmoji(race)
{
  if(this.race === 'h*cky spooker')
  {
    return '👻';
  }
  else if(race == 'laugh buddy')
  {
    return '🤡';
  }
  else if(race == 'inky pupper')
  {
    return '🦑';
  }
  else if(race == 'calcium boi')
  {
    return '💀';
  }
  else
  {
    return '🚫';
  }
}
