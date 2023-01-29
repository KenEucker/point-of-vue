import { IsDefined, IsInt, IsDate } from 'class-validator'
import { Creator, Tag } from './'

export class TagsOnCreator {
  @IsDefined()
  creator!: Creator

  @IsDefined()
  tags!: Tag[]

  @IsDefined()
  @IsInt()
  creatorId!: number

  @IsDefined()
  @IsDate()
  assignedAt!: Date
}
