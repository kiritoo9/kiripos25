/**
 * @swagger
 * /tables:
 *  get:
 *      summary: List tables
 *      tags:
 *          - Master - Tables
 *      description: List of tables available in database
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
 *                                                 table_no:
 *                                                      type: string
 *                                                 person_no:
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
 * /tables/{id}:
 *  get:
 *      summary: Detail table
 *      tags:
 *          - Master - Tables
 *      description: Detail information of table selected
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of table
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
 *                                      table_no:
 *                                         type: string
 *                                      max_person:
 *                                        type: string
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
 * /tables:
 *  post:
 *    summary: Create Table
 *    description: Create new table
 *    tags: 
 *      - Master - Tables
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - table_no
 *                  properties:
 *                      tenant_id:
 *                         type: string
 *                         example: ID of tenant
 *                      table_no:
 *                         type: string
 *                         example: Number of table
 *                      max_person:
 *                        type: number
 *                        example: 1
 *                      remark:
 *                        type: string
 *                        example: Remark of this table like position or shape of the table
 *    responses:
 *      201:
 *        description: Data is successfully created
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /tables/{id}:
 *  put:
 *    summary: Update Table
 *    description: Update existing table
 *    tags: 
 *      - Master - Tables
 *    parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of table
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - table_no
 *                  properties:
 *                      tenant_id:
 *                         type: string
 *                         example: ID of tenant
 *                      table_no:
 *                         type: string
 *                         example: Number of table
 *                      max_person:
 *                        type: number
 *                        example: 1
 *                      remark:
 *                        type: string
 *                        example: Remark of this table like position or shape of the table
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
 * /tables/{id}:
 *  delete:
 *      summary: Delete table
 *      tags:
 *          - Master - Tables
 *      description: Delete table by id
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of table
 *      responses:
 *          204:
 *              description: Data is successfully deleted
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */