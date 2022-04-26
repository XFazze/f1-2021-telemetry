var sqlite3 = require('sqlite3').verbose();

export function dbSetup() {
	const db = new sqlite3.Database('main.db');
	motionData(db);
	carMotionData(db);

	session(db);
	marshalZones(db);

	lapData(db);

	participantData(db);
	carParticipantData(db);

	carSetupData(db);

	telemetryData(db);
	cartelemetryData(db);

	carStatus(db);

	carDamage(db);
	return db;
}
function carDamage(db) {
	db.run(`CREATE TABLE IF NOT EXISTS carDamage(m_tyresWear REAL,
                m_tyresDamage INT,
                m_brakesDamage INT,
                m_frontLeftWingDamage INT,
                m_frontRightWingDamage INT,
                m_rearWingDamage INT,
                m_floorDamage INT,
                m_diffuserDamage INT,
                m_sidepodDamage INT,
                m_drsFault INT,
                m_gearBoxDamage INT,
                m_engineDamage INT,
                m_engineMGUHWear INT,
                m_engineESWear INT,
                m_engineCEWear INT,
                m_engineICEWear INT,
                m_engineMGUKWear INT,
                m_engineTCWear INT,
                m_sessionUID INT,
                m_sessionTime REAL,
                m_frameIdentifier INT,
                indexx INT);`);
	return;
}
function carStatus(db) {
	db.run(`CREATE TABLE IF NOT EXISTS carStatus(m_tractionControl INT,
                m_antiLockBrakes INT,
                m_fuelMix INT,
                m_frontBrakeBias INT,
                m_pitLimiterStatus INT,
                m_fuelInTank REAL,
                m_fuelCapacity REAL,
                m_fuelRemainingLaps REAL,
                m_maxRPM INT,
                m_idleRPM INT,
                m_maxGears INT,
                m_drsAllowed INT,
                m_drsActivationDistance INT,
                m_actualTyreCompound INT,
                m_visualTyreCompound INT,
                m_tyresAgeLaps INT,
                m_vehicleFiaFlags INT,
                m_ersStoreEnergy REAL,
                m_ersDeployMode INT,
                m_ersHarvestedThisLapMGUK REAL,
                m_ersHarvestedThisLapMGUH REAL,
                m_ersDeployedThisLap REAL,
                m_networkPaused INT,
                m_sessionUID INT,
                m_sessionTime REAL,
                m_frameIdentifier INT,
                indexx INT);`);
	return;
}
function telemetryData(db) {
	db.run(`CREATE TABLE IF NOT EXISTS carTelemetry(m_speed INT,
                m_throttle REAL,
                m_steer REAL,
                m_brake REAL,
                m_clutch INT,
                m_gear INT,
                m_engineRPM INT,
                m_drs INT,
                m_revLightsPercent INT,
                m_revLightsBitValue INT,
                m_brakesTemperature INT,
                m_tyresSurfaceTemperature INT,
                m_tyresInnerTemperature INT,
                m_engineTemperature INT,
                m_tyresPressure REAL,
                m_surfaceType INT,
                m_sessionUID INT,
                m_sessionTime REAL,
                m_frameIdentifier INT,
                indexx INT);`);
	return;
}
function cartelemetryData(db) {
	db.run(`CREATE TABLE IF NOT EXISTS telemetry(m_mfdPanelIndex INT,
                m_mfdPanelIndexSecondaryPlayer INT,
                m_suggestedGear INT,
                m_sessionUID INT,
                m_sessionTime REAL,
                m_frameIdentifier INT);`);
	return;
}
function carSetupData(db) {
	db.run(`CREATE TABLE IF NOT EXISTS carSetupData(m_frontWing INT,
                m_rearWing INT,
                m_onThrottle INT,
                m_offThrottle INT,
                m_frontCamber REAL,
                m_rearCamber REAL,
                m_frontToe REAL,
                m_rearToe REAL,
                m_frontSuspension INT,
                m_rearSuspension INT,
                m_frontAntiRollBar INT,
                m_rearAntiRollBar INT,
                m_frontSuspensionHeight INT,
                m_rearSuspensionHeight INT,
                m_brakePressure INT,
                m_brakeBias INT,
                m_rearLeftTyrePressure REAL,
                m_rearRightTyrePressure REAL,
                m_frontLeftTyrePressure REAL,
                m_frontRightTyrePressure REAL,
                m_ballast INT,
                m_fuelLoad REAL,
                m_sessionUID INT,
                m_sessionTime REAL,
                m_frameIdentifier INT,
                indexx INT);`);
	return;
}
function carParticipantData(db) {
	db.run(`CREATE TABLE IF NOT EXISTS carParticipants(m_aiControlled INT,
                m_driverId INT,
                m_networkId INT,
                m_teamId INT,
                m_myTeam INT,
                m_raceNumber INT,
                m_nationality INT,
                m_name TEXT,
                m_yourTelemetry INT,
                m_sessionUID INT,
                m_sessionTime REAL,
                m_frameIdentifier INT,
                indexx INT);`);
	return;
}
function participantData(db) {
	db.run(`CREATE TABLE IF NOT EXISTS participants(m_numActiveCars INT,
                m_sessionUID INT,
                m_sessionTime REAL,
                m_frameIdentifier INT);`);
	return;
}
function lapData(db) {
	db.run(`CREATE TABLE IF NOT EXISTS lap(m_lastLapTimeInMS INT,
                m_currentLapTimeInMS INT,
                m_sector1TimeInMS INT,
                m_sector2TimeInMS INT,
                m_lapDistance REAL,
                m_totalDistance REAL,
                m_safetyCarDelta REAL,
                m_carPosition INT,
                m_currentLapNum INT,
                m_pitStatus INT,
                m_numPitStops INT,
                m_sector INT,
                m_currentLapInvalid INT,
                m_penalties INT,
                m_warnings INT,
                m_numUnservedDriveThroughPens INT,
                m_numUnservedStopGoPens INT,
                m_gridPosition INT,
                m_driverStatus INT,
                m_resultStatus INT,
                m_pitLaneTimerActive INT,
                m_pitLaneTimeInLaneInMS INT,
                m_pitStopTimerInMS INT,
                m_pitStopShouldServePen INT,
                m_sessionUID INT,
                m_sessionTime REAL,
                m_frameIdentifier INT,
                indexx INT);`);
	return;
}
function motionData(db) {
	db.run(`CREATE TABLE IF NOT EXISTS motion(m_header REAL,
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
	db.run(`CREATE TABLE IF NOT EXISTS carMotion(m_worldPositionX REAL,
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
		schema += nameAddon + element + ' INT,\n';
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
