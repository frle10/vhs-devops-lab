import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VhsService } from './vhs.service';
import { CreateVhsDto } from './dto/create-vhs.dto';
import { UpdateVhsDto } from './dto/update-vhs.dto';

@Controller('vhs')
export class VhsController {
  constructor(private readonly vhsService: VhsService) {}

  @Post()
  create(@Body() createVhDto: CreateVhsDto) {
    return this.vhsService.create(createVhDto);
  }

  @Get()
  findAll() {
    return this.vhsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vhsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVhDto: UpdateVhsDto) {
    return this.vhsService.update(+id, updateVhDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vhsService.remove(+id);
  }
}
