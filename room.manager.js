module.exports = function(room) {
	const
		init = require('room.init'),
		creepManager = require('creep.manager');

	//initialize memory for room if not yet initialized
	init(room);

	const
		roomMem = Memory.rooms[room.name],
		roomData = {
			buildings: {},
			assignments: roomMem.assignments,
			sources: roomMem.sources
		};
	roomData.buildings.spawns = room.find(FIND_MY_SPAWNS);
	roomData.buildings.emptyContainers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && 
            		structure.energy < structure.energyCapacity;
        }
    });
    roomData.buildings.construction = room.find(FIND_MY_CONSTRUCTION_SITES);
    roomData.buildings.repairs = find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.hits < structure.hitsMax;
        }
    });
};