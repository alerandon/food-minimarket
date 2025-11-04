import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export const CreateDocs = {
  apiOperation: {
    summary: 'Create store',
    description: 'Creates a new store',
  } as ApiOperationOptions,

  apiResponseStatus201: {
    status: 201,
    description: 'The store has been created successfully',
    schema: {
      example: {
        data: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Frutas y frutas',
          address: 'Baruta',
          city: 'Caracas',
          phone: '+584120000000',
          deletedAt: null,
          createdAt: '2025-11-02T12:34:45.678Z',
          updatedAt: '2025-11-02T12:34:45.678Z',
        },
      },
    },
  } as ApiResponseOptions,

  apiResponseStatus400: {
    status: 400,
    description: 'Bad Request - Validation error',
    schema: {
      example: {
        error: {
          message: 'Validation failed',
          details: [
            {
              field: 'name',
              message: 'Name is required',
            },
            {
              field: 'address',
              message: 'Address is required',
            },
          ],
        },
      },
    },
  } as ApiResponseOptions,
};
