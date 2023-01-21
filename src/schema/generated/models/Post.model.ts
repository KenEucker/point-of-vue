import { IsInt, IsDefined, IsString, IsBoolean, IsDate } from "class-validator";
import { Creator, Interaction, TagsOnPosts } from "./";

export class Post {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    creator!: Creator;

    @IsDefined()
    interactions!: Interaction[];

    @IsDefined()
    @IsInt()
    creatorId!: number;

    @IsDefined()
    @IsString()
    title!: string;

    @IsDefined()
    @IsBoolean()
    published!: boolean;

    @IsDefined()
    @IsString()
    text!: string;

    @IsDefined()
    @IsString()
    status!: string;

    @IsDefined()
    @IsString()
    media!: string;

    @IsDefined()
    TagsOnPosts!: TagsOnPosts[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
