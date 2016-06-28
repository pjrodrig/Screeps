module.exports = function(room) {
    const
        util = require('util');

    var roomMem = Memory.rooms[room.name];   
    if(!roomMem) {
        roomMem = Memory.rooms[room.name] = {};
    }
    
    if(!roomMem.init) {
        var sources = {};
        room.find(FIND_SOURCES).forEach(function(source) {
            sources[source.id] = {
                assigned: 0,
                capacity: getSourceCapacity(source)
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

    function getSourceCapacity(source) {
        var terrain = util.getSurroundingTerrain(source),
            count = 0;
        terrain.forEach(function(square) {
            if(square.terrain === 'swamp' || square.terrain === 'plain') {
                count++;
            }
        });
        return count;
    }
}