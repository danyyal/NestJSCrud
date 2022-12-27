import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('getCats', () => {
    it('should return an array of cats', async () =>
      expect(await catsController.getCats()).toBe([
        {
          name: 'Snowy',
          breed: 'persian',
          age: 6,
          id: '14',
          status: 201,
          message: 'successfully created',
        },
      ]));
  });
});
