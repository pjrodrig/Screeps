module.exports = function(room) {
	const
		roleAssigner = require('role.assigner.js'),
		populationManager = require('population.manager.js'),
		roomMem = Memory.rooms[room.name],
		assignments = roomMem.assignments;
		buildings = {},
		mySpawns = room.find(FIND_MY_SPAWNS);

		buildings.controller = room.controller;
		buildings.construction = room.find(FIND_MY_CONSTRUCTION_SITES);
		if(mySpawns.length) {
			buildings.spawn = mySpawns[0];
		}

		roomMem.creeps.forEach(function(name) {
	        var creep = Game.creeps[name];
	        if(creep) {
	        	if(creep.room.name === room.name) {
	        		roleAssigner(creep, assignments, buildings);
	        	} else {
	        		delete roomMem.creeps[name];
	        	}
	        } else {
	        	delete roomMem.creeps[name];
	        	delete Memory.creeps[name];
	        }
	    });

	    populationManager(room, assignments, buildings);
};