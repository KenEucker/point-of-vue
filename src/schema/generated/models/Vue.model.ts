import { IsInt, IsDefined, IsString, IsBoolean, IsDate } from "class-validator";
import { Creator, TagsOnVues, ActiveVue } from "./";

export class Vue {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    creator!: Creator;

    @IsDefined()
    tags!: TagsOnVues[];

    @IsDefined()
    activations!: ActiveVue[];

    @IsDefined()
    @IsString()
    title!: string;

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
    @IsInt()
    creatorId!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
