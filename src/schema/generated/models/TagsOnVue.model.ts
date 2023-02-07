import { IsDefined, IsString, IsDate } from 'class-validator'
import { Vue, Tag } from './'

export class TagsOnVue {
  @IsDefined()
  vue!: Vue

  @IsDefined()
  tags!: Tag[]

  @IsDefined()
  @IsString()
  vueId!: string

  @IsDefined()
  @IsDate()
  assignedAt!: Date
}
