import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VhsService } from './vhs.service';
import { VhsController } from './vhs.controller';
import { VhsRepository } from 'src/vhs/vhs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VhsRepository])],
  controllers: [VhsController],
  providers: [VhsService],
})
export class VhsModule {}
