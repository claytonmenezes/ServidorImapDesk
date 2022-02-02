require('dotenv').config()
const express = require('express'),
cors = require('cors'),
imap = require('./metodos/imap'),
metodosImap = imap()

let app = express()
app.use(express.json())
app.set('port', 41202)
app.use(cors())
app.post('/MoveEmail', async (req, res) => {
	try {
		await metodosImap.processaEmails(req.body)
		res.sendStatus(200)
	} catch (error) {
		res.status(500).send(error.message)
	}
})
app.listen(app.get('port'), async () => {
	console.log('Servidor rodando na porta', app.get('port'))
})

