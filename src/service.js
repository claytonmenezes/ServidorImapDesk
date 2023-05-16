var Service = require('node-windows').Service

var svc = new Service({
	name:'MoveEmailAgilusDesk',
	description: 'Serviço para mover emails do AgilusDesk',
	script: __dirname + '/index.js'
})

svc.on('install', () => {
	svc.start()
});

svc.install()