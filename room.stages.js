/**
 * This file contains the stages of a room's progress
 */
 const
	MINER = 'miner',
	MOVER = 'mover',
	BUILDER = 'builder';

module.exports = [
	{
		controllerLevel: 1,
		getNextUnit: function(room) {
			var unit;
			if(!minerReq1(room)) {
				unit = MINER;
			}
			return unit;
		},
		getNextBuildings: function(room) {
			return [];
		}
	},
	{
		controllerLevel: 1,
		getNextUnit: function(room) {
			var unit;
			if(!minerReq1(room)) {
				unit = MINER;
			} else if(!builderReq(room)) {
				unit = BUILDER;
			}
			return unit;
		},
		getNextBuildings: function(room) {
			var buildings
		}
	}
];

