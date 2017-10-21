if (process.argv.length < 4)
{
  console.log("two parameters");
  process.exit();
}

var height = process.argv[2];
var width = process.argv[3];

var map = [];

for(var i = 0; i < height; i++)
{
  map[i] = [];
  for(var j = 0; j < width; j++)
  {
    if(i == (height - 1) | i == 0 | j == (width - 1) | j == 0)
    {
      map[i][j] = 1;
    }
    else
    {
      map[i][j] = 0;
    }
  }
}

var json_map = JSON.stringify(map);
console.log(json_map);
