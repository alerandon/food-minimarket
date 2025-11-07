import { IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { SearchQueryDto } from '../../../common/dto/search-query.dto';

class InStockQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by product availability',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  inStock?: boolean;
}

export class FindStoreProductsQueryDto extends IntersectionType(
  IntersectionType(PaginationQueryDto, SearchQueryDto),
  InStockQueryDto,
) {}
