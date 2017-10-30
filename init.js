const CURRENT_MEMORY_VERSION = 1;
module.exports = function() {
    if(!Memory.initVersion || Memory.initVersion < CURRENT_MEMORY_VERSION) {
        Game.rooms.map(function(room) {
            initSources(room);
        });
    }
}

/**
 * Source Memory
 * numTargetedBy: number of creeps currently moving to this source
 * numAssignedTo: number of creeps frequenting this source
 **/
function initSources(room) {
    Memory.sources = {};
    room.find(FIND_SOURCES).map(source) {
        Memory.sources[source.id] = {
            numTargetedBy: 0,
            numAssignedTo: 0
        };
    }
}
