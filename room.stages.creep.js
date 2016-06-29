module.exports = {
	minerReq: [
		//Requires starting resource have miners equal to capacity
		function(room) {
			var startingSourceAtCapacity = false;
			for(var id in room.memory.sources) {
				var source = room.memory.sources[id];
				if(source.capacity <= source.assigned) {
					startingSourceAtCapacity = true;
					break;
				}
			}
			return startingSourceAtCapacity;
		},
		function(room) {
			var allSourcesFull = true;
			for(var id in room.memory.sources) {
				var source = room.memory.sources[id];
				if(source.assigned < source.capacity * 1.5) {
					allSourcesFull = false;
				}
			}
			return allSourcesFull;
		}
	],

	builderReq: [
	],
	moverReq: [
	]
}