import { EntityRepository, Repository } from 'typeorm';

import { Vhs } from './entities/vhs.entity';

@EntityRepository(Vhs)
export class VhsRepository extends Repository<Vhs> {}
