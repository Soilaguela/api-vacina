
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: O nome do user.
 *           example: admin_user
 *         password:
 *           type: string
 *           description: O e-mail do user.
 *           example: admin
 * 
 */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /user/create:
 *   post:
 *     tags: 
 *       - User Requests
 *     summary: Registre um user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *         application/xml:  
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Criou um user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 register:
 *                   type: string
 *                   description: Criar Novo Usuario.
 *                   example: User inserido com sucesso!
 *
 * /user/login:
 *   post:
 *     tags: 
 *       - User Requests
 *     summary: Login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *         application/xml:  
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   description: The authentication boolean value.
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: The jsonwebtoken value.
 *                   example: eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiVmFnbmVyQm9tSmVzdXMiLCJVc2VybmFtZSI6IlZhZ25lciBCb20gSmVzdXMifQ.v4BcDDTFqMXhpi7ofKmhDLkkiiNtPXYlvZGgS8gU38M
 *
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas: 
 *     NovasVacinas:
 *       type: object
 *       properties:
 *         data:
 *           type: string
 *           example: Jan-12
 *         nomeVaina:
 *           type: string
 *           example: Guarda.
 *         nVacinados:
 *           type: number
 *           example: 23.
 *         localVacinacao:
 *           type: string
 *           example: string
 * 
 *     Vacinado:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: objectId
 *               description: O ID de tarefas.
 *               example: 6091316840c37846f8ed1a0f
 *         - $ref: '#/components/schemas/NovasVacinas'
 *
 * 
 * /vacina/create:
 *   post:
 *     tags: 
 *       - Vacina Requests
 *     summary: Create a Todo.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/NovasVacinas'
 *     responses:
 *       200:
 *         description: Created a Todo.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Todo created.
 *       
 * /vacina/list:
 *   get:
 *     tags: 
 *       - Vacina Requests 
 *     responses:
 *       200:
 *         description: OK.
 * 
 * /vacina/list_vacinados:
 *   get:
 *     tags: 
 *       - Vacina Requests
 *     responses:
 *       200:
 *         description: OK.
 *
 * /vacina/media:
 *   get:
 *     tags: 
 *       - Vacina Requests 
 *     responses:
 *       200:
 *         description: OK.
 *
 * /vacina/soma:
 *   get:
 *     tags: 
 *       - Vacina Requests
 *     responses:
 *       200:
 *         description: OK.
 *
 * /vacina/max:
 *   get:
 *     tags: 
 *       - Vacina Requests
 *     summary: Valor máximo de Vacinados.
 *     description: Valor máximo de Vacinados.
 *     responses:
 *       200:
 *         description: OK.
 *
 * /vacina/min:
 *   get:
 *     tags: 
 *       - Vacina Requests
 *     responses:
 *       200:
 *         description: OK.
 *             
 *
 * /vacina/search/data:
 *   get:
 *     tags: 
 *       - Vacina Requests
 *     parameters:
 *       - in: query
 *         required: false
 *         name: data
 *         description: Especifique a data no formato mm-dd.
 *         example: Jan-01
 *     responses:
 *       200:
 *         description: A lista dos Vacinados.
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NovasVacinas'
 * /vacina/search/vacina:
 *   get:
 *     tags: 
 *       - Vacina Requests 
 *     parameters:
 *       - in: query
 *         name: nomeVaina
 *         required: false 
 *         example: nomeVaina
 *     responses:
 *       200:
 *         description: A lista dos Vacinados.
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NovasVacinas'
 * 
 * /vacina/search/nVacinados:
 *   get:
 *     tags: 
 *       - Vacina Requests
 *     parameters:
 *       - in: query
 *         name: nVacinados
 *         required: false
 *         example: 6
 *     responses:
 *       200:
 *         description: A lista dos Vacinados.
 *         content:
 *           application/json:
 *             schema:
 *                   type: number
 *                   items:
 *                     $ref: '#/components/schemas/NovasVacinas'
 * 
 * /vacina/update/{_id}:
 *   put:
 *     tags: 
 *       - Vacina Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: successful operation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovasVacinas'
 *     responses:
 *       200:
 *         description: OK.
 *       404:
 *         description: not.
 * 
 * /vacina/delete/{_id}:
 *   delete:
 *     tags: 
 *       - Vacina Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK.
 * 
 */








