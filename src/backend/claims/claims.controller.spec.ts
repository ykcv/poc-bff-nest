import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claims.controller';
import { ResponseMessageDto } from '../../common/dto';
import { QueryParamsDto } from './dto';
import { ClaimsService } from './claims.service';

// Mock ClaimsService
class MockClaimsService {
  getById(query: QueryParamsDto): ResponseMessageDto {
    return {
      statusCode: 400,
      data: {},
      message: {
        esName: 'Error es',
        enName: 'En Error'
      }
    };
  }
}

describe('ClaimsController', () => {
  let controller: ClaimsController;
  let service: MockClaimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimsController],
      providers: [
        {
          provide: ClaimsService,
          useClass: MockClaimsService,
        },
      ],
    }).compile();

    controller = module.get<ClaimsController>(ClaimsController);
    service = module.get<MockClaimsService>(ClaimsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a response message dto', async () => {
    const queryParams: QueryParamsDto = {
      limit: 10, offset: 0, search: null, id: null, businessUnit: null, userInCharge: null, status: null
    }; 
    const mockResponse: ResponseMessageDto = {
      message: {
        esName: 'ok',
        enName: 'ok'
      }, statusCode: 200, data: []
    };

    jest.spyOn(service, 'getById').mockReturnValue(mockResponse);

    const result = await controller.get(queryParams);

    expect(result).toBe(mockResponse);
    expect(service.getById).toHaveBeenCalledWith({ query: queryParams });
  });
});
