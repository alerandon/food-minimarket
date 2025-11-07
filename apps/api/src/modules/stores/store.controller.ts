import * as Swagger from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './store.service';
import {
  FindManyDocs,
  FindOneDocs,
  CreateDocs,
  UpdateDocs,
  DeleteDocs,
  StoreProductsDocs,
} from './docs';
import { checkIfEntityNotFound } from '../../utils/error';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Swagger.ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @Swagger.ApiOperation(FindManyDocs.apiOperation)
  @Swagger.ApiResponse(FindManyDocs.apiResponseStatus200)
  @Swagger.ApiQuery(FindManyDocs.apiQueries[0])
  @Swagger.ApiQuery(FindManyDocs.apiQueries[1])
  @Swagger.ApiQuery(FindManyDocs.apiQueries[2])
  async findMany(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('q') q?: string,
  ) {
    const pageNumber = page ? parseInt(page) : undefined;
    const pageLimit = limit ? parseInt(limit) : undefined;
    const stores = await this.storesService.findMany({
      pageNumber,
      pageLimit,
      q,
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
    try {
      const store = await this.storesService.findOne(id);
      const response = { data: store };
      return response;
    } catch (error) {
      checkIfEntityNotFound({ error, id, entityName: 'Store' });
      throw error;
    }
  }

  @Post()
  @UseGuards(AuthGuard('auth-jwt'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(CreateDocs.apiOperation)
  @Swagger.ApiBody(CreateDocs.apiBody)
  @Swagger.ApiResponse(CreateDocs.apiResponseStatus201)
  @Swagger.ApiResponse(CreateDocs.apiResponseStatus400)
  async create(@Body() body: CreateStoreDto) {
    const store = await this.storesService.create(body);
    const response = { data: store };
    return response;
  }

  @Put(':id')
  @UseGuards(AuthGuard('auth-jwt'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(UpdateDocs.apiOperation)
  @Swagger.ApiParam(UpdateDocs.apiParam)
  @Swagger.ApiBody(UpdateDocs.apiBody)
  @Swagger.ApiResponse(UpdateDocs.apiResponseStatus200)
  @Swagger.ApiResponse(UpdateDocs.apiResponseStatus404)
  async update(@Param('id') id: string, @Body() body: UpdateStoreDto) {
    try {
      const store = await this.storesService.update(id, body);
      const response = { data: store };
      return response;
    } catch (error) {
      checkIfEntityNotFound({ error, id, entityName: 'Store' });
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('auth-jwt'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(DeleteDocs.apiOperation)
  @Swagger.ApiParam(DeleteDocs.apiParam)
  @Swagger.ApiResponse(DeleteDocs.apiResponseStatus200)
  @Swagger.ApiResponse(DeleteDocs.apiResponseStatus404)
  async delete(@Param('id') id: string) {
    try {
      const deletedStore = await this.storesService.delete(id);
      const response = { data: deletedStore};
      return response;
    } catch (error) {
      checkIfEntityNotFound({ error, id, entityName: 'Store' });
      throw error;
    }
  }

  @Get(':id/products')
  @Swagger.ApiOperation(StoreProductsDocs.findProducts.apiOperation)
  @Swagger.ApiParam(StoreProductsDocs.findProducts.apiParam)
  @Swagger.ApiQuery(StoreProductsDocs.findProducts.apiQueries[0])
  @Swagger.ApiQuery(StoreProductsDocs.findProducts.apiQueries[1])
  @Swagger.ApiQuery(StoreProductsDocs.findProducts.apiQueries[2])
  @Swagger.ApiQuery(StoreProductsDocs.findProducts.apiQueries[3])
  @Swagger.ApiResponse(StoreProductsDocs.findProducts.apiResponseStatus200)
  @Swagger.ApiResponse(StoreProductsDocs.findProducts.apiResponseStatus404)
  async findProducts(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('q') q?: string,
    @Query('inStock') inStock?: string,
  ) {
    try {
      const pageNumber = page ? parseInt(page) : undefined;
      const pageLimit = limit ? parseInt(limit) : undefined;
      const inStockBoolean = inStock !== undefined ? inStock === 'true' : undefined;
      const products = await this.storesService.findProducts({
        storeId: id,
        pageNumber,
        pageLimit,
        q,
        inStock: inStockBoolean,
      });
      const response = { data: products };
      return response;
    } catch (error) {
      checkIfEntityNotFound({ error, id, entityName: 'Store' });
      throw error;
    }
  }

  @Post(':id/products')
  @UseGuards(AuthGuard('auth-jwt'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(StoreProductsDocs.createProduct.apiOperation)
  @Swagger.ApiParam(StoreProductsDocs.createProduct.apiParam)
  @Swagger.ApiBody(StoreProductsDocs.createProduct.apiBody)
  @Swagger.ApiResponse(StoreProductsDocs.createProduct.apiResponseStatus201)
  @Swagger.ApiResponse(StoreProductsDocs.createProduct.apiResponseStatus404)
  async createProduct(
    @Param('id') id: string,
    @Body() createStoreProductDto: CreateStoreProductDto,
  ) {
    try {
      const product = await this.storesService.createProduct(
        id,
        createStoreProductDto,
      );
      const response = { data: product };
      return response;
    } catch (error) {
      checkIfEntityNotFound({ error, id, entityName: 'Store' });
      throw error;
    }
  }

  @Put(':id/products/:productId')
  @UseGuards(AuthGuard('auth-jwt'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(StoreProductsDocs.updateProduct.apiOperation)
  @Swagger.ApiParam(StoreProductsDocs.updateProduct.apiParams[0])
  @Swagger.ApiParam(StoreProductsDocs.updateProduct.apiParams[1])
  @Swagger.ApiBody(StoreProductsDocs.updateProduct.apiBody)
  @Swagger.ApiResponse(StoreProductsDocs.updateProduct.apiResponseStatus200)
  @Swagger.ApiResponse(StoreProductsDocs.updateProduct.apiResponseStatus404)
  async updateProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Body() updateStoreProductDto: UpdateStoreProductDto,
  ) {
    try {
      const product = await this.storesService.updateProduct(
        id,
        productId,
        updateStoreProductDto,
      );
      const response = { data: product };
      return response;
    } catch (error) {
      checkIfEntityNotFound({ error, id, entityName: 'Store' });
      throw error;
    }
  }

  @Delete(':id/products/:productId')
  @UseGuards(AuthGuard('auth-jwt'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(StoreProductsDocs.deleteProduct.apiOperation)
  @Swagger.ApiParam(StoreProductsDocs.deleteProduct.apiParams[0])
  @Swagger.ApiParam(StoreProductsDocs.deleteProduct.apiParams[1])
  @Swagger.ApiResponse(StoreProductsDocs.deleteProduct.apiResponseStatus200)
  @Swagger.ApiResponse(StoreProductsDocs.deleteProduct.apiResponseStatus404)
  async deleteProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    try {
      const deletedProduct = await this.storesService.deleteProduct(
        id,
        productId,
      );
      const response = { data: deletedProduct };
      return response;
    } catch (error) {
      checkIfEntityNotFound({ error, id, entityName: 'Store' });
      throw error;
    }
  }
}
