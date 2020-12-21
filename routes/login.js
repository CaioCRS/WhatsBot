const express = require('express');
const router = express.Router();
const loginService = require('../service/login');
const enumUtils = require('../utils/enum');
const logErroService = require('../service/logErro');
const local = 'LoginRoute';

/**
 * @swagger
 * /login:
 *  post:
 *      description: Realiza login
 *      tags:
 *          - login
 *      consumes:
 *          - application/json
 *      parameters:
 *       - in: body
 *         name: user
 *         description: The user to create
 *         schema:
 *          type: object
 *          required:
 *            - username
 *              senha
 *              ipLogin
 *          properties:
 *            username:
 *              type: string
 *              description: E-mail do usuário cadastrado
 *              default: null
 *            senha:
 *              type: string
 *              description: Senha do usuário cadastrado
 *              default: null
 *            ipLogin:
 *              type: string
 *              description: Endereço IP do dispositivo que está tentando se logar
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
router.post('/', loginService.ValidaLogin, async (req, res) => {
    try {
        await loginService.RealizarLogin(req.body, (httpStatusCode, mensagem, response) => {
            return res.status(httpStatusCode).send({
                status: httpStatusCode,
                mensagem,
                response
            });
        });
    } catch (error) {
        await logErroService.EnviaLogErro({
            local: local,
            metodo: 'Realiza Login',
            descricao: error, 
            usuarioLogado: `Sistema`
        });
        return res.status(enumUtils.httpStatusCode.internalServerError).send({
            status: enumUtils.httpStatusCode.internalServerError,
            mensagem: `Erro ao realizar o login!`,
            response: null
        });
    }
});

module.exports = router;