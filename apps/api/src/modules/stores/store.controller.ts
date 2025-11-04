import * as Swagger from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { StoresService } from './store.service';
import { FindManyDocs, FindOneDocs } from './docs';

@Swagger.ApiTags('Stores')
@Swagger.ApiBearerAuth()
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @Swagger.ApiOperation(FindManyDocs.apiOperation)
  @Swagger.ApiResponse(FindManyDocs.apiResponseStatus200)
  async findMany(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('filterByName') filterByName?: string,
  ) {
    const pageNumber = page ? parseInt(page) : undefined;
    const pageLimit = limit ? parseInt(limit) : undefined;
    const stores = await this.storesService.findMany({
      pageNumber,
      pageLimit,
      filterByName,
    });
    const response = { data: stores };
    return response;
  }

  @Get(':id')
  @Swagger.ApiOperation(FindOneDocs.apiOperation)
  @Swagger.ApiParam(FindOneDocs.apiParam)
  @Swagger.ApiResponse(FindOneDocs.apiResponseStatus200)
  @Swagger.ApiResponse(FindOneDocs.apiResponseStatus404)
  @Swagger.ApiResponse(FindOneDocs.apiResponseStatus400)
  async findOne(@Param('id') id: string) {
    const store = await this.storesService.findOne(id);
    const response = { data: store };
    return response;
  }
}
