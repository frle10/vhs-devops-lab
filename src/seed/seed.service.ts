import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { VhsRepository } from 'src/vhs/vhs.repository';
import { RentalRepository } from '../rentals/rental.repository';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(VhsRepository) private vhsRepository: VhsRepository,
    @InjectRepository(RentalRepository)
    private rentalRepository: RentalRepository,
  ) {}

  onApplicationBootstrap() {
    console.log('On Application Bootstrap!');
  }
}
