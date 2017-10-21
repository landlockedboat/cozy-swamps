module.exports = function Lair(name, x, y, owner)
{
  this.owner = owner;
  this.race = owner.race;
  this.name = name;
  this.x = x;
  this.y = y;
  this.villagers = 0;

  this.getInfo = function ()
  {
    var ret = '';
    ret += name + '\n';
    ret += 'Property of: ' + owner.name + '\n';
    ret += 'Positon: ' + this.x + ', ' + this.y + '\n';
    ret += 'Race: ' + this.race + '\n';
    return ret;
  };
};
