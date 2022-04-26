import { F1TelemetryClient } from 'f1-2021-udp';
import { dbSetup, createInsertSchema, objToListOfValues, marshalZoneConvert } from './dbSetup';
const fs = require('fs');

const db = dbSetup();

const client: F1TelemetryClient = new F1TelemetryClient();

// car telemetry 6
client.on('carTelemetry', function (data) {
	var m_header = data['m_header'];
	delete data['m_header'];
	data['m_sessionUID'] = m_header['m_sessionUID'];
	data['m_sessionTime'] = m_header['m_sessionTime'];
	data['m_frameIdentifier'] = m_header['m_frameIdentifier'];

	var m_carTelemetryData = data['m_carTelemetryData'];
	delete data['m_carTelemetryData'];

	db.run('INSERT INTO telemetry VALUES (?,?,?,?,?,?)', objToListOfValues(data));

	for (let i = 0; i < m_carTelemetryData.length; i++) {
		const car = m_carTelemetryData[i];
		car['m_sessionUID'] = m_header['m_sessionUID'];
		car['m_sessionTime'] = m_header['m_sessionTime'];
		car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
		car['indexx'] = i;
		db.run('INSERT INTO carTelemetry VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', objToListOfValues(car));
	}
});
/*
// event 3
client.on('event', function (data) {
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
// motion 0
client.on('motion', function (data) {
	var m_carMotionData = data['m_carMotionData'];
	delete data['m_carMotionData'];

	var m_header = data['m_header'];
	delete data['m_header'];
	data['m_sessionUID'] = m_header['m_sessionUID'];
	data['m_sessionTime'] = m_header['m_sessionTime'];
	data['m_frameIdentifier'] = m_header['m_frameIdentifier'];

	db.run('INSERT INTO motion VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', objToListOfValues(data));
	for (let i = 0; i < m_carMotionData.length; i++) {
		const car = m_carMotionData[i];
		car['m_sessionUID'] = m_header['m_sessionUID'];
		car['m_sessionTime'] = m_header['m_sessionTime'];
		car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
		car['indexx'] = i;
		db.run('INSERT INTO carMotion VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', objToListOfValues(car));
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
			'INSERT INTO lap VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
			objToListOfValues(car)
		);
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

	db.run('INSERT INTO participants VALUES (?,?,?,?)', objToListOfValues(data));
	for (let i = 0; i < m_participants.length; i++) {
		const car = m_participants[i];
		car['m_sessionUID'] = m_header['m_sessionUID'];
		car['m_sessionTime'] = m_header['m_sessionTime'];
		car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
		car['indexx'] = i;
		db.run('INSERT INTO carParticipants VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', objToListOfValues(car));
	}
});

// car setup 5
client.on('carSetups', function (data) {
	var m_header = data['m_header'];
	delete data['m_header'];
	var m_carSetups = data['m_carSetups'];
	for (let i = 0; i < m_carSetups.length; i++) {
		const car = m_carSetups[i];
		car['m_sessionUID'] = m_header['m_sessionUID'];
		car['m_sessionTime'] = m_header['m_sessionTime'];
		car['m_frameIdentifier'] = m_header['m_frameIdentifier'];
		car['indexx'] = i;
		db.run(
			'INSERT INTO carSetup VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
			objToListOfValues(car)
		);
	}
	client.stop();
});

*/

// to start listening:

client.start();
