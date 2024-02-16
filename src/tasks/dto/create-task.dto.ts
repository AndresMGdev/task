import { IsDate, IsOptional, IsString, IsTimeZone, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MinLength(100)
    title: string;

    @IsString()
    @MinLength(255)
    description: string;

    @IsString()
    @MinLength(1000)
    text: string;

    
    state: boolean;

    @IsDate()
    @IsTimeZone()
    dateStart: Date;

    @IsDate()
    @IsOptional()
    dateEnd?: Date;
}
