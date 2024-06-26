const express = require('express');
const router = express.Router();
const emailService = require('../service/email');
const enumUtils = require('../utils/enum');

/* #region Envio de e-mail */
/**
 * @swagger
 * /email:
 *  post:
 *      description: Envio de e-mail
 *      tags:
 *          - e-mail
 *      consumes:
 *          - application/json
 *      parameters:
 *       - in: body
 *         name: email
 *         description: Informações do e-mail
 *         schema:
 *          type: object
 *          required:
 *            - mailTo
 *              subject
 *              text
 *          properties:
 *            mailTo:
 *              type: string
 *              description: E-mail do destinatário
 *              default: null
 *            subject:
 *              type: string
 *              description: Assunto do e-mail
 *              default: null
 *            text:
 *              type: string
 *              description: Texto do corpo do e-mail
 *              default: null
 *      responses:
 *          '201':
 *              description: OK
 *          '400':
 *              description: Bad request.
 *          '401':
 *              description: Authorization information is missing or invalid.
 *          '404':
 *              description: Not found.
 *          '500':
 *              description: Unexpected error.
 */
router.post('/', async (req, res) => {
    try {
        await emailService.EnviaEmail(req.body, (httpStatusCode, mensagem) => {
            res.status(httpStatusCode).send({
                mensagem
            });
        });
    } catch (error) {
        console.log(error);
        res.status(enumUtils.httpStatusCode.internalServerError).send({
            mensagem: `Erro ao criar o usuário!`
        });
    }
    
});
/* #endregion */

module.exports = router;