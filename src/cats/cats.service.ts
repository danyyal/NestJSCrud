import {
  Injectable,
  HttpStatus,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/typeorm/entities';
import { Repository } from 'typeorm';
import { CatDto, UpdateCatDto } from './dto/createCat.dto';
@Injectable()
export class CatsService implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    console.log('Cats Module has been initalized.');
  }
  onModuleDestroy() {
    console.log('Cats module has been destroyed.');
  }
  // onModuleDestroy() {
  //   console.log('module destroyed');
  // }
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}
  meow(): string {
    return 'Meow';
  }
  sleep(): string {
    return 'sleeping';
  }
  getCats(): Promise<any> {
    return this.catRepository.find();
    // const result = cats.then((res) => res).catch((err) => err);
  }
  async getCatById(id): Promise<any> {
    const result = await this.catRepository.find({
      where: {
        id: id,
      },
    });
    return result;
  }

  async createCat(catObj: CatDto) {
    const newCat = this.catRepository.create(catObj);
    const saving_result = await this.catRepository.save(newCat);
    return {
      ...saving_result,
      status: HttpStatus.CREATED,
      message: 'successfully created',
    };
  }

  async updateCat(catObj: UpdateCatDto, id: number) {
    let result;
    try {
      result = await this.catRepository.update(id, { ...catObj });
      result = {
        ...result,
        status: HttpStatus.ACCEPTED,
        message: 'successfully updated',
      };
    } catch {
      result = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'something went wrong',
      };
    }
    return result;
  }

  async deleteCat(id: number) {
    let result;
    const isPresent = await this.catRepository.find({
      where: {
        id: id,
      },
    });
    if (isPresent.length) {
      result = await this.catRepository.delete({ id: id });
      result = {
        status: HttpStatus.ACCEPTED,
        message: 'successfully deleted',
      };
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: `Object with id=${id} not found.`,
      };
    }
    return result;
  }
}
