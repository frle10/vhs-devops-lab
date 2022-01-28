import { CreateVhsDto } from '../../vhs/dto/create-vhs.dto';

export const vhs: CreateVhsDto[] = [
  {
    title: '12 Angry Men',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dolor risus, tincidunt sed turpis eget, ultrices maximus quam. Aenean ligula.',
    genre: 'drama',
    releasedAt: 1957,
    rentalPrice: 12,
    rentalDuration: 3,
  },
];
