import { OmitType } from '@nestjs/swagger';
import { UpdateProductDto } from '../../products/dto/update-product.dto';

export class UpdateStoreProductDto extends OmitType(UpdateProductDto, [
  'storeId',
] as const) {}
