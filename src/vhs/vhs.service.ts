import { Injectable } from '@nestjs/common';
import { CreateVhsDto } from './dto/create-vhs.dto';
import { UpdateVhsDto } from './dto/update-vhs.dto';

@Injectable()
export class VhsService {
  create(createVhsDto: CreateVhsDto) {
    return 'This action adds a new vh';
  }

  findAll() {
    return `This action returns all vhs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vh`;
  }

  update(id: number, updateVhsDto: UpdateVhsDto) {
    return `This action updates a #${id} vh`;
  }

  remove(id: number) {
    return `This action removes a #${id} vh`;
  }
}
