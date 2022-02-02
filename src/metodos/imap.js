const Imap = require('imap')

module.exports = () => {
  const imap = new Imap({
    user: process.env.MAIL_USUARIO,
    password: process.env.MAIL_SENHA,
    host: 'email-ssl.com.br',
    port: 993,
    tls: true,
    tlsOptions: { servername: 'email-ssl.com.br' }
  })
  return {
    conectar () {
      return new Promise((resolve, reject) => {
        imap.connect()
        imap.on('ready', () => { resolve() }) 
        imap.on('error', (error) => { reject(error) })
      })
    },
    desconectar() {
      return new Promise((resolve, reject) => {
        try {
          imap.end()
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    async processaEmails (arrayEmails) {
      try {
        await this.conectar()
        await this.abrirCaixa('INBOX')
        for (const email of arrayEmails) {
          await this.moverEmail(email.caixaDestino)
        }
      } catch (error) {
        throw error
      } finally {
        await this.desconectar()
      }
    },
    async moverEmail (caixaDestino) {
      return new Promise((resolve, reject) => {
        imap.seq.move(1, caixaDestino, (error) => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
    },
    async abrirCaixa (caixa) {
      return new Promise((resolve, reject) => {
        imap.openBox(caixa, true, (err, box) => {
          if (err) {
            reject(err)
          } else {
            resolve(box)
          }
        })
      })
    }
  }
}
