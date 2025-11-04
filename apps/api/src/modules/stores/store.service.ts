import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { PAGINATE_DEFAULT_LIMIT } from 'src/constants';
import { PaginatedResult } from 'src/types';

interface FindManyParams {
  pageNumber?: number;
  pageLimit?: number;
  filterByName?: string;
}

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async findMany({
    pageNumber = 1,
    pageLimit = PAGINATE_DEFAULT_LIMIT,
    filterByName,
  }: FindManyParams): Promise<PaginatedResult<Store>> {
    const queryBuilder = this.storeRepository.createQueryBuilder('store');
    if (filterByName) {
      queryBuilder.where('store.name ILIKE :name', {
        name: `%${filterByName}%`,
      });
    }

    const skipNumber = (pageNumber - 1) * pageLimit;
    const [stores, totalItems] = await queryBuilder
      .skip(skipNumber)
      .take(pageLimit)
      .getManyAndCount();

    const hasPrev = pageNumber > 1;
    const hasNext = skipNumber + stores.length < totalItems;
    const response: PaginatedResult<Store> = {
      items: stores,
      page: pageNumber,
      limit: pageLimit,
      totalItems,
      hasPrev,
      hasNext,
    };

    return response;
  }

  async findOne(id: string): Promise<Store> {
    const store = await this.storeRepository.findOneOrFail({
      where: { id },
      relations: ['products'],
    });

    return store;
  }
}
