module.exports = {
    getActions: getActions
};

function getActions(creep) {
    let sampleReturn = {
        distanceFromCreep: 0,
        type: 'source', //SOURCE/COLLECTION_POINT,
        subType: 'source', //spawn, controller
        numTargetedBy: 0,
        targedByCreep: true,

    };
    let creepMemory = Memory.creeps[creep.id];
    _getSources(creep, creepMemory);
    _getContainers(creep, creepMemory);
}

function moveTo(creep, target) {

}

function moveAway(creep, target) {

}

function collect(creep, target) {

}

function deposit(creep, target) {

}

function _getSources(creep, creepMemory) {
    return creep.room.find(FIND_SOURCES).map(function(source) {
        let sourceMemory = Memory.sources[source.id];
        return {
            id: source.id,
            type:'source',
            numTargedBy: sourceMemory.numTargedBy,
            numAssignedTo: sourceMemory.numAssignedTo,
            isLastTarget: creepMemory.lastTarget === source.id,
            isTargetSource: creepMemory.targetSource === source.id
        };
    });
}

function _getContainers(creep, creepMemory) {
    return _getRoomContainers().map(function(source) {
        let sourceMemory = Memory.sources[source.id];
        return {
            id: source.id,
            type:'source',
            numTargedBy: sourceMemory.numTargedBy,
            numAssignedTo: sourceMemory.numAssignedTo,
            isLastTarget: creepMemory.lastTarget === source.id,
            isTargetSource: creepMemory.targetSource === source.id
        };
    });
}

function _getRoomContainers(room) {
    return room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return (
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN
                    )
                    && structure.energy < structure.energyCapacity;
            }
    });
}
