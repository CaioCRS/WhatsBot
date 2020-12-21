var nodemailer = require('nodemailer');
const enumUtils = require('../utils/enum');

async function EnviaEmail(mail, callback){
    
    var remetente = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env['EMAIL'],
          pass: process.env['PASSWORD_EMAIL']
        }
    });

    var mail = {
        from: process.env['EMAIL'],
        to: mail.mailTo,
        subject: mail.subject,
        text: mail.text
    };

    remetente.sendMail(mail, function(error){
        if (error) {
            callback(enumUtils.httpStatusCode.internalServerError, 'Erro ao enviar e-mail');
        } else {
            callback(enumUtils.httpStatusCode.ok, 'E-mail enviado com sucesso');
        }
    });
};

module.exports = { EnviaEmail }