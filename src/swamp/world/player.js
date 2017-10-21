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
}

function tryMove(player, source, destination)
{
  if(destination && destination.getWalkable())
  {
    destination.players[player.name] = player;
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
