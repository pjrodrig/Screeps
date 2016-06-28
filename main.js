const 
    init = require('init'),
    roomManager = require('room.manager');
    
init();
for(var name in Game.rooms){
    roomManager(Game.rooms[name]);
}