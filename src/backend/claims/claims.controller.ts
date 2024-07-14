import { Controller, Get, Query } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryParamsDto } from './dto/query-params.dto';
import { ResponseMessageDto } from '../../common/dto';
import { CustomResponse } from '../../common/exceptions';

@ApiBearerAuth()
@ApiBadRequestResponse({ type: CustomResponse })
@Controller('claims')
@ApiTags('Claims')
export class ClaimsController {

  constructor(
    private claimService: ClaimsService
  ) { }

  @ApiOkResponse({ type: ResponseMessageDto })
  @Get('')
  public async get(@Query() query: QueryParamsDto): Promise<ResponseMessageDto> {
    return await this.claimService.getById({ query });
  }
}
