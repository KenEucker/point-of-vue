import { IsInt, IsDefined, IsString, IsOptional, IsIn, IsBoolean, IsDate } from "class-validator";
import { TagsOnCreator, Post, Group, Interaction, Template, ActiveTemplate, Vue, ActiveVue } from "./";
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

    @IsOptional()
    tags?: TagsOnCreator;

    @IsDefined()
    @IsIn(getEnumValues(Permissions))
    permissions!: Permissions[];

    @IsDefined()
    posts!: Post[];

    @IsDefined()
    groups!: Group[];

    @IsDefined()
    interactions!: Interaction[];

    @IsDefined()
    templates!: Template[];

    @IsOptional()
    template?: ActiveTemplate;

    @IsDefined()
    vues!: Vue[];

    @IsDefined()
    vue!: ActiveVue[];

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
