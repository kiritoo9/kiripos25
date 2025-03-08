/**
 * @swagger
 * /branches:
 *  get:
 *      summary: List branches
 *      tags:
 *          - Master - Branches
 *      description: List of branches available in database
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
 *                                                 tenant_id:
 *                                                      type: string
 *                                                 name:
 *                                                      type: string
 *                                                 phone:
 *                                                      type: string
 *                                                 address:
 *                                                      type: string
 *                                                 remark:
 *                                                      type: string
 *                                                 created_at:
 *                                                     type: string
 *                                                 tenants:
 *                                                     type: object
 *          400:
 *              description: Bad request
 */

/**
 * @swagger
 * /branches/{id}:
 *  get:
 *      summary: Detail branch
 *      tags:
 *          - Master - Branches
 *      description: Detail information of branch selected
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of branch
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
 *                                      id:
 *                                          type: string
 *                                      tenant_id:
 *                                          type: string
 *                                      name:
 *                                         type: string
 *                                      phone:
 *                                        type: string
 *                                      address:
 *                                          type: string
 *                                      remark:
 *                                          type: string
 *                                      created_at:
 *                                          type: string
 *                                      tenant:
 *                                          type: object
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */

/**
 * @swagger
 * /branches:
 *  post:
 *    summary: Create Branch
 *    description: Create new branch
 *    tags: 
 *      - Master - Branches
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - name
 *                  properties:
 *                      tenant_id:
 *                         type: string
 *                         example: ID of tenant
 *                      name:
 *                         type: string
 *                         example: Branch Sample
 *                      phone:
 *                        type: number
 *                        example: 098761231
 *                      address:
 *                        type: string
 *                        example: Jl. Kramat jati no. 9912, Jakarta Timur
 *                      remark:
 *                        type: string
 *                        example: Branch for specific products
 *    responses:
 *      201:
 *        description: Data is successfully created
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /branches/{id}:
 *  put:
 *    summary: Update Branch
 *    description: Update existing branch
 *    tags: 
 *      - Master - Branches
 *    parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of branch
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - name
 *                  properties:
 *                      tenant_id:
 *                         type: string
 *                         example: ID of tenant
 *                      name:
 *                         type: string
 *                         example: Branch Sample
 *                      phone:
 *                        type: number
 *                        example: 098761231
 *                      address:
 *                        type: string
 *                        example: Jl. Kramat jati no. 9912, Jakarta Timur
 *                      remark:
 *                        type: string
 *                        example: Branch for specific products
 *    responses:
 *      204:
 *        description: Data is successfully updated
 *      400:
 *        description: Bad request
 *      404:
 *        description: Data is not found
 */

/**
 * @swagger
 * /branches/{id}:
 *  delete:
 *      summary: Delete branch
 *      tags:
 *          - Master - Branches
 *      description: Delete branch by id
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of branch
 *      responses:
 *          204:
 *              description: Data is successfully deleted
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */