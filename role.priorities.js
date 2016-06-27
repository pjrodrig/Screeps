const 
    harvester = 'harvester',
    upgrader = 'upgrader',
    builder = 'builder';

module.exports = {
    assigned: [
        {
            title: harvester,
            condition: function(assignments, buildings) {
                return assignments.harvester < 3 && 
                       buildings.spawn.energy < buildings.spawn.energyCapacity;
            }
        },
        {
            title: upgrader,
            condition: function(assignments) {
                return assignments.upgrader < 1;
            }
        }
    ],
    unassigned: [
        {
            title: harvester,
            condition: function(assignments) {
                return assignments.harvester < 4 && 
                       buildings.spawn.energy < buildings.spawn.energyCapacity;
            }
        },
        {
            title: upgrader,
            condition: function(assignments) {
                return assignments.upgrader < 4;
            }
        },
        {
            title: builder,
            condition: function(assignments) {
                return assignments.builder < 4;
            }
        }
    ]
};