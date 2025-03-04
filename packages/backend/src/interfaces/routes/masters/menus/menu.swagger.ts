/**
 * @swagger
 * /menus:
 *  get:
 *      summary: List menus
 *      tags:
 *          - Master - Menus
 *      description: List of menus available in database
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
 *                                                 parent_id:
 *                                                      type: string
 *                                                 name:
 *                                                      type: string
 *                                                 label:
 *                                                      type: string
 *                                                 url:
 *                                                      type: string
 *                                                 created_at:
 *                                                     type: string
 *          400:
 *              description: Bad request
 */

/**
 * @swagger
 * /menus/{id}:
 *  get:
 *      summary: Detail menu
 *      tags:
 *          - Master - Menus
 *      description: Detail information of menu selected
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of menu
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
 *                                      parent_id:
 *                                         type: string
 *                                      name:
 *                                        type: string
 *                                      label:
 *                                          type: string
 *                                      url:
 *                                          type: string
 *                                      icon:
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
 * /menus:
 *  post:
 *    summary: Create menu
 *    description: Create new menu
 *    tags: 
 *      - Master - Menus
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - name
 *                    - label
 *                    - url
 *                  properties:
 *                      parent_id:
 *                         type: string
 *                         example: ID of existing menu as a parent
 *                      name:
 *                         type: string
 *                         example: dashboard
 *                      label:
 *                        type: string
 *                        example: Dashboard
 *                      url:
 *                        type: string
 *                        example: /dashboard
 *                      icon:
 *                        type: string
 *                        example: fa fa-dashboard
 *    responses:
 *      201:
 *        description: Data is successfully created
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /menus/{id}:
 *  put:
 *    summary: Update Menu
 *    description: Update existing menu
 *    tags: 
 *      - Master - Menus
 *    parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of menu
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - name
 *                    - label
 *                    - url
 *                  properties:
 *                      parent_id:
 *                         type: string
 *                         example: ID of menu as a parent
 *                      name:
 *                         type: string
 *                         example: dashboard
 *                      label:
 *                        type: string
 *                        example: Dashboard
 *                      url:
 *                        type: string
 *                        example: /dashboard
 *                      icon:
 *                        type: string
 *                        example: fa fa-dashboard
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
 * /menus/{id}:
 *  delete:
 *      summary: Delete menu
 *      tags:
 *          - Master - Menus
 *      description: Delete menu by id
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of menu
 *      responses:
 *          204:
 *              description: Data is successfully deleted
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */