module.exports = function(room, assignments, buildings) {
	const
		roleAssigner = require('role.assigner.js'),
		testCreep = {
			name: '_population_test_creep_',
			memory: {}
		};

		roleAssigner(testCreep, assignments, buildings, true);
		if(!testCreep.memory.assignment) {
			var extensions = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_EXTENSION;
                    }
            	}),
				properties = extensions === 5 ? [
					WORK, WORK,
					MOVE,
					CARRY
				] : [
					WORK, WORK, WORK,
					MOVE,
					CARRY, CARRY
				];
			var name = buildings.spawn.createCreep(properties);
			if(typeof(name) === 'string') {
				Memory.room[room.name].creeps.push(name);
			}
		}
};