import { NotFoundException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

interface CheckIfEntityNotFoundParams {
  error: unknown;
  id: string;
  entityName: string;
}

export function checkIfEntityNotFound({
  error,
  id,
  entityName,
}: CheckIfEntityNotFoundParams) {
  if (error instanceof EntityNotFoundError) {
    throw new NotFoundException(`${entityName} with ID ${id} not found.`);
  }
}
