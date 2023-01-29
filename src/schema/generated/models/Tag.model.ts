import { IsInt, IsDefined, IsString, IsDate, IsOptional } from 'class-validator'
import { TagsOnCreator, TagsOnPost, TagsOnTemplate, TagsOnVue, TagsOnGroup } from './'

export class Tag {
  @IsDefined()
  @IsInt()
  id!: number

  @IsDefined()
  @IsString()
  text!: string

  @IsDefined()
  creators!: TagsOnCreator

  @IsDefined()
  posts!: TagsOnPost

  @IsDefined()
  templates!: TagsOnTemplate

  @IsDefined()
  vues!: TagsOnVue

  @IsDefined()
  @IsInt()
  tagsOnCreatorsCreatorId!: number

  @IsDefined()
  @IsInt()
  tagsOnPostsPostId!: number

  @IsDefined()
  @IsInt()
  tagsOnTemplatesTemplateId!: number

  @IsDefined()
  @IsInt()
  tagsOnVuesVueId!: number

  @IsDefined()
  @IsDate()
  createdAt!: Date

  @IsDefined()
  @IsDate()
  updatedAt!: Date

  @IsOptional()
  TagsOnGroup?: TagsOnGroup

  @IsOptional()
  @IsInt()
  tagsOnGroupGroupId?: number
}
