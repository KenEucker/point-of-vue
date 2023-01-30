import { IsInt, IsDefined, IsOptional, IsString, IsDate } from "class-validator";
import { Creator, ActiveVue, TagsOnVue } from "./";

export class Vue {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    creator!: Creator;

    @IsDefined()
    activations!: ActiveVue[];

    @IsOptional()
    tags?: TagsOnVue;

    @IsDefined()
    @IsString()
    title!: string;

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
