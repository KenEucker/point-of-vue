import { IsInt, IsDefined, IsOptional, IsString, IsBoolean, IsDate } from 'class-validator'
import { Creator, Interaction, TagsOnPost } from './'

export class Post {
  @IsDefined()
  @IsInt()
  id!: number

  @IsDefined()
  creator!: Creator

  @IsDefined()
  interactions!: Interaction[]

  @IsOptional()
  tags?: TagsOnPost

  @IsDefined()
  @IsString()
  title!: string

  @IsDefined()
  @IsBoolean()
  published!: boolean

  @IsDefined()
  @IsString()
  text!: string

  @IsDefined()
  @IsString()
  status!: string

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
}
