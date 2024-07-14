import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Observable, of, throwError } from "rxjs";

export class MockHttpService {
    get<T>(url: string): Observable<AxiosResponse<T>> {
      const mockResponse: AxiosResponse<T> = {
        data: { message: 'Mock response' as any } as any, // Adjust 'as any' according to your DTO structure
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };
      return of(mockResponse);
    }
  
    getWithError<T>(url: string): Observable<AxiosResponse<T>> {
      return throwError(new AxiosError({
        response: {
          data: null,
          status: 500,
          statusText: 'Internal Server Error',
          headers: {},
          config: {},
        },
      } as any));
    }
  }