module.exports = function(room, roomData) {
	const
		miner = require('role.ai.miner'),
		populationManager = require('creep.population.manager');

	for(var name in room.memory.creeps) {
		var creep = Game.creeps[name];
		if(creep) {
			updateCreep(creep);
		} else {
			removeCreep(name);
		}
	}

	populationManager(room, roomData);

	function updateCreep(creep) {
		switch(creep.memory.role) {
			case 'miner':
				miner(creep, roomData);
				break;
			case 'mover':
				break;
			case 'builder':
				break;
		}
	}

	function removeCreep(name) {
		switch(room.memory.creeps[name].role) {
			case 'miner':
				removeMiner(name);
				break;
			case 'mover':
				break;
			case 'builder':
				break;
		}
		delete room.memory.creeps[creep.name];
		delete Memory.creeps[creep.name];
	}

	function removeMiner(name) {
		var sourceId = room.memory.creeps[creep].sourceId;
		if(sourceId) {
			room.memory.sources[sourceId].assigned--;
		}
	}
};