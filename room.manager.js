module.exports = function(room) {
	//initialize memory for room if not yet initialized
	require('room.init')(room);

	const
		roleAssigner = require('role.assigner'),
		populationManager = require('population.manager'),
		roomMem = Memory.rooms[room.name],
		assignments = roomMem.assignments;
		buildings = {},
		mySpawns = room.find(FIND_MY_SPAWNS);

        buildings.emptyStorage = targets = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
		buildings.controller = room.controller;
		buildings.construction = room.find(FIND_MY_CONSTRUCTION_SITES);
		if(mySpawns.length) {
			buildings.spawn = mySpawns[0];
		}
		
		for(var name in roomMem.creeps) {
	        var creep = Game.creeps[name];
	        if(creep) {
	        	if(creep.room.name === room.name) {
	        		roleAssigner(creep, assignments, buildings);
	        	} else {
	        	    roomMem.assignments[roomMem.creeps[name].assignment]--;
	        		delete roomMem.creeps[name];
	        	}
	        } else {
	            var creepMem = roomMem.creeps[name];
	            if(creepMem) {
	                roomMem.assignments[creepMem.assignment]--;
	            }
	        	delete roomMem.creeps[name];
	        	delete Memory.creeps[name];
	        }
	    }
	    require('tower')(room);
	    populationManager(room, assignments, buildings);
};