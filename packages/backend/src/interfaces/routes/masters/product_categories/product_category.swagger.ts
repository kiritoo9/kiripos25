/**
 * @swagger
 * /product_categories:
 *  get:
 *      summary: List product categories
 *      tags:
 *          - Master - Product Categories
 *      description: List of product categories available in database
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
 *                                                 description:
 *                                                     type: string
 *                                                 icon:
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
 * /product_categories/{id}:
 *  get:
 *      summary: Detail product category
 *      tags:
 *          - Master - Product Categories
 *      description: Detail information of product category selected
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of product category
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
 *                                      description:
 *                                          type: string
 *                                      icon:
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
 * /product_categories:
 *  post:
 *    summary: Create Product Category
 *    description: Create new product category
 *    tags: 
 *      - Master - Product Categories
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
 *                         example: Food
 *                      description:
 *                        type: string
 *                        example: Main food
 *                      icon:
 *                        type: string
 *                        example: base64 image
 *    responses:
 *      201:
 *        description: Data is successfully created
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /product_categories/{id}:
 *  put:
 *    summary: Update Product Category
 *    description: Update existing product category
 *    tags: 
 *      - Master - Product Categories
 *    parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of product category
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
 *                         example: Food
 *                      description:
 *                        type: string
 *                        example: Main food menu
 *                      icon:
 *                        type: string
 *                        example: base64 image
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
 * /product_categories/{id}:
 *  delete:
 *      summary: Delete product category
 *      tags:
 *          - Master - Product Categories
 *      description: Delete product category by id
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of product category
 *      responses:
 *          204:
 *              description: Data is successfully deleted
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */