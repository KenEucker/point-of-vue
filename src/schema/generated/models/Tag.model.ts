import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { TagsOnPosts } from "./";

export class Tag {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    text!: string;

    @IsDefined()
    posts!: TagsOnPosts;

    @IsDefined()
    @IsInt()
    tagsOnPostsPostId!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
