/**
 * @swagger
 * /tenants:
 *  get:
 *      summary: List tenants
 *      tags:
 *          - Master - Tenants
 *      description: List of tenants available in database
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
 *                                                 code:
 *                                                      type: string
 *                                                 name:
 *                                                      type: string
 *                                                 slug:
 *                                                      type: string
 *                                                 tagline:
 *                                                      type: string
 *                                                 description:
 *                                                      type: string
 *                                                 remark:
 *                                                      type: string
 *                                                 status:
 *                                                      type: string
 *                                                 created_at:
 *                                                     type: string
 *          400:
 *              description: Bad request
 */

/**
 * @swagger
 * /tenants/{id}:
 *  get:
 *      summary: Detail tenant
 *      tags:
 *          - Master - Tenants
 *      description: Detail information of tenant selected
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of tenant
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
 *                                         type: string
 *                                      name:
 *                                        type: string
 *                                      slug:
 *                                          type: string
 *                                      tagline:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      remark:
 *                                          type: string
 *                                      status:
 *                                          type: string
 *                                      created_at:
 *                                          type: string
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */

/**
 * @swagger
 * /tenants:
 *  post:
 *    summary: Create Tenant
 *    description: Create new tenant
 *    tags: 
 *      - Master - Tenants
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - name
 *                  properties:
 *                      name:
 *                         type: string
 *                         example: My Tenant
 *                      tagline:
 *                        type: string
 *                        example: The best tenant in this town
 *                      description:
 *                        type: string
 *                        example: This is my first tenant registered in this app
 *                      remark:
 *                        type: string
 *                        example: Note for this tenant (for internal purpose)
 *                      status:
 *                        type: string
 *                        example: Status of this tenant
 *    responses:
 *      201:
 *        description: Data is successfully created
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /tenants/{id}:
 *  put:
 *    summary: Update Tenant
 *    description: Update existing tenant
 *    tags: 
 *      - Master - Tenants
 *    parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of tenant
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - name
 *                  properties:
 *                      name:
 *                         type: string
 *                         example: My Tenant
 *                      tagline:
 *                        type: string
 *                        example: The best tenant in this town
 *                      description:
 *                        type: string
 *                        example: The description of this tenant
 *                      remark:
 *                        type: string
 *                        example: Note for this tenant (for internal purpose)
 *                      status:
 *                        type: string
 *                        example: Status of this tenant
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
 * /tenants/{id}:
 *  delete:
 *      summary: Delete tenant
 *      tags:
 *          - Master - Tenants
 *      description: Delete tenant by id
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of tenant
 *      responses:
 *          204:
 *              description: Data is successfully deleted
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */