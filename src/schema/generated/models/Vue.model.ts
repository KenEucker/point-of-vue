import { IsString, IsDefined, IsOptional, IsInt, IsDate } from 'class-validator'
import { Creator, ActiveVue, TagsOnVue } from './'

export class Vue {
  @IsDefined()
  @IsString()
  id!: string

  @IsDefined()
  creator!: Creator

  @IsDefined()
  activations!: ActiveVue[]

  @IsOptional()
  tags?: TagsOnVue

  @IsDefined()
  @IsString()
  title!: string

  @IsDefined()
  @IsString()
  status!: string

  @IsDefined()
  @IsString()
  version!: string

  @IsDefined()
  @IsString()
  compatibility!: string

  @IsDefined()
  @IsString()
  license!: string

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
