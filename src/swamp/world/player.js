module.exports = function Player(cell, name, race)
{
  this.cell = cell;
  this.cell.players[name] = this;
  this.name = name;
  this.race = race;
  this.emoji = generateEmoji(race);
  this.move = playerMove;
  this.kidnapped = 0;
  this.capacity = 30;
  this.getInfo = function ()
  {
    var ret = '';
    ret += this.name + '\n';
    ret += this.race + '\n';
    ret += 'bois in bag: ' + this.kidnapped + '\n';
    if(this.lair)
    {
      ret += 'bois in LAIR: ' + this.lair.villagers;
    }
    return ret;
  };
};

function playerMove(dir)
{
  if(dir === 'west')
  {
    return tryMove(this, this.cell, this.cell.cellWest);
  }
  if(dir === 'east')
  {
    return tryMove(this, this.cell, this.cell.cellEast);
  }
  if(dir === 'north')
  {
    return tryMove(this, this.cell, this.cell.cellNorth);
  }
  if(dir === 'south')
  {
    return tryMove(this, this.cell, this.cell.cellSouth);
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
  if(race === 'h*cky spooker')
  {
    return '👻';
  }
  else if(race === 'laugh buddy')
  {
    return '🤡';
  }
  else if(race === 'inky pupper')
  {
    return '🦑';
  }
  else if(race === 'calcium boi')
  {
    return '💀';
  }
  else
  {
    return '🚫';
  }
}
