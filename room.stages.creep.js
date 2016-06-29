module.exports = {
	minerReq: [
		function(room) {
			var allSourcesFull = true;
			for(var id in room.memory.sources) {
				var source = room.memory.sources[id];
				if(source.assigned < source.capacity * 2) {
					allSourcesFull = false;
				}
			}
			return allSourcesFull;
		}
	],

	builderReq: [
		function(room) {
			return room.memory.assignments.builder >= 2;
		}
	],
	moverReq: [
	],
	upgraderReq: [
		function(room) {
			return room.memory.assignments.upgrader >= 4;
		}
	]
}