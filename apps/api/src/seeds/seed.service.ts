import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { usersData } from './data/users';
import { storesData } from './data/stores';
import { productsData } from './data/products';
import { User } from '../modules/users/entities/user.entity';
import { Store } from '../modules/stores/entities/store.entity';
import { Product } from '../modules/products/entities/product.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async run() {
    await this.productRepository.query('DELETE FROM "products"');
    await this.storeRepository.query('DELETE FROM "stores"');
    await this.userRepository.query('DELETE FROM "users"');

    const stores = this.storeRepository.create(storesData);
    const savedStores = await this.storeRepository.save(stores);

    const products = this.productRepository.create(productsData);
    const savedProducts = await this.productRepository.save(products);

    const users = this.userRepository.create(usersData);
    const savedUsers = await this.userRepository.save(users);

    console.log('🌱 Database seeded successfully!');
    console.log(`✅ Created ${savedStores.length} stores`);
    console.log(`✅ Created ${savedProducts.length} products`);
    console.log(`✅ Created ${savedUsers.length} users`);
  }
}
