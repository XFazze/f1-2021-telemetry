var QMainWindow = require('@nodegui/nodegui').QMainWindow;
var win = new QMainWindow();
win.show();
global.win = win; // To prevent win from being garbage collected.
