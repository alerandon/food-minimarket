import {
  ApiOperationOptions,
  ApiParamOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

export const UpdateDocs = {
  apiOperation: {
    summary: 'Update store',
    description: 'Updates an existing store',
  } as ApiOperationOptions,

  apiParam: {
    name: 'id',
    description: 'Store ID',
    type: String,
    required: true,
  } as ApiParamOptions,

  apiResponseStatus200: {
    status: 200,
    description: 'The store has been updated successfully',
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

  apiResponseStatus404: {
    status: 404,
    description: 'Store not found',
  } as ApiResponseOptions,
};
