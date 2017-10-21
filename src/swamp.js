var swamp = {};

swamp.overworld = require("./swamp.overworld.js");
swamp.users = require("./swamp.users.js");

swamp.users.overworld = swamp.overworld;
swamp.overworld.users = swamp.users;

module.exports = swamp;
