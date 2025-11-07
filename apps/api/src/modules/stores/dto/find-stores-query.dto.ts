import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { SearchQueryDto } from '../../../common/dto/search-query.dto';

export class FindStoresQueryDto extends IntersectionType(
  PaginationQueryDto,
  SearchQueryDto,
) {}
