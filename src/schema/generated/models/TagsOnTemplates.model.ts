import { IsDefined, IsInt, IsDate } from "class-validator";
import { Template, Tag } from "./";

export class TagsOnTemplates {
    @IsDefined()
    template!: Template;

    @IsDefined()
    @IsInt()
    templateId!: number;

    @IsDefined()
    @IsDate()
    assignedAt!: Date;

    @IsDefined()
    Tag!: Tag[];
}
