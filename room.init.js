module.exports = function(room) {
    var roomMem = Memory.rooms[name];   
    if(!roomMem) {
        roomMem = Memory.rooms[name] = {};
    }
    
    if(!roomMem.init) {
        var creeps = {};
        
        room.find(FIND_MY_CREEPS).forEach(function(creep) {
            creeps[creep.name] = {};
        });
        
        Memory.rooms[name] = {
            assignments: {
                harvester: 0,
                upgrader: 0,
                builder: 0
            },
            creeps: creeps,
            init: true
        }
    }
}