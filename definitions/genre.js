module.exports = {
  params: {
    type: 'object',
    properties: {
      StudioId: {
        type: 'integer',
        description: 'the ID of the genre',
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
          description: 'The name of the genre'
        },
      },
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
