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
 *            description: page position you request
 *          - name: limit
 *            in: query
 *            schema:
 *              type: integer
 *            description: limit of data you request
 *          - name: sort
 *            in: query
 *            schema:
 *              type: string
 *              example: field_name:desc
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
 *                              status: 
 *                                  type: boolean
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
 *                                                 fullname:
 *                                                      type: string
 *                                                 email:
 *                                                      type: string
 *                                                 phone:
 *                                                      type: string
 *                                                 address:
 *                                                     type: string
 *                                                 role_name:
 *                                                     type: string
 *                                                 created_at:
 *                                                     type: string
 *          400:
 *              description: Bad request
 */