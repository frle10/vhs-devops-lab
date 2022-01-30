import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import * as request from 'supertest';

import { SeedService } from '../src/seed/seed.service';
import { AppModule } from '../src/app.module';
import { Vhs } from '../src/vhs/entities/vhs.entity';
import { vhs } from '../src/seed/fixtures/vhs';
import { UpdateVhsDto } from '../src/vhs/dto/update-vhs.dto';
import { RentalsService } from '../src/rentals/rentals.service';
import { rentals } from '../src/seed/fixtures/rentals';
import { Rental } from '../src/rentals/entities/rental.entity';
import { UpdateRentalDto } from '../src/rentals/dto/update-rental.dto';

describe('Rentals', () => {
  let app: INestApplication;
  let httpServer: any;
  let dbConnection: Connection;

  let rentalsService: RentalsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    httpServer = app.getHttpServer();
    dbConnection = moduleRef.get<SeedService>(SeedService).getDbHandle();

    rentalsService = moduleRef.get<RentalsService>(RentalsService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.getRepository(Rental).delete({});
  });

  describe('getAllRentals', () => {
    it('should return an array of rentals', async () => {
      await rentalsService.createRental(rentals[0]);
      const response = await request(httpServer).get('/rentals');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([rentals[0]]);
    });
  });

  describe('getRentalById', () => {
    it('should return one rental', async () => {
      const newVhs = await rentalsService.createRental(rentals[0]);
      const response = await request(httpServer).get(`/rentals/${newVhs.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(rentals[0]);
    });
  });

  describe('createRental', () => {
    it('should create a new vhs', async () => {
      const rentalDto = rentals[0];
      const response = await request(httpServer)
        .post('/rentals')
        .send(rentalDto);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(rentalDto);
    });
  });

  describe('updateRental', () => {
    it('should update rental', async () => {
      const newRental = await rentalsService.createRental(rentals[0]);

      const partialUpdateData: UpdateRentalDto = {
        returned_at: new Date(new Date().toISOString()),
      };

      const response = await request(httpServer)
        .patch(`/rentals/${newRental.id}`)
        .send(partialUpdateData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(partialUpdateData);

      const updatedRental = await dbConnection
        .getRepository(Vhs)
        .findOne({ id: newRental.id });

      expect(updatedRental).toMatchObject(partialUpdateData);
    });
  });

  describe('deleteRental', () => {
    it('should delete a vhs', async () => {
      const newRental = await rentalsService.createRental(rentals[0]);

      const response = await request(httpServer).delete(`/vhs/${newRental.id}`);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});

      const deletedRental = await dbConnection
        .getRepository(Rental)
        .findOne({ id: newRental.id });

      expect(deletedRental).toBeUndefined();
    });
  });
});
