import { IsInt, IsDefined, IsString, IsDate, IsOptional } from "class-validator";
import { TagsOnPosts, TagsOnTemplates } from "./";

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

    @IsOptional()
    TagsOnTemplates?: TagsOnTemplates;

    @IsOptional()
    @IsInt()
    tagsOnTemplatesTemplateId?: number;
}
