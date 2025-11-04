import { OmitType } from '@nestjs/mapped-types';
import { CreateProductDto } from '../../products/dto/create-product.dto';

export class CreateStoreProductDto extends OmitType(CreateProductDto, [
  'storeId',
] as const) {}
