module.exports = function(room, assignments, buildings) {
	const
		roleAssigner = require('role.assigner'),
		testCreep = {
			name: '_population_test_creep_',
			memory: {}
		};

		roleAssigner(testCreep, assignments, buildings, true);
		var assignments = Memory.rooms[room.name].assignments,
		    popCount = 0;
		for(var assignment in assignments) {
		    if(assignments.hasOwnProperty(assignment)) {
		        continue;
		    }
		    popCount += assignments[assignment];
		}
		if(popCount < 16) {
			var extensions = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_EXTENSION;
                    }
            	}),
				properties = [
				    [
    					WORK, WORK,
    					MOVE,
    					CARRY
    				],
    				[
    					WORK, WORK,
    					MOVE,
    					CARRY, CARRY
    				],
    				[
    					WORK, WORK,
    					MOVE, MOVE,
    					CARRY, CARRY
    				],
    				[
    					WORK, WORK, WORK,
    					MOVE, MOVE,
    					CARRY, CARRY
    				],
    				[
    					WORK, WORK, WORK,
    					MOVE, MOVE, MOVE,
    					CARRY, CARRY
    				]
				];
			var name = buildings.spawn.createCreep(properties[extensions.length] || properties[properties.length - 1]);
			if(typeof(name) === 'string') {
				Memory.rooms[room.name].creeps[name] = {};
			}
		}
};