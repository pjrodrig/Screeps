module.exports = function(creep, roomData) {
    if(!creep.memory.sourceId) {
        var source = getSourceAssignment();
        if(source) {
            creep.memory.sourceId = source.id;
            roomData.sources[source.id].assigned++;
        }
    } else {
        work();
    }

    function work() {
        if(creep.memory.mining && creep.carry.energy == 0) {
            creep.memory.mining = false;
        }
        if(!creep.memory.mining && creep.carry.energy == creep.carryCapacity) {
            creep.memory.mining = true;
        }

        creep.memory.mining ? mine() : deliver();
    }

    function mine() {
        var source = Game.getObjectById(creep.memory.sourceId);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }

    function deliver() {
        var container;
        if(creep.memory.destinationId) {
            container = Game.getObjectById(creep.memory.destinationId);
            if(container.energy === container.energyCapacity) {
                delete creep.memory.destination;
            }
        }
        if(!container) {
            container = getContainer();
            creep.memory.destinationId = container.id;
        }
        if(container) {
            if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        } else {
            creep.memory.mining = true;
        }
    }

    function getContainer() {
        return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: function(structure) {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) && 
                        structure.energy < structure.energyCapacity;
            },
            algorithm: 'dijkstra'
        });
    }

    function getSourceAssignment() {
        var sources = creep.room.find(FIND_SOURCES).sort(function(a, b) {
            var aData = roomData.sources[a.id],
                bData = roomData.sources[b.id],
                //compare percentage of capacity filled
                value = (aData.assigned/aData.capacity) - (bData.assigned/bData.capacity);
            if(value === 0) {
                var aDistance = a.distToCreep || creep.room.findPath(creep.pos, a.pos, {
                        ignoreCreeps: true,
                        ignoreRoads: true,
                    }).length,
                    bDistance = b.distToCreep || creep.room.findPath(creep.pos, b.pos, {
                        ignoreCreeps: true,
                        ignoreRoads: true,
                    }).length;
                    a.distToCreep = aDistance;
                    b.distToCreep = bDistance;
                    value = aDistance - bDistance;
            }
            return value;
        });
        var source;
        if(sources.length) {
            source = sources[0];
        }
        return source;
    }
}