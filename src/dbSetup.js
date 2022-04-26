"use strict";
exports.__esModule = true;
exports.marshalZoneConvert = exports.objToListOfNames = exports.objToListOfValues = exports.createInsertSchema = exports.dbSetup = void 0;
var sqlite3 = require('sqlite3').verbose();
function dbSetup() {
    var db = new sqlite3.Database('main.db');
    motionData(db);
    carMotionData(db);
    session(db);
    marshalZones(db);
    lapData(db);
    participantData(db);
    carParticipantData(db);
    carSetupData(db);
    return db;
}
exports.dbSetup = dbSetup;
function carSetupData(db) {
    db.run("CREATE TABLE IF NOT EXISTS carSetupData(m_frontWing INT,\n                m_rearWing INT,\n                m_onThrottle INT,\n                m_offThrottle INT,\n                m_frontCamber REAL,\n                m_rearCamber REAL,\n                m_frontToe REAL,\n                m_rearToe REAL,\n                m_frontSuspension INT,\n                m_rearSuspension INT,\n                m_frontAntiRollBar INT,\n                m_rearAntiRollBar INT,\n                m_frontSuspensionHeight INT,\n                m_rearSuspensionHeight INT,\n                m_brakePressure INT,\n                m_brakeBias INT,\n                m_rearLeftTyrePressure REAL,\n                m_rearRightTyrePressure REAL,\n                m_frontLeftTyrePressure REAL,\n                m_frontRightTyrePressure REAL,\n                m_ballast INT,\n                m_fuelLoad REAL,\n                m_sessionUID INT,\n                m_sessionTime REAL,\n                m_frameIdentifier INT,\n                indexx INT);");
    return;
}
function carParticipantData(db) {
    db.run("CREATE TABLE IF NOT EXISTS carParticipantsData(m_aiControlled INT,\n                m_driverId INT,\n                m_networkId INT,\n                m_teamId INT,\n                m_myTeam INT,\n                m_raceNumber INT,\n                m_nationality INT,\n                m_name TEXT,\n                m_yourTelemetry INT,\n                m_sessionUID INT,\n                m_sessionTime REAL,\n                m_frameIdentifier INT,\n                indexx INT);");
    return;
}
function participantData(db) {
    db.run("CREATE TABLE IF NOT EXISTS participantsData(m_numActiveCars INT,\n                m_sessionUID INT,\n                m_sessionTime REAL,\n                m_frameIdentifier INT);");
    return;
}
function lapData(db) {
    db.run("CREATE TABLE IF NOT EXISTS lapData(m_lastLapTimeInMS INT,\n                m_currentLapTimeInMS INT,\n                m_sector1TimeInMS INT,\n                m_sector2TimeInMS INT,\n                m_lapDistance REAL,\n                m_totalDistance REAL,\n                m_safetyCarDelta REAL,\n                m_carPosition INT,\n                m_currentLapNum INT,\n                m_pitStatus INT,\n                m_numPitStops INT,\n                m_sector INT,\n                m_currentLapInvalid INT,\n                m_penalties INT,\n                m_warnings INT,\n                m_numUnservedDriveThroughPens INT,\n                m_numUnservedStopGoPens INT,\n                m_gridPosition INT,\n                m_driverStatus INT,\n                m_resultStatus INT,\n                m_pitLaneTimerActive INT,\n                m_pitLaneTimeInLaneInMS INT,\n                m_pitStopTimerInMS INT,\n                m_pitStopShouldServePen INT,\n                m_sessionUID INT,\n                m_sessionTime REAL,\n                m_frameIdentifier INT,\n                indexx INT);");
    return;
}
function motionData(db) {
    db.run("CREATE TABLE IF NOT EXISTS motionData(m_header REAL,\n                m_suspensionPosition REAL,\n                m_suspensionVelocity REAL,\n                m_suspensionAcceleration REAL,\n                m_wheelSpeed REAL,\n                m_wheelSlip REAL,\n                m_localVelocityX REAL,\n                m_localVelocityY REAL,\n                m_localVelocityZ REAL,\n                m_angularVelocityX REAL,\n                m_angularVelocityY REAL,\n                m_angularVelocityZ REAL,\n                m_angularAccelerationX REAL,\n                m_angularAccelerationY REAL,\n                m_angularAccelerationZ REAL,\n                m_frontWheelsAngle REAL\n                m_sessionUID INT,\n                m_sessionTime REAL,\n                m_frameIdentifier INT);");
    return;
}
function carMotionData(db) {
    db.run("CREATE TABLE IF NOT EXISTS carMotionData(m_worldPositionX REAL,\n                m_worldPositionY REAL,\n                m_worldPositionZ REAL,\n                m_worldVelocityX REAL,\n                m_worldVelocityY REAL,\n                m_worldVelocityZ REAL,\n                m_worldForwardDirX INT,\n                m_worldForwardDirY INT,\n                m_worldForwardDirZ INT,\n                m_worldRightDirX INT,\n                m_worldRightDirY INT,\n                m_worldRightDirZ INT,\n                m_gForceLateral REAL,\n                m_gForceLongitudinal REAL,\n                m_gForceVertical REAL,\n                m_yaw REAL,\n                m_pitch REAL,\n                m_roll REAL,\n                m_sessionUID INT,\n                m_sessionTime REAL,\n                m_frameIdentifier INT,\n                indexx INT);");
    return;
}
function session(db) {
    db.run("CREATE TABLE IF NOT EXISTS sessions(m_weather INT,\n        m_trackTemperature INT,\n        m_airTemperature INT,\n        m_totalLaps INT,\n        m_trackLength INT,\n        m_sessionType INT,\n        m_trackId INT,\n        m_formula INT,\n        m_sessionTimeLeft INT,\n        m_sessionDuration INT,\n        m_pitSpeedLimit INT,\n        m_gamePaused INT,\n        m_isSpectating INT,\n        m_spectatorCarIndex INT,\n        m_sliProNativeSupport INT,\n        m_numMarshalZones INT,\n        m_safetyCarStatus INT,\n        m_networkGame INT,\n        m_numWeatherForecastSamples INT,\n        m_forecastAccuracy INT,\n        m_aiDifficulty INT,\n        m_seasonLinkIdentifier INT,\n        m_weekendLinkIdentifier INT,\n        m_sessionLinkIdentifier INT,\n        m_pitStopWindowIdealLap INT,\n        m_pitStopWindowLatestLap INT,\n        m_pitStopRejoinPosition INT,\n        m_steeringAssist INT,\n        m_brakingAssist INT,\n        m_gearboxAssist INT,\n        m_pitAssist INT,\n        m_pitReleaseAssist INT,\n        m_ERSAssist INT,\n        m_DRSAssist INT,\n        m_dynamicRacingLine INT,\n        m_dynamicRacingLineType INT,\n        m_sessionUID INT,\n        m_sessionTime REAL,\n        m_frameIdentifier INT);\n        ");
    return;
}
function marshalZones(db) {
    db.run("CREATE TABLE IF NOT EXISTS marshalZones(m_sessionUID INT,\n        m_sessionTime REAL,\n        m_frameIdentifier INT,\n        m0 INT,\n        m1 REAL,\n        m2 REAL,\n        m3 REAL,\n        m4 REAL,\n        m5 REAL,\n        m6 REAL,\n        m7 REAL,\n        m8 REAL,\n        m9 REAL,\n        m10 REAL,\n        m11 REAL,\n        m12 REAL,\n        m13 REAL,\n        m14 REAL,\n        m15 REAL,\n        m16 REAL,\n        m17 REAL,\n        m18 REAL,\n        m19 REAL,\n        m20 REAL, \n        mf0 INT, \n        mf1 INT,\n        mf2 INT,\n        mf3 INT,\n        mf4 INT,\n        mf5 INT,\n        mf6 INT,\n        mf7 INT,\n        mf8 INT,\n        mf9 INT,\n        mf10 INT,\n        mf11 INT,\n        mf12 INT,\n        mf13 INT,\n        mf14 INT,\n        mf15 INT,\n        mf16 INT,\n        mf17 INT,\n        mf18 INT,\n        mf19 INT,\n        mf20 INT);");
    return;
}
function createInsertSchema(obj, table, data, nameAddon) {
    if (nameAddon === void 0) { nameAddon = ''; }
    var s = '';
    var ss = '';
    var schema = "CREATE TABLE IF NOT EXISTS ".concat(table, "(");
    objToListOfNames(obj).forEach(function (element) {
        s += nameAddon + element + ', ';
        ss += '?,';
        schema += nameAddon + element + ' INT,\n';
    });
    console.log("db.run('INSERT INTO ".concat(table, " VALUES (").concat(ss.slice(0, -1), ")',objToListOfValues(").concat(data, "));"));
    console.log(schema.slice(0, -2) + ');');
}
exports.createInsertSchema = createInsertSchema;
function objToListOfValues(obj) {
    var array = Object.keys(obj).map(function (key) {
        return obj[key];
    });
    return array;
}
exports.objToListOfValues = objToListOfValues;
function objToListOfNames(obj) {
    var array = Object.keys(obj).map(function (key) {
        return key;
    });
    return array;
}
exports.objToListOfNames = objToListOfNames;
function marshalZoneConvert(marshalZones) {
    var r = [];
    var r2 = [];
    console.log('marhsal', marshalZones);
    marshalZones.forEach(function (zone) {
        console.log('marhsal', zone, r);
        r.push(zone['m_zoneStart']);
        r2.push(zone['m_zoneFlag']);
    });
    return r.concat(r2);
}
exports.marshalZoneConvert = marshalZoneConvert;
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
