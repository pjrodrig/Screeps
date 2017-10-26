const
    roomService = require('room.service');

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
    roomService.getSources(creep);
    roomService.getContainers(creep);
}

function moveTo(creep, target) {

}

function moveAway(creep, target) {

}

function collect(creep, target) {

}

function deposit(creep, target) {

}

function getSources(creep) {
    return creep.room.find(FIND_SOURCES).map(function(source) {
        return {
            obj: source,
            type:'source',
            subType: 'source',
            numTarged
        }
    });
}

function getContainers(creep) {

}