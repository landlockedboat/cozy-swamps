function userAdd(user)
{
  var userObj = user;
  userObj.pos = 
    {
      x: 5,
      y: 5
    };

  this.list[user.id] = userObj;
}

function userExists(user)
{
  if(user.id in this.list)
  {
    return true;
  }
  return false;
}

function userMove(userId, dir)
{
  var user = this.list[userId];
  var newX = user.pos.x;
  var newY = user.pos.y;

  if(dir === "west")
  {
    newX -= 1;
  }
  if(dir === "east")
  {
    newX += 1;
  }
  if(dir === "north")
  {
    newY -= 1;
  }
  if(dir === "south")
  {
    newY += 1;
  }

  if(this.overworld[newY][newX] == 1)
  {
    return false;
  }
  user.pos.x = newX;
  user.pos.y = newY;
  return true;
}

function userGetFromPos(x, y)
{
  for (var key in this.list)
  {
    var user = this.list[key];

    if(user.pos.x === x && user.pos.y === y)
    {
      return user;
    }
  }
  return null;
}

function userGetInfo(userId)
{
  var user = this.list[userId];
  var info = "";
  // info += "pos: " + user.pos.x + ", " + user.pos.y + "\n";
  info += this.overworld.emojify(user.pos.x, user.pos.y, 5);
  return info;
}

var users = 
  {
    list:
    {
    },
    add: userAdd,
    exists: userExists,
    move: userMove,
    getInfo: userGetInfo,
    getFromPos: userGetFromPos
  };

module.exports = users;
