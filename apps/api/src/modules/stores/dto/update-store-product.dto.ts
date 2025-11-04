import { OmitType } from '@nestjs/mapped-types';
import { UpdateProductDto } from '../../products/dto/update-product.dto';

export class UpdateStoreProductDto extends OmitType(UpdateProductDto, [
  'storeId',
] as const) {}
