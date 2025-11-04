import {
  ApiOperationOptions,
  ApiResponseOptions,
  ApiParamOptions,
} from '@nestjs/swagger';

export const FindOneDocs = {
  apiOperation: {
    summary: 'Get store by ID',
    description: 'Retrieve a specific store by its ID',
  } as ApiOperationOptions,

  apiParam: {
    name: 'id',
    description: 'Store ID',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  } as ApiParamOptions,

  apiResponseStatus200: {
    status: 200,
    description: 'Store retrieved successfully',
    schema: {
      example: {
        data: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Frutas y frutas',
          address: 'Baruta',
          city: 'Caracas',
          phone: '+584120000000',
          isActive: true,
          createdAt: '2025-11-02T12:34:45.678Z',
          updatedAt: '2025-11-02T12:34:45.678Z',
        },
      },
    },
  } as ApiResponseOptions,

  apiResponseStatus404: {
    status: 404,
    description: 'Store not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404,
        },
        message: {
          type: 'string',
          example:
            'Store with id "123e4567-e89b-12d3-a456-426614174000" not found',
        },
        error: {
          type: 'string',
          example: 'Not Found',
        },
      },
    },
  } as ApiResponseOptions,

  apiResponseStatus400: {
    status: 400,
    description: 'Invalid ID format',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 400,
        },
        message: {
          type: 'string',
          example: 'Invalid UUID format',
        },
        error: {
          type: 'string',
          example: 'Bad Request',
        },
      },
    },
  } as ApiResponseOptions,
};
