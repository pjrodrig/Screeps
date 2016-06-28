module.exports = {
	getSurroundingTerrain: function(roomObj) {
		return roomObj.room.lookForAtArea(LOOK_TERRAIN, 
            source.pos.y - 1, 
            source.pos.x - 1, 
            source.pos.y + 1, 
            source.pos.y + 1, {asArray: true})
	}
};