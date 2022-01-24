import { EntityRepository, Repository } from 'typeorm';

import { Rental } from './entities/rental.entity';

@EntityRepository(Rental)
export class RentalsRepository extends Repository<Rental> {}
