import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { setQueryParams } from '../../common/utils';
import { QueryParamsDto } from './dto/query-params.dto';
import { ResponseMessageDto } from '../../common/dto';
import { AxiosError } from 'axios';

@Injectable()
export class ClaimsService {
    private logger = new Logger('ClaimsService');
    constructor(private readonly httpService: HttpService) { }


    public async getById({ query }: { query: QueryParamsDto; }): Promise<ResponseMessageDto> {
        let uri = '';
        const { id, ...otherParams } = query
        if (id) {
            uri = `?id=${query.id}`;
        } else {
            uri = `/list?${setQueryParams(otherParams)}`;
        }

        const { data } = await firstValueFrom(
            this.httpService.get<ResponseMessageDto>(uri).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error?.response?.data);
                    throw error;
                }),
            ),
        );
        return data;

    }
}
