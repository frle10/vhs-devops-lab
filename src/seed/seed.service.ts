import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from '../auth/user.repository';
import { VhsRepository } from 'src/vhs/vhs.repository';
import { RentalRepository } from '../rentals/rental.repository';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(VhsRepository) private vhsRepository: VhsRepository,
    @InjectRepository(RentalRepository)
    private rentalRepository: RentalRepository,
  ) {}

  onApplicationBootstrap() {
    const seed = parseInt(this.configService.get('SEED_DB'));

    if (seed) {
      console.log('On Application Bootstrap!');
    }
  }
}
