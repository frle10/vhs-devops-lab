import { EntityRepository, Repository } from 'typeorm';

import { Vhs } from './entities/vhs.entity';
import { CreateVhsDto } from './dto/create-vhs.dto';
import { UpdateVhsDto } from './dto/update-vhs.dto';
import { GetVhsFilterDto } from './dto/get-vhs-filter.dto';

@EntityRepository(Vhs)
export class VhsRepository extends Repository<Vhs> {
  async getAllVhs(vhsFilterDto: GetVhsFilterDto): Promise<Vhs[]> {
    const { genre, isAvailable } = vhsFilterDto;
    const query = this.createQueryBuilder('vhs');

    if (genre) {
      query.andWhere('vhs.genre = :genre', { genre });
    }

    if (isAvailable) {
      query.andWhere('vhs.isAvailable = :isAvailable', { isAvailable });
    }

    const allVhs = await query.getMany();
    return allVhs;
  }

  createVhs(createVhsDto: CreateVhsDto): Promise<Vhs> {
    const {
      title,
      description,
      genre,
      releasedAt,
      rentalPrice,
      rentalDuration,
    } = createVhsDto;

    const vhs = new Vhs();
    const updateVhsDto = new UpdateVhsDto();

    updateVhsDto.title = title;
    updateVhsDto.description = description;
    updateVhsDto.genre = genre;
    updateVhsDto.releasedAt = releasedAt;
    updateVhsDto.rentalPrice = rentalPrice;
    updateVhsDto.rentalDuration = rentalDuration;
    updateVhsDto.isAvailable = true;

    return this.updateVhs(vhs, updateVhsDto);
  }

  async updateVhs(vhs: Vhs, updateVhsDto: UpdateVhsDto): Promise<Vhs> {
    const {
      title,
      description,
      genre,
      releasedAt,
      rentalPrice,
      rentalDuration,
      isAvailable,
    } = updateVhsDto;

    if (title) vhs.title = title;
    if (description) vhs.description = description;
    if (genre) vhs.genre = genre;
    if (releasedAt) vhs.releasedAt = releasedAt;
    if (rentalPrice) vhs.rentalPrice = rentalPrice;
    if (rentalDuration) vhs.rentalDuration = rentalDuration;
    if (isAvailable) vhs.isAvailable = isAvailable;

    await vhs.save();
    return vhs;
  }
}
