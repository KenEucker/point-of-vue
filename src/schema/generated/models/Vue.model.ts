import { IsInt, IsDefined, IsString, IsBoolean, IsDate } from "class-validator";
import { Creator, ActiveVue, TagsOnVues } from "./";

export class Vue {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    creator!: Creator;

    @IsDefined()
    activations!: ActiveVue[];

    @IsDefined()
    tags!: TagsOnVues[];

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
