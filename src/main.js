"use strict";
exports.__esModule = true;
var f1_2021_udp_1 = require("f1-2021-udp");
var dbSetup_1 = require("./dbSetup");
var fs = require('fs');
var db = (0, dbSetup_1.dbSetup)();
var client = new f1_2021_udp_1.F1TelemetryClient();
// participants 4
client.on('participants', function (data) {
    var m_participants = data['m_participants'];
    delete data['m_participants'];
    var m_header = data['m_header'];
    delete data['m_header'];
    data['m_sessionUID'] = m_header['m_sessionUID'];
    data['m_sessionTime'] = m_header['m_sessionTime'];
    data['m_frameIdentifier'] = m_header['m_frameIdentifier'];
    db.run('INSERT INTO participantsData VALUES (?,?,?,?)', (0, dbSetup_1.objToListOfValues)(data));
    for (var i = 0; i < m_participants.length; i++) {
        var car = m_participants[i];
        car['m_sessionUID'] = m_header['m_sessionUID'];
        car['m_sessionTime'] = m_header['m_sessionTime'];
        car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        car['indexx'] = i;
        db.run('INSERT INTO carParticipantsData VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', (0, dbSetup_1.objToListOfValues)(car));
    }
    client.stop();
});
/*
// motion 0
client.on('motion', function (data) {
    var m_carMotionData = data['m_carMotionData'];
    delete data['m_carMotionData'];

    var m_header = data['m_header'];
    delete data['m_header'];
    data['m_sessionUID'] = m_header['m_sessionUID'];
    data['m_sessionTime'] = m_header['m_sessionTime'];
    data['m_frameIdentifier'] = m_header['m_frameIdentifier'];

    db.run('INSERT INTO motionData VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', objToListOfValues(data));
    for (let i = 0; i < m_carMotionData.length; i++) {
        const car = m_carMotionData[i];
        car['m_sessionUID'] = m_header['m_sessionUID'];
        car['m_sessionTime'] = m_header['m_sessionTime'];
        car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        car['indexx'] = i;
        db.run('INSERT INTO carMotionData VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', objToListOfValues(car));
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
    var m_marshalZones = [
        m_header['m_sessionUID'],
        m_header['m_sessionTime'],
        m_header['m_frameIdentifier'],
        ...marshalZoneConvert(data['m_marshalZones']),
    ];
    delete data['m_marshalZones'];
    console.log('ff', m_marshalZones);

    data['m_sessionUID'] = m_header['m_sessionUID'];
    data['m_sessionTime'] = m_header['m_sessionTime'];
    data['m_frameIdentifier'] = m_header['m_frameIdentifier'];
    db.run(
        'INSERT INTO sessions VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        objToListOfValues(data)
    );
    db.run(
        'INSERT INTO marshalZones VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        m_marshalZones
    );

});

// lap data 2
client.on('lapData', function (data) {
    var m_header = data['m_header'];
    for (let i = 0; i < data['m_lapData'].length; i++) {
        const car = data['m_lapData'][i];
        car['m_sessionUID'] = m_header['m_sessionUID'];
        car['m_sessionTime'] = m_header['m_sessionTime'];
        car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
        car['indexx'] = i;
        db.run(
            'INSERT INTO lapData VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            objToListOfValues(car)
        );
    }
});
// event 3
client.on('event', function (data) {
    console.log(data);
});


// car setup 5
client.on('carSetups', function (data) {
    console.log(data);
});

// car telemetry 6
client.on('carTelemetry', function (data) {
    console.log(data);
});

// car status 7
client.on('carStatus', function (data) {
    console.log(data);
});

// final classification 8
client.on('finalClassification', function (data) {
    console.log(data);
});

// lobby info 9
client.on('lobbyInfo', function (data) {
    console.log(data);
});

// car damage 10
client.on('carDamage', function (data) {
    console.log(data);
});

// session history 11
client.on('sessionHistory', function (data) {
    console.log(data);
});
*/
// to start listening:
client.start();
