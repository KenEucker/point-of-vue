import { IsDefined, IsInt, IsDate } from "class-validator";
import { Template, Tag } from "./";

export class TagsOnTemplates {
    @IsDefined()
    template!: Template;

    @IsDefined()
    tags!: Tag[];

    @IsDefined()
    @IsInt()
    templateId!: number;

    @IsDefined()
    @IsDate()
    assignedAt!: Date;
}
