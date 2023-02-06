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
    @IsString()
    vueId!: string;

    @IsDefined()
    @IsDate()
    assignedAt!: Date;
}
