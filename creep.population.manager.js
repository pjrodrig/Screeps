module.exports = function(room, roomData) {
	if(roomData.buildings.spawns.length) {
		const
			MINER = 'miner',
			MOVER = 'mover',
			BUILDER = 'builder';

		var priority;

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