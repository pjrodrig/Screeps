module.exports = function(room, roomData) {
	if(roomData.buildings.spawns.length) {
		const
			MINER = 'miner',
			MOVER = 'mover',
			BUILDER = 'builder';

		var priority,
			startingSourceAtCapacity = false;

		for(var id in room.memory.sources) {
			var source = room.memory.sources[id];
			if(source.capacity <= source.assigned) {
				startingSourceAtCapacity = true;
			}
		}

		if(!startingSourceAtCapacity){
			priority = MINER;
		}

		if(priority) {
			const
				roleProperties = require('role.properties')[priority],
				extensions = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_EXTENSION;
                    }
            	});

			var spawn,
				creep;
			for(var i = 0; i < roomData.buildings.spawns.length; i++) {
				spawn = roomData.buildings.spawns[i],
				creep = spawn.createCreep(roleProperties[extensions.length] || roleProperties[roleProperties.length - 1],
						undefined, {role: priority});
				if(typeof(creep) === 'string') {
					room.memory.creeps[creep] = {role: priority};
					break;
				}
			}
		}
	}
}