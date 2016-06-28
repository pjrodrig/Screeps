module.exports = function(room, roomData) {
	const
		miner = require('role.ai.miner');

	for(var name in room.memory.creeps) {
		var creep = Game.creeps[name];
		if(creep) {
			updateCreep(creep);
		} else {
			removeCreep(name);
		}
	}

	function updateCreep(creep) {
		switch(creep.memory) {
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
		delete room.memory.creeps[name];
		delete Memory.creeps[name];
	}
};