import { IsDefined, IsInt, IsDate } from 'class-validator'
import { Post, Tag } from './'

export class TagsOnPost {
  @IsDefined()
  post!: Post

  @IsDefined()
  tags!: Tag[]

  @IsDefined()
  @IsInt()
  postId!: number

  @IsDefined()
  @IsDate()
  assignedAt!: Date
}
