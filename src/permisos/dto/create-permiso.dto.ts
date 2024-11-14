import { IsBoolean, IsString } from "class-validator";

export class CreatePermisoDto {

    @IsString()
    id: string;
    @IsBoolean()
    read: boolean;
    @IsBoolean()
    write: boolean;
    @IsBoolean()
    insert: boolean;
    @IsBoolean()
    delete: boolean;
}
