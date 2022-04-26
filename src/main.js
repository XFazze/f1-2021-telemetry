"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var f1_2021_udp_1 = require("f1-2021-udp");
var dbSetup_1 = require("./dbSetup");
var fs = require('fs');
var db = (0, dbSetup_1.dbSetup)();
var client = new f1_2021_udp_1.F1TelemetryClient();
/*
TODO do 3 & 8 telemetry
// event 3
client.on('event', function (data) {
    console.log(data);
});



// final classification 8
client.on('finalClassification', function (data) {
    console.log(data);
});

*/
// motion 0
client.on('motion', function (data) {
    var m_carMotionData = data['m_carMotionData'];
    delete data['m_carMotionData'];
    var m_header = data['m_header'];
    delete data['m_header'];
    data['m_sessionUID'] = m_header['m_sessionUID'];
    data['m_sessionTime'] = m_header['m_sessionTime'];
    data['m_frameIdentifier'] = m_header['m_frameIdentifier'];
    db.run('INSERT INTO motion VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(data));
    for (var i = 0; i < m_carMotionData.length; i++) {
        var car = m_carMotionData[i];
        car['m_sessionUID'] = m_header['m_sessionUID'];
        car['m_sessionTime'] = m_header['m_sessionTime'];
        car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        car['indexx'] = i;
        db.run('INSERT INTO carMotion VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(car));
    }
});
// session 1
client.on('session', function (data) {
    var m_weatherForecastSamples = data['m_weatherForecastSamples'];
    delete data['m_weatherForecastSamples'];
    // TODO add weatherForecastSamples
    //createInsertSchema(m_weatherForecastSamples, 'weatherForecastSamples', 'm_weatherForecastSamples');
    var m_header = data['m_header'];
    delete data['m_header'];
    var m_marshalZones = __spreadArray([
        m_header['m_sessionUID'],
        m_header['m_sessionTime'],
        m_header['m_frameIdentifier']
    ], (0, dbSetup_1.marshalZoneConvert)(data['m_marshalZones']), true);
    delete data['m_marshalZones'];
    console.log('ff', m_marshalZones);
    data['m_sessionUID'] = m_header['m_sessionUID'];
    data['m_sessionTime'] = m_header['m_sessionTime'];
    data['m_frameIdentifier'] = m_header['m_frameIdentifier'];
    db.run('INSERT INTO sessions VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(data));
    db.run('INSERT INTO marshalZones VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', m_marshalZones);
});
// lap data 2
client.on('lapData', function (data) {
    var m_header = data['m_header'];
    for (var i = 0; i < data['m_lapData'].length; i++) {
        var car = data['m_lapData'][i];
        car['m_sessionUID'] = m_header['m_sessionUID'];
        car['m_sessionTime'] = m_header['m_sessionTime'];
        car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        car['indexx'] = i;
        db.run('INSERT INTO lap VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(car));
    }
});
// participants 4
client.on('participants', function (data) {
    var m_participants = data['m_participants'];
    delete data['m_participants'];
    var m_header = data['m_header'];
    delete data['m_header'];
    data['m_sessionUID'] = m_header['m_sessionUID'];
    data['m_sessionTime'] = m_header['m_sessionTime'];
    data['m_frameIdentifier'] = m_header['m_frameIdentifier'];
    db.run('INSERT INTO participants VALUES (?,?,?,?)', (0, dbSetup_1.objToListOfValues)(data));
    for (var i = 0; i < m_participants.length; i++) {
        var car = m_participants[i];
        car['m_sessionUID'] = m_header['m_sessionUID'];
        car['m_sessionTime'] = m_header['m_sessionTime'];
        car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        car['indexx'] = i;
        db.run('INSERT INTO carParticipants VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(car));
    }
});
// car setup 5
client.on('carSetups', function (data) {
    var m_header = data['m_header'];
    delete data['m_header'];
    var m_carSetups = data['m_carSetups'];
    for (var i = 0; i < m_carSetups.length; i++) {
        var car = m_carSetups[i];
        car['m_sessionUID'] = m_header['m_sessionUID'];
        car['m_sessionTime'] = m_header['m_sessionTime'];
        car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        car['indexx'] = i;
        db.run('INSERT INTO carSetup VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(car));
    }
});
// car telemetry 6
client.on('carTelemetry', function (data) {
    var m_header = data['m_header'];
    delete data['m_header'];
    data['m_sessionUID'] = m_header['m_sessionUID'];
    data['m_sessionTime'] = m_header['m_sessionTime'];
    data['m_frameIdentifier'] = m_header['m_frameIdentifier'];
    var m_carTelemetryData = data['m_carTelemetryData'];
    delete data['m_carTelemetryData'];
    db.run('INSERT INTO telemetry VALUES (?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(data));
    for (var i = 0; i < m_carTelemetryData.length; i++) {
        var car = m_carTelemetryData[i];
        car['m_sessionUID'] = m_header['m_sessionUID'];
        car['m_sessionTime'] = m_header['m_sessionTime'];
        car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        car['indexx'] = i;
        db.run('INSERT INTO carTelemetry VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(car));
    }
});
// car status 7
client.on('carStatus', function (data) {
    var m_header = data['m_header'];
    delete data['m_header'];
    var m_carStatusData = data['m_carStatusData'];
    delete data['m_carStatusData'];
    for (var i = 0; i < m_carStatusData.length; i++) {
        var car = m_carStatusData[i];
        car['m_sessionUID'] = m_header['m_sessionUID'];
        car['m_sessionTime'] = m_header['m_sessionTime'];
        car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        car['indexx'] = i;
        db.run('INSERT INTO carStatus VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(car));
    }
    client.stop();
});
// lobby info 9
client.on('lobbyInfo', function (data) {
    var m_header = data['m_header'];
    delete data['m_header'];
    data['m_sessionUID'] = m_header['m_sessionUID'];
    data['m_sessionTime'] = m_header['m_sessionTime'];
    data['m_frameIdentifier'] = m_header['m_frameIdentifier'];
    var m_lobbyPlayers = data['m_lobbyPlayers'];
    delete data['m_lobbyPlayers'];
    for (var i = 0; i < m_lobbyPlayers.length; i++) {
        var player = m_lobbyPlayers[i];
        player['m_sessionUID'] = m_header['m_sessionUID'];
        player['m_sessionTime'] = m_header['m_sessionTime'];
        player['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        player['indexx'] = i;
        db.run('INSERT INTO lobbyPlayerInfo VALUES (?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(player));
    }
    db.run('INSERT INTO lobbyInfo VALUES (?,?,?,?)', (0, dbSetup_1.objToListOfValues)(data));
    client.stop();
});
// car damage 10
client.on('carDamage', function (data) {
    var m_header = data['m_header'];
    delete data['m_header'];
    var m_carDamageData = data['m_carDamageData'];
    delete data['m_carDamageData'];
    for (var i = 0; i < m_carDamageData.length; i++) {
        var car = m_carDamageData[i];
        car['m_sessionUID'] = m_header['m_sessionUID'];
        car['m_sessionTime'] = m_header['m_sessionTime'];
        car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        car['indexx'] = i;
        db.run('INSERT INTO carDamage VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(car));
    }
    client.stop();
}); // session history 11
client.on('sessionHistory', function (data) {
    var m_header = data['m_header'];
    delete data['m_header'];
    data['m_sessionUID'] = m_header['m_sessionUID'];
    data['m_sessionTime'] = m_header['m_sessionTime'];
    data['m_frameIdentifier'] = m_header['m_frameIdentifier'];
    var m_lapHistoryData = data['m_lapHistoryData'];
    delete data['m_lapHistoryData'];
    var m_tyreStintsHistoryData = data['m_tyreStintsHistoryData'];
    delete data['m_tyreStintsHistoryData'];
    for (var i = 0; i < m_lapHistoryData.length; i++) {
        var lap = m_lapHistoryData[i];
        lap['m_sessionUID'] = m_header['m_sessionUID'];
        lap['m_sessionTime'] = m_header['m_sessionTime'];
        lap['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        lap['indexx'] = i;
        db.run('INSERT INTO lapHistory VALUES (?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(lap));
    }
    for (var i = 0; i < m_tyreStintsHistoryData.length; i++) {
        var lap = m_tyreStintsHistoryData[i];
        lap['m_sessionUID'] = m_header['m_sessionUID'];
        lap['m_sessionTime'] = m_header['m_sessionTime'];
        lap['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        lap['indexx'] = i;
        db.run('INSERT INTO tyreStintHistory VALUES (?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(lap));
    }
});
// to start listening:
client.start();
