import { IsInt, IsDefined, IsOptional, IsString, IsBoolean, IsDate } from 'class-validator'
import { Creator, ActiveTemplate, TagsOnTemplate, TagsOnGroup } from './'

export class Template {
  @IsDefined()
  @IsInt()
  id!: number

  @IsDefined()
  creator!: Creator

  @IsDefined()
  activations!: ActiveTemplate[]

  @IsOptional()
  tags?: TagsOnTemplate

  @IsDefined()
  @IsString()
  title!: string

  @IsDefined()
  @IsBoolean()
  published!: boolean

  @IsDefined()
  @IsString()
  code!: string

  @IsDefined()
  @IsString()
  status!: string

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
  @IsDate()
  createdAt!: Date

  @IsDefined()
  @IsDate()
  updatedAt!: Date

  @IsDefined()
  TagsOnGroup!: TagsOnGroup[]
}
