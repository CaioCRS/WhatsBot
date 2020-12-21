const express = require('express');
const router = express.Router();
const usuarioService = require('../service/usuario');
const logErroService = require('../service/logErro');
const securityUtils = require('../utils/security');

const local = 'UsuarioRoute';
// /**
//  * @swagger
//  * /usuario:
//  *  get:
//  *      description: Busca todos os usuários
//  *      tags:
//  *          - usuario
//  *      responses:
//  *          '200':
//  *              description: Usuários retornados com sucesso!
//  */
// router.get('/',  (req, res, next) => {//security.validaToken,

//     try {
//         security.JwtVerify(req.token, process.env['SECRET_KEY'], (httpStatusCode, mensagem, response) => {
//             return res.status(httpStatusCode).send({
//                 mensagem,
//                 response
//             });
//         });
//     } catch (error) {
        
//     }

//     // jwt.verify(req.token, process.env['SECRET_KEY'], (err, authData) => {
//     //     if (err){
//     //         res.sendStatus(403);
//     //     }else{
//     //         res.json({
//     //             mensagem: 'teste 2',
//     //             authData
//     //         });
//     //     }
//     // });  
// });

// /**
//  * @swagger
//  * /usuario/{usuario_id}:
//  *  get:
//  *      description: Busca um usuário por ID
//  *      tags:
//  *          - usuario
//  *      parameters:
//  *        - name: usuario_id
//  *          in: path
//  *          description: Id do usuário
//  *          required: true
//  *          type: integer    
//  *      responses:
//  *          '200':
//  *              description: Usuário retornado com sucesso!
//  */
// router.get('/:usuario_id', security.ValidaToken, (req, res, next) => {
//     res.status(200).send({
//         mensagem: `teste parametro: ${req.params.usuario_id}`
//     });
// });

/* #region Cadastro de usuário */
/**
 * @swagger
 * /usuario:
 *  post:
 *      description: Cadastro de usuário
 *      tags:
 *          - usuario
 *      consumes:
 *          - application/json
 *      parameters:
 *       - in: body
 *         name: usuario
 *         description: Dados do usuário
 *         schema:
 *          type: object
 *          required:
 *            - nome
 *              genero
 *              dataNascimento
 *              cep
 *              logradouro
 *              numeroEndereco
 *              pontoReferencia
 *          properties:
 *            nome:
 *              type: string
 *              description: Nome do usuário
 *              default: null
 *            genero:
 *              type: integer
 *              description: Gênero do usuário - 1 Masculino 2 Feminino 3 Outros
 *              default: null
 *            dataNascimento:
 *              type: string
 *              description: Data de nascimento no formato YYYY-MM-DD
 *              default: null
 *            cep:
 *              type: string
 *              description: CEP/ZIPCODE do usuário sem máscara ou caracteres especiais
 *              default: null
 *            logradouro:
 *              type: string
 *              description: Endereço do usuário, somente o tipo e nome da rua. Ex Av. Marechal Floriano Peixoto
 *              default: null
 *            numeroEndereco:
 *              type: string
 *              description: Número do endereço
 *              default: null
 *            complemento:
 *              type: string
 *              description: Complemento do endereço. Ex casa 1, apartamento, bloco, fundos, sobrado, etc
 *              default: null
 *            pontoReferencia:
 *              type: string
 *              description: Referência para auxiliar na identificação da moradia
 *              default: null
 *            bairroId:
 *              type: integer
 *              default: null
 *            cidadeId:
 *              type: integer
 *              default: null
 *            telefone1:
 *              type: string
 *              default: null
 *            telefone2:
 *              type: string
 *              default: null
 *            email:
 *              type: string
 *              description: Email do usuário
 *              default: null
 *            tipoDocumento:
 *              type: integer
 *              description: Tipo do documento selecionado - 1 RG 2 CPF
 *              default: null
 *            documento:
 *              type: string
 *              description: Número do documento
 *              default: null
 *            contemFiltro:
 *              type: boolean
 *              description: Parâmetro para indicar se foi informado um filtro pré-definido no cadastro
 *              default: false
 *            faixaEtariaInicio:
 *              type: integer
 *              description: Parâmetro para cadastrar o filtro inicial do usuário para atendimento, para atender somente à partir de determinada idade
 *              default: null
 *            faixaEtariaFim:
 *              type: integer
 *              description: Parâmetro para cadastrar o filtro inicial do usuário para atendimento, para atender somente até determinada idade
 *              default: null
 *            bairroAtendimentoId:
 *              type: integer
 *              description: Parâmetro para cadastrar o filtro inicial do usuário para atendimento, para atender somente determinado bairro
 *              default: null
 *            cidadeAtendimentoId:
 *              type: integer
 *              description: Parâmetro para cadastrar o filtro inicial do usuário para atendimento, para atender somente determinada cidade
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
router.post('/', usuarioService.ValidaUsuario, securityUtils.JwtVerify, async (req, res) => {
    try {
        await usuarioService.CriaUsuario(req.body, (httpStatusCode, mensagem) => {
            return res.status(httpStatusCode).send({
                status: httpStatusCode,
                mensagem,
                response: null
            });
        });
    } catch (error) {
        await logErroService.EnviaLogErro({
            local: local,
            metodo: 'Cadastro de Usuário',
            descricao: error, 
            usuarioLogado: `${req.app.locals.authData.username} - ${req.app.locals.authData.ipLogin}`
        });
        return res.status(enumUtils.httpStatusCode.internalServerError).send({
            status: enumUtils.httpStatusCode.internalServerError,
            mensagem: `Erro ao criar o usuário!`,
            response: null
        });
    }
});
/* #endregion */

module.exports = router;