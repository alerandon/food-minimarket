import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export const FindManyDocs = {
  apiOperation: { summary: 'Get all stores' } as ApiOperationOptions,

  apiQueries: [
    {
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number for pagination (optional)',
      example: 1,
    },
    {
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of items per page (optional)',
      example: 10,
    },
    {
      name: 'q',
      required: false,
      type: String,
      description: 'Search text to filter stores by name (optional)',
      example: 'fruits',
    },
  ],

  apiResponseStatus200: {
    status: 200,
    description: 'All stores retrieved successfully.',
    schema: {
      example: {
        data: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Frutas y frutas',
            address: 'Baruta',
            city: 'Caracas',
            phone: '+584120000000',
            deletedAt: null,
            createdAt: '2025-11-02T12:34:45.678Z',
            updatedAt: '2025-11-02T12:34:45.678Z',
          },
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Frutas y frutas',
            address: 'Baruta',
            city: 'Caracas',
            phone: '+584120000000',
            deletedAt: null,
            createdAt: '2025-11-02T12:34:45.678Z',
            updatedAt: '2025-11-02T12:34:45.678Z',
          },
        ],
      },
    },
  } as ApiResponseOptions,
};
