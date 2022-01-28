import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';

import { VhsService } from './vhs.service';
import { CreateVhsDto } from './dto/create-vhs.dto';
import { UpdateVhsDto } from './dto/update-vhs.dto';
import { Vhs } from './entities/vhs.entity';
import { GetVhsFilterDto } from './dto/get-vhs-filter.dto';

@Controller('vhs')
export class VhsController {
  constructor(private readonly vhsService: VhsService) {}

  /**
   * Gets all VHS entities.
   */
  @Get()
  getAllVhs(
    @Query(ValidationPipe) vhsFilterDto: GetVhsFilterDto,
  ): Promise<Vhs[]> {
    return this.vhsService.getAllVhs(vhsFilterDto);
  }

  /**
   * Gets the VHS with given id if it exists. If not, 404 is returned.
   */
  @Get(':id')
  getVhsById(@Param('id', ParseIntPipe) id: number): Promise<Vhs> {
    return this.vhsService.getVhsById(+id);
  }

  /**
   * Creates a new VHS entity in the database.
   */
  @Post()
  createVhs(@Body() createVhsDto: CreateVhsDto): Promise<Vhs> {
    return this.vhsService.createVhs(createVhsDto);
  }

  /**
   * Updates specified VHS's data if it exists.
   */
  @Patch(':id')
  updateVhs(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVhsDto: UpdateVhsDto,
  ): Promise<Vhs> {
    return this.vhsService.updateVhs(+id, updateVhsDto);
  }

  /**
   * Deletes the VHS with specified id if it exists.
   */
  @Delete(':id')
  @HttpCode(204)
  deleteVhs(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.vhsService.deleteVhs(+id);
  }
}
