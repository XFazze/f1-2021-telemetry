var sqlite3 = require('sqlite3').verbose();

export function dbSetup() {
	const db = new sqlite3.Database('main.db');
	motionData(db);
	carMotionData(db);

	session(db);
	marshalZones(db);

	return db;
}
function motionData(db) {
	db.run(`CREATE TABLE IF NOT EXISTS motionData(m_header REAL,
                m_suspensionPosition REAL,
                m_suspensionVelocity REAL,
                m_suspensionAcceleration REAL,
                m_wheelSpeed REAL,
                m_wheelSlip REAL,
                m_localVelocityX REAL,
                m_localVelocityY REAL,
                m_localVelocityZ REAL,
                m_angularVelocityX REAL,
                m_angularVelocityY REAL,
                m_angularVelocityZ REAL,
                m_angularAccelerationX REAL,
                m_angularAccelerationY REAL,
                m_angularAccelerationZ REAL,
                m_frontWheelsAngle REAL
                m_sessionUID INT,
                m_sessionTime REAL,
                m_frameIdentifier INT);`);
	return;
}
function carMotionData(db) {
	db.run(`CREATE TABLE IF NOT EXISTS carMotionData(m_worldPositionX REAL,
                m_worldPositionY REAL,
                m_worldPositionZ REAL,
                m_worldVelocityX REAL,
                m_worldVelocityY REAL,
                m_worldVelocityZ REAL,
                m_worldForwardDirX INT,
                m_worldForwardDirY INT,
                m_worldForwardDirZ INT,
                m_worldRightDirX INT,
                m_worldRightDirY INT,
                m_worldRightDirZ INT,
                m_gForceLateral REAL,
                m_gForceLongitudinal REAL,
                m_gForceVertical REAL,
                m_yaw REAL,
                m_pitch REAL,
                m_roll REAL,
                m_sessionUID INT,
                m_sessionTime REAL,
                m_frameIdentifier INT,
                indexx INT);`);
	return;
}
function session(db) {
	db.run(`CREATE TABLE IF NOT EXISTS sessions(m_weather INT,
        m_trackTemperature INT,
        m_airTemperature INT,
        m_totalLaps INT,
        m_trackLength INT,
        m_sessionType INT,
        m_trackId INT,
        m_formula INT,
        m_sessionTimeLeft INT,
        m_sessionDuration INT,
        m_pitSpeedLimit INT,
        m_gamePaused INT,
        m_isSpectating INT,
        m_spectatorCarIndex INT,
        m_sliProNativeSupport INT,
        m_numMarshalZones INT,
        m_safetyCarStatus INT,
        m_networkGame INT,
        m_numWeatherForecastSamples INT,
        m_forecastAccuracy INT,
        m_aiDifficulty INT,
        m_seasonLinkIdentifier INT,
        m_weekendLinkIdentifier INT,
        m_sessionLinkIdentifier INT,
        m_pitStopWindowIdealLap INT,
        m_pitStopWindowLatestLap INT,
        m_pitStopRejoinPosition INT,
        m_steeringAssist INT,
        m_brakingAssist INT,
        m_gearboxAssist INT,
        m_pitAssist INT,
        m_pitReleaseAssist INT,
        m_ERSAssist INT,
        m_DRSAssist INT,
        m_dynamicRacingLine INT,
        m_dynamicRacingLineType INT,
        m_sessionUID INT,
        m_sessionTime REAL,
        m_frameIdentifier INT);
        `);
	return;
}

function marshalZones(db) {
	db.run(`CREATE TABLE IF NOT EXISTS marshalZones(m_sessionUID INT,
        m_sessionTime REAL,
        m_frameIdentifier INT,
        m0 INT,
        m1 REAL,
        m2 REAL,
        m3 REAL,
        m4 REAL,
        m5 REAL,
        m6 REAL,
        m7 REAL,
        m8 REAL,
        m9 REAL,
        m10 REAL,
        m11 REAL,
        m12 REAL,
        m13 REAL,
        m14 REAL,
        m15 REAL,
        m16 REAL,
        m17 REAL,
        m18 REAL,
        m19 REAL,
        m20 REAL, 
        mf0 INT, 
        mf1 INT,
        mf2 INT,
        mf3 INT,
        mf4 INT,
        mf5 INT,
        mf6 INT,
        mf7 INT,
        mf8 INT,
        mf9 INT,
        mf10 INT,
        mf11 INT,
        mf12 INT,
        mf13 INT,
        mf14 INT,
        mf15 INT,
        mf16 INT,
        mf17 INT,
        mf18 INT,
        mf19 INT,
        mf20 INT);`);
	return;
}

export function createInsertSchema(obj, table, data, nameAddon = '') {
	var s = '';
	var ss = '';
	var schema = `CREATE TABLE IF NOT EXISTS ${table}(`;
	objToListOfNames(obj).forEach((element) => {
		s += nameAddon + element + ', ';
		ss += '?,';
		schema += nameAddon + element + ' REAL,\n';
	});
	console.log(`db.run('INSERT INTO ${table} VALUES (${ss.slice(0, -1)})',objToListOfValues(${data}));`);
	console.log(schema.slice(0, -2) + ');');
}

export function objToListOfValues(obj) {
	var array = Object.keys(obj).map(function (key) {
		return obj[key];
	});
	return array;
}
export function objToListOfNames(obj) {
	var array = Object.keys(obj).map(function (key) {
		return key;
	});
	return array;
}
export function marshalZoneConvert(marshalZones) {
	var r = [];
	var r2 = [];
	console.log('marhsal', marshalZones);
	marshalZones.forEach((zone) => {
		console.log('marhsal', zone, r);
		r.push(zone['m_zoneStart']);
		r2.push(zone['m_zoneFlag']);
	});
	return r.concat(r2);
}
/*
class sessionSchema {
	@Primary()
	id: number = 0;

	@Column('INTEGER')
	m_sessionUID: number = 0;

	@Column('REAL')
	m_sessionTime: number = 0;

	@Column('INTEGER')
	m_sessionUID: number = 0;
}
*/
