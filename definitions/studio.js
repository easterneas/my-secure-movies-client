module.exports = {
  params: {
    type: 'object',
    properties: {
      StudioId: {
        type: 'integer',
        description: 'the ID of the studio',
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: {
          type: 'string',
          description: 'The name of the studio'
        },
        specialization: {
          type: 'string',
          description: 'The specialization of the studio (e.g. animation, live action, etc.)'
        }
      },
    },
    404: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'The message when user tries to find a non-existent movie'
        }
      }
    },
    500: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'The message when something happened with the server'
        }
      }
    }
  }
}
