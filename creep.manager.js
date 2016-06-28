module.exports = function(room, roomData) {
	const
		miner = require('role.ai.miner');

	for(var name in room.memory.creeps) {
		var creep = Game.creeps[name];
		if(creep) {
			updateCreep(creep);
		} else {
			removeCreep(creep);
		}
	}

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

	function removeCreep(creep) {
		switch(creep.memory.role) {
			case 'miner':
				removeMiner(creep);
				break;
			case 'mover':
				break;
			case 'builder':
				break;
		}
		delete room.memory.creeps[creep.name];
		delete Memory.creeps[creep.name];
	}

	function removeMiner(creep) {
		var sourceId = creep.memory.sourceId;
		if(sourceId) {
			room.memory.sources[sourceId].assigned--;
		}
	}
};