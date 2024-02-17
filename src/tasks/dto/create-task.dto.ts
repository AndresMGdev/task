import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, MaxLength, } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MaxLength(100)
    title: string;

    @IsString()
    @MaxLength(255)
    description: string;

    @IsString()
    @MaxLength(1000)
    text: string;

    @IsBoolean()
    isActive: boolean;

    @IsNumber()
    userId: number;

    @IsOptional()
    @IsArray()
    assignedUserIds: number[];
}
