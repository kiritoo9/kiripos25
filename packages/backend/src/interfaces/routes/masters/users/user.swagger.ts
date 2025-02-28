/**
 * @swagger
 * /users:
 *  get:
 *      summary: List user
 *      tags:
 *          - Master - Users
 *      description: List of users available in database
 *      parameters:
 *          - name: page
 *            in: query
 *            schema:
 *              type: integer
 *              example: 1
 *            description: page position you request
 *          - name: limit
 *            in: query
 *            schema:
 *              type: integer
 *              example: 10
 *            description: limit of data you request
 *          - name: sort
 *            in: query
 *            schema:
 *              type: string
 *              example: created_at:DESC
 *            description: sort of data you request
 *          - name: search
 *            in: query
 *            schema:
 *              type: string
 *            description: search of data you request
 *      responses:
 *          200:
 *              description: Request success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      parameters:
 *                                          type: object
 *                                          properties:
 *                                             page: 
 *                                                  type: integer
 *                                             limit: 
 *                                                  type: integer
 *                                             sort: 
 *                                                  type: string
 *                                             search: 
 *                                                  type: string
 *                                      data:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                 id:
 *                                                      type: string
 *                                                 username:
 *                                                      type: string
 *                                                 profiles:
 *                                                     type: object
 *                                                 roles:
 *                                                     type: object
 *                                                 created_at:
 *                                                     type: string
 *          400:
 *              description: Bad request
 */

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Detail user
 *      tags:
 *          - Master - Users
 *      description: Detail of user selected, it will return user, user profile, user role, and user branch
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of user
 *      responses:
 *          200:
 *              description: Request success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      user:
 *                                          type: object
 *                                      user_profiles:
 *                                         type: object
 *                                      user_roles:
 *                                        type: object
 *                                      user_branches:
 *                                          type: object
 *          400:
 *              description: Bad request
 */

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Create User
 *    description: Create new user
 *    tags: 
 *      - Master - Users
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - role_id
 *                    - branch_id
 *                    - username
 *                    - password
 *                    - fullname
 *                  properties:
 *                      role_id:
 *                         type: string
 *                         example: uuid-of-role
 *                      branch_id:
 *                         type: string
 *                         example: uuid-of-branch
 *                      username:
 *                         type: string
 *                         example: john
 *                      password:
 *                         type: string
 *                         example: 12345
 *                         format: password
 *                      fullname:
 *                        type: string
 *                        example: John Doe
 *                      email:
 *                        type: string
 *                        example: jonhdoe@email.com
 *                      phone:
 *                        type: string
 *                        example: 0899712312
 *                      address:
 *                        type: string
 *                        example: Jl. Merpati Setia Makmur, Jatibening, Jakarta Timur
 *    responses:
 *      201:
 *        description: Data is successfully created
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update User
 *     description: Update an existing user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     tags:
 *       - Master - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_id
 *               - branch_id
 *               - username
 *               - fullname
 *             properties:
 *               role_id:
 *                 type: string
 *                 example: uuid-of-role
 *               branch_id:
 *                 type: string
 *                 example: uuid-of-branch
 *               username:
 *                 type: string
 *                 example: john
 *               password:
 *                 type: string
 *                 example: 12345
 *                 format: password
 *               fullname:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@email.com
 *               phone:
 *                 type: string
 *                 example: 0899712312
 *               address:
 *                 type: string
 *                 example: "-"
 *     responses:
 *       204:
 *         description: Data is successfully updated
 *       400:
 *         description: Bad request
 */


/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: Delete user
 *      tags:
 *          - Master - Users
 *      description: Delete user by id
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of user
 *      responses:
 *          204:
 *              description: Data is susccessfully deleted
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */