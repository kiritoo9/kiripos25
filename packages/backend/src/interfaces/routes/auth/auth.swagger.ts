/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login user
 *    description: Login user with username and password
 *    tags: 
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - username
 *                    - password  
 *                  properties:
 *                      username:
 *                         type: string
 *                         example: admin
 *                      password:
 *                        type: string
 *                        example: kiripos123
 *                        format: password
 *    responses:
 *      200:
 *        description: Login success
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /auth/refresh-token:
 *  post:
 *    summary: Refresh your token
 *    description: Refresh your token with refresh token
 *    tags: 
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - refresh_token
 *                  properties:
 *                      refresh_token:
 *                         type: string
 *                         example: your-token-here
 *    responses:
 *      200:
 *        description: Login success
 *      400:
 *        description: Bad request
 */