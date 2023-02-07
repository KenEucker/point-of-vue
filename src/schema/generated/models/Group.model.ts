import { IsInt, IsDefined, IsOptional, IsString, IsDate } from 'class-validator'
import { Creator, Post, TagsOnGroup } from './'

export class Group {
  @IsDefined()
  @IsInt()
  id!: number

  @IsDefined()
  creators!: Creator[]

  @IsDefined()
  posts!: Post[]

  @IsOptional()
  tags?: TagsOnGroup

  @IsDefined()
  @IsString()
  title!: string

  @IsDefined()
  @IsDate()
  createdAt!: Date

  @IsDefined()
  @IsDate()
  updatedAt!: Date

  @IsOptional()
  @IsInt()
  tagsOnGroupGroupId?: number
}
