import { IsDefined, IsInt, IsDate } from "class-validator";
import { Template, Tag, Group } from "./";

export class TagsOnGroup {
    @IsDefined()
    template!: Template;

    @IsDefined()
    tags!: Tag[];

    @IsDefined()
    @IsInt()
    groupId!: number;

    @IsDefined()
    @IsDate()
    assignedAt!: Date;

    @IsDefined()
    Group!: Group[];
}
