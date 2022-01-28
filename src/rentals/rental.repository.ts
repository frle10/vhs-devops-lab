import { EntityRepository, Repository } from 'typeorm';

import { Rental } from './entities/rental.entity';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Vhs } from 'src/vhs/entities/vhs.entity';
import { User } from 'src/auth/entities/user.entity';
import { LATE_FEE_COEFFICIENT } from './util';
import { GetRentalsFilterDto } from './dto/get-rentals-filter.dto';

@EntityRepository(Rental)
export class RentalRepository extends Repository<Rental> {
  async getRentals(rentalFilterDto: GetRentalsFilterDto): Promise<Rental[]> {
    const { userId } = rentalFilterDto;
    const query = this.createQueryBuilder('rental');

    if (userId) {
      query.andWhere('rental.userId = :userId', { userId });
    }

    const rentals = await query.getMany();
    return rentals;
  }

  async createRental(vhs: Vhs, user: User): Promise<Rental> {
    const rental = new Rental();

    rental.rented_at = new Date(new Date().toISOString());
    rental.lateFee = 0;
    rental.user = user;
    rental.vhs = vhs;

    await rental.save();
    return rental;
  }

  async updateRental(
    rental: Rental,
    updateRentalDto: UpdateRentalDto,
  ): Promise<Rental> {
    const { returned_at } = updateRentalDto;

    if (returned_at) {
      rental.returned_at = returned_at;

      const daysLate = Math.ceil(
        (rental.returned_at.getTime() - rental.rented_at.getTime()) /
          (1000 * 3600 * 24),
      );

      if (daysLate > 0) {
        rental.lateFee = daysLate * LATE_FEE_COEFFICIENT;
      }
    }

    await rental.save();
    return rental;
  }
}
