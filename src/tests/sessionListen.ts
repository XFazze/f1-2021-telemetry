import { F1TelemetryClient } from 'f1-2021-udp';

const client: F1TelemetryClient = new F1TelemetryClient();

// motion 0
client.on('motion', function (data) {
	console.log(data);
});

// session 1
client.on('session', function (data) {
	console.log(data);
});

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

// to start listening:
client.start();
