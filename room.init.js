module.exports = function(room) {
    var roomMem = Memory.rooms[room.name];   
    if(!roomMem) {
        roomMem = Memory.rooms[room.name] = {};
    }
    
    if(!roomMem.init) {
        var sources = {};
        room.find(FIND_SOURCES).forEach(function(source) {
            sources[creep.id] = {
                assigned: 0
            };
        });

        var creeps = {};
        room.find(FIND_MY_CREEPS).forEach(function(creep) {
            creeps[creep.name] = {};
        });
        roomMem.assignments = {
            harvester: 0,
            upgrader: 0,
            builder: 0
        };
        room.creeps = creeps;
        room.init = true;
    }
}