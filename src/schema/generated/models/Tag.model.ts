import { IsInt, IsDefined, IsString, IsDate } from "class-validator";
import { TagsOnPosts, TagsOnTemplates, TagsOnVues } from "./";

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
    templates!: TagsOnTemplates;

    @IsDefined()
    vues!: TagsOnVues;

    @IsDefined()
    @IsInt()
    tagsOnPostsPostId!: number;

    @IsDefined()
    @IsInt()
    tagsOnTemplatesTemplateId!: number;

    @IsDefined()
    @IsInt()
    tagsOnVuesVueId!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
