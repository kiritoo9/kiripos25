/**
 * @swagger
 * /products:
 *  get:
 *      summary: List product
 *      tags:
 *          - Master - Products
 *      description: List of products available in database
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
 *                                                 code:
 *                                                     type: string
 *                                                 name:
 *                                                     type: string
 *                                                 capital_price:
 *                                                     type: string
 *                                                 sell_price:
 *                                                     type: string
 *                                                 status:
 *                                                     type: string
 *                                                 created_at:
 *                                                     type: string
 *                                                 product_categories:
 *                                                     type: object
 *                                                 tenants:
 *                                                     type: object
 *          400:
 *              description: Bad request
 */

/**
 * @swagger
 * /products/{id}:
 *  get:
 *      summary: Detail product
 *      tags:
 *          - Master - Products
 *      description: Detail information of product selected
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of product
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
 *                                      code:
 *                                          type: string
 *                                      name:
 *                                          type: string
 *                                      capital_price:
 *                                          type: string
 *                                      sell_price:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      images:
 *                                          type: array
 *                                          items:
 *                                              type: string
 *                                      details:
 *                                          type: string
 *                                      status:
 *                                          type: string
 *                                      tags:
 *                                          type: string
 *                                      created_at:
 *                                          type: string
 *                                      product_categories:
 *                                          type: object
 *                                      tenant:
 *                                          type: object
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */

/**
 * @swagger
 * /products:
 *  post:
 *    summary: Create Product
 *    description: Create new product
 *    tags: 
 *      - Master - Products
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - name
 *                  properties:
 *                      category_id:
 *                         type: string
 *                         example: ID of product category
 *                      tenant_id:
 *                         type: string
 *                         example: ID of tenant
 *                      code:
 *                         type: string
 *                         example: KJJ8871
 *                      name:
 *                         type: string
 *                         example: Udang rebon rich plate
 *                      capital_price:
 *                        type: number
 *                        example: 100000
 *                      sell_price:
 *                        type: number
 *                        example: 200000
 *                      description:
 *                        type: string
 *                        example: Special menu of this store
 *                      status:
 *                        type: string
 *                        example: S1
 *                      images:
 *                        type: array
 *                        items:
 *                          type: string
 *    responses:
 *      201:
 *        description: Data is successfully created
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    summary: Update Product
 *    description: Update existing product
 *    tags: 
 *      - Master - Products
 *    parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of product
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - name
 *                  properties:
 *                      category_id:
 *                         type: string
 *                         example: ID of product category
 *                      tenant_id:
 *                         type: string
 *                         example: ID of tenant
 *                      code:
 *                         type: string
 *                         example: JJHS9912
 *                      name:
 *                        type: string
 *                        example: Udang rebon rich plate
 *                      capital_price:
 *                        type: number
 *                        example: 10000
 *                      sell_price:
 *                        type: number
 *                        example: 200000
 *                      description:
 *                        type: string
 *                        example: This is main menu of our store
 *                      status:
 *                        type: string
 *                        example: S1
 *                      images:
 *                        type: array
 *                        items:
 *                          type: string
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
 * /products/{id}:
 *  delete:
 *      summary: Delete product
 *      tags:
 *          - Master - Products
 *      description: Delete product by id
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of product
 *      responses:
 *          204:
 *              description: Data is successfully deleted
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */