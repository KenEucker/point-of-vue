import { IsInt, IsDefined, IsString, IsBoolean, IsDate } from "class-validator";
import { Creator, Post } from "./";

export class Interaction {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    creator!: Creator;

    @IsDefined()
    post!: Post;

    @IsDefined()
    @IsString()
    text!: string;

    @IsDefined()
    @IsBoolean()
    like!: boolean;

    @IsDefined()
    @IsBoolean()
    love!: boolean;

    @IsDefined()
    @IsBoolean()
    repost!: boolean;

    @IsDefined()
    @IsBoolean()
    share!: boolean;

    @IsDefined()
    @IsInt()
    creatorId!: number;

    @IsDefined()
    @IsInt()
    postId!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
