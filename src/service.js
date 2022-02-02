var Service = require('node-windows').Service

var svc = new Service({
	name:'ImapDesk',
	description: 'Servidor Imap para o AgilusDesk',
	script: __dirname + '/index.js'
})

svc.on('install', () => {
	svc.start()
});

svc.install()