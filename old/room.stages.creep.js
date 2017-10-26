module.exports = {
	minerReq: [
		function(room) {
			var allSourcesFull = true;
			for(var id in room.memory.sources) {
				var source = room.memory.sources[id];
				if(source.assigned < Math.pow(source.capacity, 0.4) * Math.pow(source.distanceToSpawn, 0.8)) {
					allSourcesFull = false;
				}
			}
			return allSourcesFull;
		}
	],

	builderReq: [
		function(room) {
			return room.memory.assignments.builder >= 4;
		}
	],
	moverReq: [
	],
	upgraderReq: [
		function(room) {
			return room.memory.assignments.upgrader >= 4 * Math.pow(room.memory.controllerDistance, 0.3);
		}
	]
}