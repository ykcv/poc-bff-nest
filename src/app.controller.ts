import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('hello')
@ApiTags('** hello **')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('public')
  @ApiResponse({
    status: 200,
    description: "The app it's alive!",
  })
  getHelloPublic(): string {
    return this.appService.getHello();
  }

  @Get('private')
  @ApiResponse({
    status: 200,
    description: "The app with verification it's alive!",
  })
  getHelloPrivate(): string {
    return this.appService.getHello();
  }
}
