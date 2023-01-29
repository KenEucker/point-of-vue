import { IsDefined, IsInt, IsDate } from "class-validator";
import { Post, Tag } from "./";

export class TagsOnPosts {
    @IsDefined()
    post!: Post;

    @IsDefined()
    tag!: Tag[];

    @IsDefined()
    @IsInt()
    postId!: number;

    @IsDefined()
    @IsDate()
    assignedAt!: Date;
}
