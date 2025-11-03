import { LoginDto } from '../dto';

export const LoginDocs = {
  apiOperation: { summary: 'Login a user' },
  apiBody: { type: LoginDto },
  apiResponseStatus201: {
    status: 201,
    description: 'User successfully logged in.',
    schema: {
      example: {
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: 1,
            email: 'user@example.com',
            password:
              '$argon2id$v=19$m=65536,t=3,p=4$hXuQfzruMD+KCa1HNjaVzw$731V/qizQMxlZ+KQReTYOtrTXjpDn2+nysnesCrVOfI',
            createdAt: '2025-03-28T03:21:18.502Z',
            updatedAt: '2025-03-29T17:02:02.422Z',
          },
        },
      },
    },
  },
  apiResponseStatus401: {
    status: 401,
    description: 'Invalid credentials.',
    schema: {
      example: {
        message: 'Invalid credentials',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  },
};
