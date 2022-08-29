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
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCat.dto';

@Controller('cats')
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
  async getCats(
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

  @Get(':id')
  @HttpCode(200)
  getCat(
    @Param() params,
    // @Param('id') id: string,
  ): string {
    return "getting the cats with different iD's " + params.id;
  }

  @Post()
  @HttpCode(201)
  sleepNow(): string {
    return this.catsService.sleep();
  }

  @Post('new-cat')
  @HttpCode(201)
  createCat(
    @Body() createCatDto: CreateCatDto,
    @Res() response: Response,
  ): string {
    return this.catsService.sleep();
  }
}
