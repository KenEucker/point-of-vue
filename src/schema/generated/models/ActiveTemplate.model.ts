import { IsDefined, IsInt, IsString } from "class-validator";
import { Template, Creator } from "./";

export class ActiveTemplate {
    @IsDefined()
    template!: Template;

    @IsDefined()
    @IsInt()
    templateId!: number;

    @IsDefined()
    @IsString()
    media!: string;

    @IsDefined()
    Creator!: Creator[];
}
