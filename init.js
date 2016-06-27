module.exports = function () {
    if(!Memory.rooms){
        Memory.rooms = {};
        
        for(var name in Game.rooms){
            Memory.rooms[name] = {
                assignments: {
                    harvester: 0,
                    upgrader: 0,
                    builder: 0
                },
                creeps: {}
            }
        }
        
        var creep;
        for(var name in Game.creeps){
            creep = Game.creeps[name];
            delete creep.memory.assignment;
            Memory.rooms[creep.room.name].creeps[name] = {};
        }
    }
};