module.exports = function Lair(cell, name, owner)
{
  this.owner = owner;
  this.race = owner.race;
  this.name = name;
  this.cell = cell;
  this.villagers = 0;

  this.getInfo = function ()
  {
    var ret = '';
    ret += name + '\n';
    ret += 'this laIRE is OF: ' + owner.name + '\n';
    ret += 'IT is A ' + this.race + ' LAIR\n';
    ret += 'boies insIDe In it: ' + this.villagers + '\n';
    return ret;
  };
  this.emoji = generateEmoji(owner.race);
  owner.lair = this;
};

function generateEmoji(race)
{
  if(race === 'h*cky spooker')
  {
    return '🏰';
  }
  else if(race === 'laugh buddy')
  {
    return '🎪';
  }
  else if(race === 'inky pupper')
  {
    return '🌊';
  }
  else if(race === 'calcium boi')
  {
    return '🎺';
  }
  else
  {
    return '🚫';
  }
}
