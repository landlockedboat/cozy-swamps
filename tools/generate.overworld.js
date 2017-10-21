if (process.argv.length < 4)
{
  console.log('two parameters');
  process.exit();
}

var height = process.argv[2];
var width = process.argv[3];

var map = [];

// chance that there exists something instead of nothing
var chance = .1;
// number of tile types
// var ntypes = 5;

for(var i = 0; i < height; i++)
{
  map[i] = [];
  for(var j = 0; j < width; j++)
  {
    if(i == (height - 1) | i == 0 | j == (width - 1) | j == 0)
    {
      map[i][j] = 1;
      continue;
    }

    var rand = Math.random();

    if(chance >= rand)
    {
      // var tileNumber = Math.floor(Math.random() * ntypes) + 2;
      // map[i][j] = tileNumber;
      map[i][j] = 2;
      continue;
    }
    map[i][j] = 0;
  }
}

var json_map = JSON.stringify(map);
console.log(json_map);
