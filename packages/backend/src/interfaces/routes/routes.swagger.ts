/**
 * @swagger
 * /:
 *  get:
 *      summary: Welcome page
 *      tags:
 *          - Welcome
 *      description: Welcome page to check if server is run well
 *      responses:
 *          200:
 *              description: Request success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status: 
 *                                  type: integer
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                      version:
 *                                          type: string
 *          400:
 *              description: Bad request
 */