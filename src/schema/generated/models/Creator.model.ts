import { IsInt, IsDefined, IsString, IsIn, IsOptional, IsBoolean, IsDate } from "class-validator";
import { Post, Interaction, Template, Vue, ActiveVue, ActiveTemplate } from "./";
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
    posts!: Post[];

    @IsDefined()
    @IsIn(getEnumValues(Permissions))
    permissions!: Permissions[];

    @IsDefined()
    interactions!: Interaction[];

    @IsDefined()
    templates!: Template[];

    @IsDefined()
    vues!: Vue[];

    @IsDefined()
    vue!: ActiveVue[];

    @IsOptional()
    template?: ActiveTemplate;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    avatar!: string;

    @IsDefined()
    @IsString()
    bio!: string;

    @IsDefined()
    @IsBoolean()
    verified!: boolean;

    @IsDefined()
    @IsString()
    banner!: string;

    @IsDefined()
    @IsString()
    status!: string;

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
    @IsString()
    subs!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
