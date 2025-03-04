/**
 * @swagger
 * /role_menus/{role_id}:
 *  get:
 *      summary: List menus of role
 *      tags:
 *          - Master - Role Menus
 *      description: List of menus that available for each role
 *      parameters:
 *          - name: role_id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *            description: role_id selected
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
 *                                                 role_id:
 *                                                      type: string
 *                                                 menu_id:
 *                                                      type: string
 *                                                 act_view:
 *                                                      type: bool
 *                                                 act_detail:
 *                                                      type: bool
 *                                                 act_create:
 *                                                      type: bool
 *                                                 act_update:
 *                                                      type: bool
 *                                                 act_delete:
 *                                                      type: bool
 *                                                 role:
 *                                                      type: object
 *                                                 menu:
 *                                                      type: object
 *                                                 created_at:
 *                                                     type: string
 *          400:
 *              description: Bad request
 */

/**
 * @swagger
 * /role_menus/{role_id}/{id}:
 *  get:
 *      summary: Detail menu access of role
 *      tags:
 *          - Master - Role Menus
 *      description: Detail information of menu access in role selected
 *      parameters:
 *          - name: role_id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: role_id of role selected
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of role_menu selected
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
 *                                      role_id:
 *                                         type: string
 *                                      menu_id:
 *                                         type: string
 *                                      act_view:
 *                                        type: bool
 *                                      act_detail:
 *                                          type: bool
 *                                      act_create:
 *                                          type: bool
 *                                      act_update:
 *                                          type: bool
 *                                      act_delete:
 *                                          type: bool
 *                                      role:
 *                                          type: object
 *                                      menu:
 *                                          type: object
 *                                      created_at:
 *                                          type: string
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */

/**
 * @swagger
 * /role_menus/{role_id}:
 *  post:
 *    summary: Create Role Menu
 *    description: Create access control of menu by role
 *    tags: 
 *      - Master - Role Menus
 *    paramters: 
 *      - name: role_id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: role_id of role selected
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - role_id
 *                    - menu_id
 *                  properties:
 *                      role_id:
 *                         type: string
 *                         example: role_id of selected role
 *                      menu_id:
 *                         type: string
 *                         example: menu_id of selected menu
 *                      act_view:
 *                        type: bool
 *                        example: true
 *                      act_detail:
 *                        type: bool
 *                        example: true
 *                      act_create:
 *                        type: bool
 *                        example: true
 *                      act_update:
 *                        type: bool
 *                        example: true
 *                      act_delete:
 *                        type: bool
 *                        example: false
 *    responses:
 *      201:
 *        description: Data is successfully created
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /role_menus/{role_id}/{id}:
 *  put:
 *    summary: Update Role Menu
 *    description: Update access control of menu by role
 *    tags: 
 *      - Master - Role Menus
 *    parameters:
 *          - name: role_id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: role_id of role selected
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: id of role_menu selected
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                    - role_id
 *                    - menu_id
 *                  properties:
 *                      role_id:
 *                         type: string
 *                         example: role_id of selected role
 *                      menu_id:
 *                         type: string
 *                         example: menu_id of menu selected
 *                      act_view:
 *                         type: bool
 *                         example: true
 *                      act_detail:
 *                         type: bool
 *                         example: true
 *                      act_create:
 *                         type: bool
 *                         example: true
 *                      act_update:
 *                         type: bool
 *                         example: true
 *                      act_delete:
 *                         type: bool
 *                         example: true
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
 * /role_menus/{role_id}/{id}:
 *  delete:
 *      summary: Delete role menu
 *      description: Delete access control of menu role
 *      tags:
 *          - Master - Role Menus
 *      parameters:
 *          - name: role_id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: role_id of role selected
 *          - name: id
 *            in: path
 *            required: true 
 *            schema:
 *              type: string
 *            description: menu_id of menu selected
 *      responses:
 *          204:
 *              description: Data is successfully deleted
 *          400:
 *              description: Bad request
 *          404:
 *              description: Data is not found
 */