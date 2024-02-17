import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    name: string;
    
    @IsString()
    lastName: string;
    
    @IsNumber()
    age: number;
    
    @IsString()
    userName: string;
    
    @IsString()
    email: string;

    @IsString()
    password: string;
}
