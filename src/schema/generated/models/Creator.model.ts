import { IsInt, IsDefined, IsString, IsBoolean, IsIn, IsDate, IsOptional } from "class-validator";
import { Post, Interaction, Template, ActiveTemplate } from "./";
import { getEnumValues } from "../helpers";
import { Permissions } from "../enums";

export class Creator {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    handle!: string;

    @IsDefined()
    @IsString()
    email!: string;

    @IsDefined()
    @IsBoolean()
    verified!: boolean;

    @IsDefined()
    @IsString()
    subs!: string;

    @IsDefined()
    posts!: Post[];

    @IsDefined()
    @IsIn(getEnumValues(Permissions))
    permissions!: Permissions[];

    @IsDefined()
    interactions!: Interaction[];

    @IsDefined()
    Templates!: Template[];

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    avatar!: string;

    @IsDefined()
    @IsString()
    banner!: string;

    @IsDefined()
    @IsString()
    status!: string;

    @IsDefined()
    @IsString()
    bio!: string;

    @IsDefined()
    @IsString()
    website!: string;

    @IsDefined()
    @IsString()
    location!: string;

    @IsDefined()
    @IsString()
    chosenday!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsOptional()
    ActiveTemplate?: ActiveTemplate;

    @IsOptional()
    @IsInt()
    activeTemplateId?: number;
}
