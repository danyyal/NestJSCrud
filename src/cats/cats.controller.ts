import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Redirect,
  Request,
  Response,
  Res,
  Param,
  Body,
  ForbiddenException,
  UseFilters,
  ParseIntPipe,
  HttpStatus,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CustomExceptionFilter } from 'src/Exceptions/exceptionFilter';
import { RolesGuard } from 'src/Guards/RolesGuard';
import { LoggingInterceptor } from 'src/Interceptors/LoggingInterceptor';
import { CatsService } from './cats.service';
import { CatDto } from './dto/createCat.dto';
// import Joi from 'joi';
// to apply custom exception filter at controller level
// @UseFilters(new CustomExceptionFilter())

// export const catSchema = Joi?.object()
//   .keys({
//     name: Joi.string().required(),
//     age: Joi.number().required(),
//     breed: Joi.string().required(),
//   })
//   .options({
//     // ignore the extra keys and attributes when set to true
//     abortEarly: true,
//   });
@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // @ is decorator
  @Get('meow')
  @HttpCode(200)
  getMeow(
    @Req() request: Request,
    @Res({
      passthrough: true,
    })
    response: Response,
  ): string {
    return this.catsService.meow();
  }

  @Get('redirected')
  @HttpCode(200)
  @Redirect('https://nestjs.com', 200)
  redirectToNest(@Req() request: Request): string {
    return 'redirecting now';
  }

  @Get('all')
  @HttpCode(200)
  async gettepmCats(
    @Req() request: Request,
    // @Res() response: Response,
  ): Promise<any[]> {
    // response.json();
    return [
      {
        message: 'Hello 1',
        status: 200,
      },
      {
        message: 'Hello 2',
        status: 200,
      },
      {
        message: 'Hello 3',
        status: 200,
      },
      {
        message: 'Hello 4',
        status: 200,
      },
      {
        message: 'Hello 5',
        status: 200,
      },
      {
        message: 'Hello 6',
        status: 200,
      },
    ];
  }
  @UseFilters(CustomExceptionFilter)
  @Get(':custom-exception-filter')
  @HttpCode(200)
  getCatCustomFilter(): string {
    throw new ForbiddenException('you are forbidden from accessing this route');
  }
  @Get('get-cats')
  @HttpCode(201)
  async getCats(): Promise<any> {
    const result = await this.catsService.getCats();
    return result;
  }

  @Get('get-cat/:id')
  @HttpCode(200)
  getCat(
    // @Param() params,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): any {
    return this.catsService.getCatById(id);
  }

  @Post()
  @HttpCode(201)
  sleepNow(): string {
    return this.catsService.sleep();
  }

  @Post('new-cat')
  @HttpCode(201)
  // @UsePipes(new createCatValidationPipe(catSchema))
  createCat(@Body() catObj: CatDto): any {
    return this.catsService.createCat(catObj);
  }

  @Patch('update-cat/:id')
  @HttpCode(201)
  updateCat(
    @Body() catObj,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): any {
    return this.catsService.updateCat(catObj, id);
  }

  @Delete('delete-cat/:id')
  deleteCat(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): any {
    return this.catsService.deleteCat(id);
  }
}
