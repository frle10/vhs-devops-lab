import { Module } from '@nestjs/common';
import { VhsService } from './vhs.service';
import { VhsController } from './vhs.controller';

@Module({
  controllers: [VhsController],
  providers: [VhsService],
})
export class VhsModule {}
