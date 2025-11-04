import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export const StoreProductsDocs = {
  findProducts: {
    apiOperation: {
      summary: 'Find products in store',
      description: 'Find all products in a store with optional filtering',
    } as ApiOperationOptions,

    apiParam: {
      name: 'id',
      description: 'Store ID',
      type: String,
      required: true,
    },

    apiResponseStatus200: {
      status: 200,
      description: 'List of products in the store',
    } as ApiResponseOptions,

    apiResponseStatus404: {
      status: 404,
      description: 'Store not found',
    } as ApiResponseOptions,
  },

  createProduct: {
    apiOperation: {
      summary: 'Add product to store',
      description: 'Create a product to a specific store',
    } as ApiOperationOptions,

    apiParam: {
      name: 'id',
      description: 'Store ID',
      type: String,
      required: true,
    },

    apiResponseStatus201: {
      status: 201,
      description: 'Product added to store successfully',
    } as ApiResponseOptions,

    apiResponseStatus404: {
      status: 404,
      description: 'Store or product not found',
    } as ApiResponseOptions,
  },

  updateProduct: {
    apiOperation: {
      summary: 'Update product in store',
      description: 'Update a product of a specific store',
    } as ApiOperationOptions,

    apiParams: [
      {
        name: 'id',
        description: 'Store ID',
        type: String,
        required: true,
      },
      {
        name: 'productId',
        description: 'Product ID',
        type: String,
        required: true,
      },
    ],

    apiResponseStatus200: {
      status: 200,
      description: 'Product updated in store successfully',
    } as ApiResponseOptions,

    apiResponseStatus404: {
      status: 404,
      description: 'Store or product not found',
    } as ApiResponseOptions,
  },

  deleteProduct: {
    apiOperation: {
      summary: 'Delete product from store',
      description: 'Delete a product from a specific store',
    } as ApiOperationOptions,

    apiParams: [
      {
        name: 'id',
        description: 'Store ID',
        type: String,
        required: true,
      },
      {
        name: 'productId',
        description: 'Product ID',
        type: String,
        required: true,
      },
    ],

    apiResponseStatus200: {
      status: 200,
      description: 'Product deleted from store successfully',
    } as ApiResponseOptions,

    apiResponseStatus404: {
      status: 404,
      description: 'Store or product not found',
    } as ApiResponseOptions,
  },
};
