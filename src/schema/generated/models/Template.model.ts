import { IsInt, IsDefined, IsString, IsBoolean, IsDate, IsOptional } from "class-validator";
import { Creator, Interaction, TagsOnTemplates, ActiveTemplate } from "./";

export class Template {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    creator!: Creator;

    @IsDefined()
    @IsInt()
    creatorId!: number;

    @IsDefined()
    @IsString()
    title!: string;

    @IsDefined()
    interactions!: Interaction[];

    @IsDefined()
    TagsOnTemplates!: TagsOnTemplates[];

    @IsDefined()
    @IsBoolean()
    published!: boolean;

    @IsDefined()
    @IsString()
    code!: string;

    @IsDefined()
    @IsString()
    status!: string;

    @IsDefined()
    @IsString()
    palette!: string;

    @IsDefined()
    @IsString()
    media!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsOptional()
    ActiveTemplate?: ActiveTemplate;
}
