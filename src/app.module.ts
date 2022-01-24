import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';
import { VhsModule } from './vhs/vhs.module';
import { RentalsModule } from './rentals/rentals.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), VhsModule, RentalsModule, AuthModule],
})
export class AppModule {}
