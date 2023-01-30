import { IsDefined, IsInt, IsString, IsDate } from "class-validator";
import { Creator, Vue } from "./";

export class ActiveVue {
    @IsDefined()
    creator!: Creator;

    @IsDefined()
    component!: Vue;

    @IsDefined()
    @IsInt()
    creatorId!: number;

    @IsDefined()
    @IsInt()
    vueId!: number;

    @IsDefined()
    @IsString()
    title!: string;

    @IsDefined()
    @IsDate()
    assignedAt!: Date;
}
