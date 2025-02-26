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
 *          400:
 *              description: Bad request
 */