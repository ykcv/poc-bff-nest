import { ApiProperty } from "@nestjs/swagger"

export class ErrorObject {

    @ApiProperty()
    statusCode: number

    @ApiProperty()
    message: string
}

export class CustomResponse {
    @ApiProperty()
    timestamp: string

    @ApiProperty()
    error: ErrorObject
}

