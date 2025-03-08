/**
 * @swagger
 * /customers:
 *  get:
 *      summary: List customer
 *      tags:
 *          - Master - Customers
 *      description: List of customers available in database
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
 *                                                     type: string
 *                                                 tenant_id:
 *                                                     type: string
 *                                                 name:
 *                                                     type: string
 *                                                 email:
 *                                                     type: string
 *                                                 phone:
 *                                                     type: string
 *                                                 address:
 *                                                     type: string
 *                                                 remark:
 *                                                     type: string
 *                                                 created_at:
 *                                                     type: string
 *                                                 tenants:
 *                                                     type: object
 *          400:
 *              description: Bad request
 */

/**
 * @swagger
 * /customers/{id}:
 *  get:
 *      summary: Detail customer
 *      tags:
 *          - Master - Customers
 *      description: Detail information of customer selected
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of customer
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
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      phone:
 *                                          type: string
 *                                      address:
 *                                          type: string
 *                                      gender:
 *                                          type: string
 *                                      range_of_age:
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
 * /customers:
 *  post:
 *    summary: Create Customer
 *    description: Create new customer
 *    tags: 
 *      - Master - Customers
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
 *                         example: johndoe
 *                      phone:
 *                        type: string
 *                        example: 091723123
 *                      email:
 *                        type: string
 *                        example: johndoe@email.com
 *                      address:
 *                        type: string
 *                        example: Around the city, near river, Jakarta Timur
 *                      gender:
 *                        type: string
 *                        example: M
 *                      range_of_age:
 *                        type: string
 *                        example: 18
 *                      remark:
 *                        type: string
 *                        example: Leave your remark for this customer
 *    responses:
 *      201:
 *        description: Data is successfully created
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /customers/{id}:
 *  put:
 *    summary: Update Customer
 *    description: Update existing customer
 *    tags: 
 *      - Master - Customers
 *    parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of customer
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
 *                         example: johndoe
 *                      phone:
 *                        type: string
 *                        example: 09812312331
 *                      email:
 *                        type: string
 *                        example: johndoe@email.com
 *                      address:
 *                        type: string
 *                        example: Around the city, near river, Jakarta Timur
 *                      gender:
 *                        type: string
 *                        example: M
 *                      range_of_age:
 *                        type: string
 *                        example: 18
 *                      remark:
 *                        type: string
 *                        example: Leave your remark for this customer
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
 * /customers/{id}:
 *  delete:
 *      summary: Delete customer
 *      tags:
 *          - Master - Customers
 *      description: Delete customer by id
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of customer
 *      responses:
 *          204:
 *              description: Data is successfully deleted
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */