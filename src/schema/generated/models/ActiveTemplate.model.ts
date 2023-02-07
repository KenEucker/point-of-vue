import { IsDefined, IsString, IsInt, IsDate } from 'class-validator'
import { Creator, Template } from './'

export class ActiveTemplate {
  @IsDefined()
  creator!: Creator

  @IsDefined()
  template!: Template

  @IsDefined()
  @IsString()
  palette!: string

  @IsDefined()
  @IsString()
  media!: string

  @IsDefined()
  @IsInt()
  creatorId!: number

  @IsDefined()
  @IsInt()
  templateId!: number

  @IsDefined()
  @IsDate()
  assignedAt!: Date
}
