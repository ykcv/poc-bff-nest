import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ClaimsService } from './claims.service';
import { QueryParamsDto } from './dto';
import { of } from 'rxjs';
import { MockHttpService } from './mock/http-service.mock';


describe('ClaimService', () => {
  let service: ClaimsService;
  let httpService: MockHttpService;
  let configService: ConfigService;
  let mockResponse: AxiosResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              if (key === 'claimsUrl') return 'http://claims-service';
              if (key === 'claimsPrefix') return '/api/claims';
            }),
          },
        },
        {
          provide: HttpService,
          useClass: MockHttpService
        },
      ],
    }).compile();

    service = module.get<ClaimsService>(ClaimsService);
    httpService = module.get<MockHttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);

    mockResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
      } as InternalAxiosRequestConfig,
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }); 

  it('should return a response message dto', async () => {
    const queryParams: QueryParamsDto = { id: 1 } as any;

    jest.spyOn(httpService, 'get').mockReturnValue(of({
      data: { message: 'Mock response' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    } as any ));

    const result = await service.getById({ query: queryParams });

    expect(result).toEqual({ message: 'Mock response' });
  });

  it('should handle errors from http service', async () => {
    const queryParams: QueryParamsDto = { id: 1 } as any;

     // Mock HTTP service to return error
     jest.spyOn(httpService, 'get').mockReturnValue(httpService.getWithError('/'));

     await expect(service.getById({ query: queryParams })).rejects.toThrowError();
  });

});