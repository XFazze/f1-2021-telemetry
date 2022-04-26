import { F1TelemetryClient } from 'f1-2021-udp';
import { dbSetup, createInsertSchema, objToListOfValues, marshalZoneConvert } from './dbSetup';
const fs = require('fs');

const db = dbSetup();

const client: F1TelemetryClient = new F1TelemetryClient();
// motion 0
client.on('motion', function (data) {
	console.log(data);
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
		'INSERT INTO sessions(m_weather, m_trackTemperature, m_airTemperature, m_totalLaps, m_trackLength, m_sessionType, m_trackId, m_formula, m_sessionTimeLeft, m_sessionDuration, m_pitSpeedLimit, m_gamePaused, m_isSpectating, m_spectatorCarIndex, m_sliProNativeSupport, m_numMarshalZones, m_safetyCarStatus, m_networkGame, m_numWeatherForecastSamples, m_forecastAccuracy, m_aiDifficulty, m_seasonLinkIdentifier, m_weekendLinkIdentifier, m_sessionLinkIdentifier, m_pitStopWindowIdealLap, m_pitStopWindowLatestLap, m_pitStopRejoinPosition, m_steeringAssist, m_brakingAssist, m_gearboxAssist, m_pitAssist, m_pitReleaseAssist, m_ERSAssist, m_DRSAssist, m_dynamicRacingLine, m_dynamicRacingLineType, m_sessionUID, m_sessionTime, m_frameIdentifier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
		objToListOfValues(data)
	);
	db.run(
		'INSERT INTO marshalZones(m_sessionUID, m_sessionTime, m_frameIdentifier, m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m20,mf0, mf1, mf2, mf3, mf4, mf5, mf6, mf7, mf8, mf9, mf10, mf11, mf12, mf13, mf14, mf15, mf16, mf17, mf18, mf19, mf20) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
		m_marshalZones
	);

	client.stop();
});
/*
// lap data 2
client.on('lapData', function (data) {
	console.log(data);
});

// event 3
client.on('event', function (data) {
	console.log(data);
});

// participants 4
client.on('participants', function (data) {
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

//async () => {
//	await end();
//};

client.start();
