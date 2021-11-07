module.exports = {
  body: {
    type: 'object',
    properties: {
      GenreId: {
        type: 'integer',
        description: 'The ID for Genre relation table',
      },
      StudioId: {
        type: 'integer',
        description: 'The ID for Studio relation table',
      },
      name: {
        type: 'string',
        description: 'The name of the movie',
      },
      yearReleased: {
        type: 'integer',
        description: 'The year of the movie was released in',
      },
    },
  },
  params: {
    type: 'object',
    properties: {
      MovieId: {
        type: 'integer',
        description: 'the ID of the movie',
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        GenreId: {
          type: 'integer',
          description: 'The ID for Genre relation table',
        },
        StudioId: {
          type: 'integer',
          description: 'The ID for Studio relation table',
        },
        name: {
          type: 'string',
          description: 'The name of the movie',
        },
        yearReleased: {
          type: 'integer',
          description: 'The year of the movie was released in',
        },
        Genre: {
          type: 'object',
          description: 'The actual data of Genre relation table',
          properties: {
            name: { type: 'string' },
          },
        },
        Studio: {
          type: 'object',
          description: 'The actual data of Studio relation table',
          properties: {
            name: { type: 'string' },
            specialization: { type: 'string' },
          }
        },
      },
    },
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        GenreId: {
          type: 'integer',
          description: 'The ID for Genre relation table',
        },
        StudioId: {
          type: 'integer',
          description: 'The ID for Studio relation table',
        },
        name: {
          type: 'string',
          description: 'The name of the movie',
        },
        yearReleased: {
          type: 'integer',
          description: 'The year of the movie was released in',
        },
      },
    },
    204: {
      type: 'object',
      description: 'Successful response with no content returned.'
    },
    400: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'The message when user tries to submit non-valid data'
        }
      }
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
