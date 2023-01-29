/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type ActiveTemplate = {
  readonly __typename?: 'ActiveTemplate';
  readonly assignedAt?: Maybe<Scalars['Date']>;
  readonly creator: Creator;
  readonly id: Scalars['Int'];
  readonly media?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly palette?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly template: Template;
};

export type ActiveVue = {
  readonly __typename?: 'ActiveVue';
  readonly assignedAt?: Maybe<Scalars['Date']>;
  readonly creator: Creator;
  readonly id: Scalars['Int'];
  readonly vue?: Maybe<Vue>;
};

export type CreateCreatorInput = {
  readonly avatar?: InputMaybe<Scalars['String']>;
  readonly banner?: InputMaybe<Scalars['String']>;
  readonly email: Scalars['String'];
  readonly handle: Scalars['String'];
  readonly name: Scalars['String'];
  readonly verified?: InputMaybe<Scalars['Boolean']>;
};

export type CreateInteractionInput = {
  readonly creatorId: Scalars['Int'];
  readonly like?: InputMaybe<Scalars['Boolean']>;
  readonly love?: InputMaybe<Scalars['Boolean']>;
  readonly postId: Scalars['Int'];
  readonly repost?: InputMaybe<Scalars['Boolean']>;
  readonly share?: InputMaybe<Scalars['Boolean']>;
  readonly text?: InputMaybe<Scalars['String']>;
};

export type CreatePostInput = {
  readonly creatorId: Scalars['Int'];
  readonly media?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly published?: InputMaybe<Scalars['Boolean']>;
  readonly status?: InputMaybe<Scalars['String']>;
  readonly text?: InputMaybe<Scalars['String']>;
  readonly title: Scalars['String'];
};

export type Creator = {
  readonly __typename?: 'Creator';
  readonly avatar: Scalars['String'];
  readonly banner?: Maybe<Scalars['String']>;
  readonly bio?: Maybe<Scalars['String']>;
  readonly chosenday?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['Date']>;
  readonly email: Scalars['String'];
  readonly groups?: Maybe<ReadonlyArray<Group>>;
  readonly handle: Scalars['String'];
  readonly id: Scalars['Int'];
  readonly interactions?: Maybe<ReadonlyArray<Interaction>>;
  readonly location?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly permissions?: Maybe<ReadonlyArray<Permissions>>;
  readonly posts?: Maybe<ReadonlyArray<Post>>;
  readonly status?: Maybe<Scalars['String']>;
  readonly subs?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly tags?: Maybe<ReadonlyArray<Tag>>;
  readonly template?: Maybe<ActiveTemplate>;
  readonly templates?: Maybe<ReadonlyArray<Maybe<Template>>>;
  readonly updatedAt?: Maybe<Scalars['Date']>;
  readonly verified?: Maybe<Scalars['Boolean']>;
  readonly vue?: Maybe<ReadonlyArray<Maybe<ActiveVue>>>;
  readonly vues?: Maybe<ReadonlyArray<Maybe<Vue>>>;
  readonly website?: Maybe<Scalars['String']>;
};

export type CreatorAccount = {
  readonly __typename?: 'CreatorAccount';
  readonly authentication?: Maybe<Tokens>;
  readonly creator?: Maybe<Creator>;
  readonly requestor: RequestorMirror;
};

export type CreatorByInput = {
  readonly email?: InputMaybe<Scalars['String']>;
  readonly first?: InputMaybe<Scalars['Int']>;
  readonly handle?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['Int']>;
  readonly skip?: InputMaybe<Scalars['Int']>;
};

export type CreatorInput = {
  readonly email?: InputMaybe<Scalars['String']>;
  readonly handle?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['Int']>;
};

export type CreatorSubscriptionPayload = {
  readonly __typename?: 'CreatorSubscriptionPayload';
  readonly data?: Maybe<Creator>;
  readonly mutation: MutationType;
};

export type Docule = {
  readonly __typename?: 'Docule';
  readonly id: Scalars['String'];
  readonly link: Scalars['String'];
  readonly title?: Maybe<Scalars['String']>;
};

export type ForOptionsInput = {
  readonly cursor?: InputMaybe<Scalars['String']>;
  readonly orderById?: InputMaybe<Scalars['String']>;
  readonly skip?: InputMaybe<Scalars['Int']>;
  readonly take?: InputMaybe<Scalars['Int']>;
};

export type GetPostInteractionsPayload = {
  readonly __typename?: 'GetPostInteractionsPayload';
  readonly likes?: Maybe<Scalars['Int']>;
  readonly loves?: Maybe<Scalars['Int']>;
  readonly reposts?: Maybe<Scalars['Int']>;
  readonly shares?: Maybe<Scalars['Int']>;
};

export type GitHubAccount = {
  readonly __typename?: 'GitHubAccount';
  readonly avatar?: Maybe<Scalars['String']>;
  readonly bio?: Maybe<Scalars['String']>;
  readonly city?: Maybe<Scalars['String']>;
  readonly country?: Maybe<Scalars['String']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly email_verified?: Maybe<Scalars['Boolean']>;
  readonly hireable?: Maybe<Scalars['String']>;
  readonly id: Scalars['String'];
  readonly name?: Maybe<Scalars['String']>;
  readonly profile?: Maybe<Scalars['String']>;
  readonly timezone?: Maybe<Scalars['String']>;
};

export type GoogleAccount = {
  readonly __typename?: 'GoogleAccount';
  readonly avatar?: Maybe<Scalars['String']>;
  readonly city?: Maybe<Scalars['String']>;
  readonly country?: Maybe<Scalars['String']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly email_verified?: Maybe<Scalars['Boolean']>;
  readonly id: Scalars['String'];
  readonly name?: Maybe<Scalars['String']>;
  readonly timezone?: Maybe<Scalars['String']>;
};

export type Group = {
  readonly __typename?: 'Group';
  readonly createdAt?: Maybe<Scalars['Date']>;
  readonly creators?: Maybe<ReadonlyArray<Maybe<Creator>>>;
  readonly id: Scalars['Int'];
  readonly tags?: Maybe<ReadonlyArray<Maybe<Tag>>>;
  readonly title: Scalars['String'];
  readonly updatedAt?: Maybe<Scalars['Date']>;
};

export type ImageAlbumsWhereInput = {
  readonly userName?: InputMaybe<Scalars['String']>;
};

export type ImagesWhereInput = {
  readonly albumId?: InputMaybe<Scalars['String']>;
};

export type ImgurAccount = {
  readonly __typename?: 'ImgurAccount';
  readonly avatar?: Maybe<Scalars['String']>;
  readonly bio?: Maybe<Scalars['String']>;
  readonly city?: Maybe<Scalars['String']>;
  readonly country?: Maybe<Scalars['String']>;
  readonly id: Scalars['String'];
  readonly name?: Maybe<Scalars['String']>;
  readonly timezone?: Maybe<Scalars['String']>;
};

export type ImgurAlbum = {
  readonly __typename?: 'ImgurAlbum';
  readonly cover?: Maybe<Scalars['String']>;
  readonly datetime?: Maybe<Scalars['Date']>;
  readonly deletehash?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id: Scalars['String'];
  readonly images?: Maybe<ReadonlyArray<Maybe<ImgurImage>>>;
  readonly images_count?: Maybe<Scalars['Int']>;
  readonly link: Scalars['String'];
  readonly order?: Maybe<Scalars['String']>;
  readonly privacy?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
};

export type ImgurImage = {
  readonly __typename?: 'ImgurImage';
  readonly datetime?: Maybe<Scalars['Date']>;
  readonly deletehash?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id: Scalars['String'];
  readonly link: Scalars['String'];
  readonly title?: Maybe<Scalars['String']>;
};

export type Interaction = {
  readonly __typename?: 'Interaction';
  readonly createdAt?: Maybe<Scalars['Date']>;
  readonly creator: Creator;
  readonly id: Scalars['Int'];
  readonly like?: Maybe<Scalars['Boolean']>;
  readonly love?: Maybe<Scalars['Boolean']>;
  readonly post: Post;
  readonly repost?: Maybe<Scalars['Boolean']>;
  readonly share?: Maybe<Scalars['Boolean']>;
  readonly text?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['Date']>;
};

export type InteractionByInput = {
  readonly creator?: InputMaybe<CreatorInput>;
  readonly first?: InputMaybe<Scalars['Int']>;
  readonly post?: InputMaybe<PostInput>;
  readonly skip?: InputMaybe<Scalars['Int']>;
};

export type InteractionDelta = {
  readonly __typename?: 'InteractionDelta';
  readonly creatorId: Scalars['Int'];
  readonly id: Scalars['Int'];
  readonly like: Scalars['Int'];
  readonly love: Scalars['Int'];
  readonly postId: Scalars['Int'];
  readonly repost: Scalars['Int'];
  readonly share: Scalars['Int'];
  readonly text?: Maybe<Scalars['String']>;
};

export type InteractionDeltaSubscriptionPayload = {
  readonly __typename?: 'InteractionDeltaSubscriptionPayload';
  readonly data: InteractionDelta;
  readonly mutation: MutationType;
};

export type InteractionInput = {
  readonly creator?: InputMaybe<CreatorInput>;
  readonly id?: InputMaybe<Scalars['Int']>;
  readonly post?: InputMaybe<PostInput>;
};

export type InteractionSubscriptionPayload = {
  readonly __typename?: 'InteractionSubscriptionPayload';
  readonly data?: Maybe<Interaction>;
  readonly mutation: MutationType;
};

export type InteractionType =
  | 'like'
  | 'love'
  | 'repost'
  | 'share';

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly createCreator: Creator;
  readonly createInteraction: Interaction;
  readonly createPost: Post;
  readonly deleteCreator: Creator;
  readonly deleteInteraction: Interaction;
  readonly deletePost: Post;
  readonly publishPost: Post;
  readonly toggleInteraction: Interaction;
  readonly unPublishPost: Post;
  readonly unVerifyCreator: Creator;
  readonly updateCreator: Creator;
  readonly updatePost: Post;
  readonly verifyCreator: Creator;
};


export type MutationCreateCreatorArgs = {
  creator: CreateCreatorInput;
};


export type MutationCreateInteractionArgs = {
  interaction: CreateInteractionInput;
};


export type MutationCreatePostArgs = {
  post: CreatePostInput;
};


export type MutationDeleteCreatorArgs = {
  creatorId?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CreatorByInput>;
};


export type MutationDeleteInteractionArgs = {
  interactionId?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InteractionByInput>;
};


export type MutationDeletePostArgs = {
  id?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostByInput>;
};


export type MutationPublishPostArgs = {
  id: Scalars['Int'];
};


export type MutationToggleInteractionArgs = {
  data: UpdateInteractionInput;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationUnPublishPostArgs = {
  id: Scalars['Int'];
};


export type MutationUnVerifyCreatorArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCreatorArgs = {
  data: UpdateCreatorInput;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationVerifyCreatorArgs = {
  id: Scalars['Int'];
};

export type MutationType =
  | 'CREATED'
  | 'DELETED'
  | 'DELTA'
  | 'PUBLISHED'
  | 'UNPUBLISHED'
  | 'UPDATED';

export type Permissions =
  | 'INTERACT'
  | 'LOGIN'
  | 'READ'
  | 'WRITE';

export type Post = {
  readonly __typename?: 'Post';
  readonly createdAt?: Maybe<Scalars['Date']>;
  readonly creator: Creator;
  readonly id: Scalars['Int'];
  readonly interactions?: Maybe<ReadonlyArray<Interaction>>;
  readonly media?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly published?: Maybe<Scalars['Boolean']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly tags?: Maybe<ReadonlyArray<Tag>>;
  readonly text?: Maybe<Scalars['String']>;
  readonly title: Scalars['String'];
  readonly updatedAt?: Maybe<Scalars['Date']>;
};

export type PostByInput = {
  readonly creator?: InputMaybe<CreatorInput>;
  readonly first?: InputMaybe<Scalars['Int']>;
  readonly id?: InputMaybe<Scalars['Int']>;
  readonly skip?: InputMaybe<Scalars['Int']>;
  readonly title?: InputMaybe<Scalars['String']>;
};

export type PostInput = {
  readonly creator?: InputMaybe<CreatorInput>;
  readonly id?: InputMaybe<Scalars['Int']>;
  readonly title?: InputMaybe<Scalars['String']>;
};

export type PostSubscriptionPayload = {
  readonly __typename?: 'PostSubscriptionPayload';
  readonly data?: Maybe<Post>;
  readonly mutation: MutationType;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly albums?: Maybe<ReadonlyArray<ImgurAlbum>>;
  readonly creator?: Maybe<Creator>;
  readonly creatorExists?: Maybe<Scalars['Boolean']>;
  readonly creators?: Maybe<ReadonlyArray<Maybe<Creator>>>;
  readonly docs?: Maybe<ReadonlyArray<Docule>>;
  readonly getPostInteractions?: Maybe<GetPostInteractionsPayload>;
  readonly github?: Maybe<CreatorAccount>;
  readonly google?: Maybe<CreatorAccount>;
  readonly images?: Maybe<ReadonlyArray<ImgurImage>>;
  readonly imgur?: Maybe<CreatorAccount>;
  readonly interaction?: Maybe<Interaction>;
  readonly interactions?: Maybe<ReadonlyArray<Maybe<Interaction>>>;
  readonly post?: Maybe<Post>;
  readonly posts?: Maybe<ReadonlyArray<Maybe<Post>>>;
  readonly searchPosts?: Maybe<SearchPostsPayload>;
  readonly self?: Maybe<CreatorAccount>;
  readonly viewer?: Maybe<RequestorMirror>;
  readonly vues?: Maybe<ReadonlyArray<VueComponent>>;
};


export type QueryAlbumsArgs = {
  from?: InputMaybe<Requestor>;
  where?: InputMaybe<ImageAlbumsWhereInput>;
};


export type QueryCreatorArgs = {
  id?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CreatorByInput>;
};


export type QueryCreatorExistsArgs = {
  where?: InputMaybe<CreatorByInput>;
};


export type QueryCreatorsArgs = {
  by?: InputMaybe<ForOptionsInput>;
  where?: InputMaybe<CreatorByInput>;
};


export type QueryDocsArgs = {
  from?: InputMaybe<Requestor>;
};


export type QueryGetPostInteractionsArgs = {
  id: Scalars['Int'];
};


export type QueryGithubArgs = {
  from?: InputMaybe<Requestor>;
};


export type QueryGoogleArgs = {
  from?: InputMaybe<Requestor>;
};


export type QueryImagesArgs = {
  from?: InputMaybe<Requestor>;
  where?: InputMaybe<ImagesWhereInput>;
};


export type QueryImgurArgs = {
  from?: InputMaybe<Requestor>;
};


export type QueryInteractionArgs = {
  id?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InteractionByInput>;
};


export type QueryInteractionsArgs = {
  by?: InputMaybe<ForOptionsInput>;
  where?: InputMaybe<InteractionByInput>;
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostByInput>;
};


export type QueryPostsArgs = {
  by?: InputMaybe<ForOptionsInput>;
  where?: InputMaybe<PostByInput>;
};


export type QuerySearchPostsArgs = {
  by?: InputMaybe<ForOptionsInput>;
  search: SearchPostsInput;
};


export type QuerySelfArgs = {
  from?: InputMaybe<Requestor>;
};


export type QueryViewerArgs = {
  from?: InputMaybe<Requestor>;
};


export type QueryVuesArgs = {
  from?: InputMaybe<Requestor>;
  where?: InputMaybe<VuesWhereInput>;
};

export type Requestor = {
  readonly connection?: InputMaybe<Scalars['String']>;
  readonly email?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['String']>;
  readonly ip?: InputMaybe<Scalars['String']>;
  readonly token?: InputMaybe<Scalars['String']>;
};

export type RequestorMirror = {
  readonly __typename?: 'RequestorMirror';
  readonly email?: Maybe<Scalars['String']>;
  readonly github?: Maybe<GitHubAccount>;
  readonly google?: Maybe<GoogleAccount>;
  readonly id?: Maybe<Scalars['String']>;
  readonly imgur?: Maybe<ImgurAccount>;
  readonly ip?: Maybe<Scalars['String']>;
  readonly token?: Maybe<Scalars['String']>;
};

export type SearchPostsInput = {
  readonly text: Scalars['String'];
};

export type SearchPostsPayload = {
  readonly __typename?: 'SearchPostsPayload';
  readonly posts?: Maybe<ReadonlyArray<Post>>;
};

export type Subscription = {
  readonly __typename?: 'Subscription';
  readonly countdown: Scalars['Int'];
  readonly creator?: Maybe<CreatorSubscriptionPayload>;
  readonly interaction?: Maybe<InteractionSubscriptionPayload>;
  readonly interactionDelta?: Maybe<InteractionDeltaSubscriptionPayload>;
  readonly post?: Maybe<PostSubscriptionPayload>;
};


export type SubscriptionCountdownArgs = {
  from?: InputMaybe<Scalars['Int']>;
};


export type SubscriptionCreatorArgs = {
  where?: InputMaybe<CreatorByInput>;
};


export type SubscriptionInteractionArgs = {
  where?: InputMaybe<InteractionByInput>;
};


export type SubscriptionInteractionDeltaArgs = {
  where?: InputMaybe<InteractionByInput>;
};


export type SubscriptionPostArgs = {
  where?: InputMaybe<PostByInput>;
};

export type Tag = {
  readonly __typename?: 'Tag';
  readonly createdAt?: Maybe<Scalars['Date']>;
  readonly creators?: Maybe<ReadonlyArray<Maybe<Creator>>>;
  readonly id: Scalars['Int'];
  readonly post?: Maybe<ReadonlyArray<Maybe<Post>>>;
  readonly templates?: Maybe<ReadonlyArray<Maybe<Template>>>;
  readonly text: Scalars['String'];
  readonly updatedAt?: Maybe<Scalars['Date']>;
  readonly vues?: Maybe<ReadonlyArray<Maybe<Vue>>>;
};

export type Template = {
  readonly __typename?: 'Template';
  readonly activations?: Maybe<ReadonlyArray<Maybe<ActiveTemplate>>>;
  readonly code: Scalars['String'];
  readonly createdAt?: Maybe<Scalars['Date']>;
  readonly creator: Creator;
  readonly id: Scalars['Int'];
  readonly media?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly palette?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly published?: Maybe<Scalars['Boolean']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly tags?: Maybe<ReadonlyArray<Maybe<Tag>>>;
  readonly title: Scalars['String'];
  readonly updatedAt?: Maybe<Scalars['Date']>;
};

export type Tokens = {
  readonly __typename?: 'Tokens';
  readonly auth0?: Maybe<Scalars['String']>;
  readonly github?: Maybe<Scalars['String']>;
  readonly google?: Maybe<Scalars['String']>;
  readonly imgur?: Maybe<Scalars['String']>;
};

export type UpdateCreatorInput = {
  readonly avatar?: InputMaybe<Scalars['String']>;
  readonly banner?: InputMaybe<Scalars['String']>;
  readonly bio?: InputMaybe<Scalars['String']>;
  readonly chosenday?: InputMaybe<Scalars['String']>;
  readonly email?: InputMaybe<Scalars['String']>;
  readonly location?: InputMaybe<Scalars['String']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly status?: InputMaybe<Scalars['String']>;
  readonly website?: InputMaybe<Scalars['String']>;
};

export type UpdateInteractionInput = {
  readonly creatorId: Scalars['Int'];
  readonly like?: InputMaybe<Scalars['Boolean']>;
  readonly love?: InputMaybe<Scalars['Boolean']>;
  readonly postId: Scalars['Int'];
  readonly repost?: InputMaybe<Scalars['Boolean']>;
  readonly share?: InputMaybe<Scalars['Boolean']>;
  readonly text?: InputMaybe<Scalars['String']>;
};

export type UpdatePostInput = {
  readonly creatorId: Scalars['Int'];
  readonly media?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly postId: Scalars['Int'];
  readonly status?: InputMaybe<Scalars['String']>;
  readonly text?: InputMaybe<Scalars['String']>;
  readonly title?: InputMaybe<Scalars['String']>;
};

export type Vue = {
  readonly __typename?: 'Vue';
  readonly activations?: Maybe<ReadonlyArray<Maybe<ActiveVue>>>;
  readonly code: Scalars['String'];
  readonly createdAt?: Maybe<Scalars['Date']>;
  readonly creator: Creator;
  readonly id: Scalars['Int'];
  readonly published?: Maybe<Scalars['Boolean']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly tags?: Maybe<ReadonlyArray<Maybe<Tag>>>;
  readonly title: Scalars['String'];
  readonly updatedAt?: Maybe<Scalars['Date']>;
};

export type VueComponent = {
  readonly __typename?: 'VueComponent';
  readonly name?: Maybe<Scalars['String']>;
  readonly oid: Scalars['String'];
  readonly query?: Maybe<Scalars['String']>;
  readonly script?: Maybe<Scalars['String']>;
  readonly template?: Maybe<Scalars['String']>;
  readonly vue?: Maybe<Scalars['String']>;
};

export type VuesWhereInput = {
  readonly oid?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ActiveTemplate: ResolverTypeWrapper<ActiveTemplate>;
  ActiveVue: ResolverTypeWrapper<ActiveVue>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateCreatorInput: CreateCreatorInput;
  CreateInteractionInput: CreateInteractionInput;
  CreatePostInput: CreatePostInput;
  Creator: ResolverTypeWrapper<Creator>;
  CreatorAccount: ResolverTypeWrapper<CreatorAccount>;
  CreatorByInput: CreatorByInput;
  CreatorInput: CreatorInput;
  CreatorSubscriptionPayload: ResolverTypeWrapper<CreatorSubscriptionPayload>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Docule: ResolverTypeWrapper<Docule>;
  ForOptionsInput: ForOptionsInput;
  GetPostInteractionsPayload: ResolverTypeWrapper<GetPostInteractionsPayload>;
  GitHubAccount: ResolverTypeWrapper<GitHubAccount>;
  GoogleAccount: ResolverTypeWrapper<GoogleAccount>;
  Group: ResolverTypeWrapper<Group>;
  ImageAlbumsWhereInput: ImageAlbumsWhereInput;
  ImagesWhereInput: ImagesWhereInput;
  ImgurAccount: ResolverTypeWrapper<ImgurAccount>;
  ImgurAlbum: ResolverTypeWrapper<ImgurAlbum>;
  ImgurImage: ResolverTypeWrapper<ImgurImage>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Interaction: ResolverTypeWrapper<Interaction>;
  InteractionByInput: InteractionByInput;
  InteractionDelta: ResolverTypeWrapper<InteractionDelta>;
  InteractionDeltaSubscriptionPayload: ResolverTypeWrapper<InteractionDeltaSubscriptionPayload>;
  InteractionInput: InteractionInput;
  InteractionSubscriptionPayload: ResolverTypeWrapper<InteractionSubscriptionPayload>;
  InteractionType: InteractionType;
  Mutation: ResolverTypeWrapper<{}>;
  MutationType: MutationType;
  Permissions: Permissions;
  Post: ResolverTypeWrapper<Post>;
  PostByInput: PostByInput;
  PostInput: PostInput;
  PostSubscriptionPayload: ResolverTypeWrapper<PostSubscriptionPayload>;
  Query: ResolverTypeWrapper<{}>;
  Requestor: Requestor;
  RequestorMirror: ResolverTypeWrapper<RequestorMirror>;
  SearchPostsInput: SearchPostsInput;
  SearchPostsPayload: ResolverTypeWrapper<SearchPostsPayload>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Tag: ResolverTypeWrapper<Tag>;
  Template: ResolverTypeWrapper<Template>;
  Tokens: ResolverTypeWrapper<Tokens>;
  UpdateCreatorInput: UpdateCreatorInput;
  UpdateInteractionInput: UpdateInteractionInput;
  UpdatePostInput: UpdatePostInput;
  Vue: ResolverTypeWrapper<Vue>;
  VueComponent: ResolverTypeWrapper<VueComponent>;
  VuesWhereInput: VuesWhereInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ActiveTemplate: ActiveTemplate;
  ActiveVue: ActiveVue;
  Boolean: Scalars['Boolean'];
  CreateCreatorInput: CreateCreatorInput;
  CreateInteractionInput: CreateInteractionInput;
  CreatePostInput: CreatePostInput;
  Creator: Creator;
  CreatorAccount: CreatorAccount;
  CreatorByInput: CreatorByInput;
  CreatorInput: CreatorInput;
  CreatorSubscriptionPayload: CreatorSubscriptionPayload;
  Date: Scalars['Date'];
  Docule: Docule;
  ForOptionsInput: ForOptionsInput;
  GetPostInteractionsPayload: GetPostInteractionsPayload;
  GitHubAccount: GitHubAccount;
  GoogleAccount: GoogleAccount;
  Group: Group;
  ImageAlbumsWhereInput: ImageAlbumsWhereInput;
  ImagesWhereInput: ImagesWhereInput;
  ImgurAccount: ImgurAccount;
  ImgurAlbum: ImgurAlbum;
  ImgurImage: ImgurImage;
  Int: Scalars['Int'];
  Interaction: Interaction;
  InteractionByInput: InteractionByInput;
  InteractionDelta: InteractionDelta;
  InteractionDeltaSubscriptionPayload: InteractionDeltaSubscriptionPayload;
  InteractionInput: InteractionInput;
  InteractionSubscriptionPayload: InteractionSubscriptionPayload;
  Mutation: {};
  Post: Post;
  PostByInput: PostByInput;
  PostInput: PostInput;
  PostSubscriptionPayload: PostSubscriptionPayload;
  Query: {};
  Requestor: Requestor;
  RequestorMirror: RequestorMirror;
  SearchPostsInput: SearchPostsInput;
  SearchPostsPayload: SearchPostsPayload;
  String: Scalars['String'];
  Subscription: {};
  Tag: Tag;
  Template: Template;
  Tokens: Tokens;
  UpdateCreatorInput: UpdateCreatorInput;
  UpdateInteractionInput: UpdateInteractionInput;
  UpdatePostInput: UpdatePostInput;
  Vue: Vue;
  VueComponent: VueComponent;
  VuesWhereInput: VuesWhereInput;
};

export type ActiveTemplateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActiveTemplate'] = ResolversParentTypes['ActiveTemplate']> = {
  assignedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  media?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  palette?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  template?: Resolver<ResolversTypes['Template'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActiveVueResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActiveVue'] = ResolversParentTypes['ActiveVue']> = {
  assignedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  vue?: Resolver<Maybe<ResolversTypes['Vue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = {
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  banner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chosenday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groups?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Group']>>, ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  interactions?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Interaction']>>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Permissions']>>, ParentType, ContextType>;
  posts?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Post']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subs?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Tag']>>, ParentType, ContextType>;
  template?: Resolver<Maybe<ResolversTypes['ActiveTemplate']>, ParentType, ContextType>;
  templates?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Template']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  vue?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['ActiveVue']>>>, ParentType, ContextType>;
  vues?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Vue']>>>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorAccount'] = ResolversParentTypes['CreatorAccount']> = {
  authentication?: Resolver<Maybe<ResolversTypes['Tokens']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['Creator']>, ParentType, ContextType>;
  requestor?: Resolver<ResolversTypes['RequestorMirror'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorSubscriptionPayload'] = ResolversParentTypes['CreatorSubscriptionPayload']> = {
  data?: Resolver<Maybe<ResolversTypes['Creator']>, ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DoculeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Docule'] = ResolversParentTypes['Docule']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetPostInteractionsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetPostInteractionsPayload'] = ResolversParentTypes['GetPostInteractionsPayload']> = {
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  loves?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reposts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shares?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitHubAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitHubAccount'] = ResolversParentTypes['GitHubAccount']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email_verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hireable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GoogleAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['GoogleAccount'] = ResolversParentTypes['GoogleAccount']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email_verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creators?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Creator']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tags?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImgurAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImgurAccount'] = ResolversParentTypes['ImgurAccount']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImgurAlbumResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImgurAlbum'] = ResolversParentTypes['ImgurAlbum']> = {
  cover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  datetime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  deletehash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['ImgurImage']>>>, ParentType, ContextType>;
  images_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  privacy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImgurImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImgurImage'] = ResolversParentTypes['ImgurImage']> = {
  datetime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  deletehash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InteractionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Interaction'] = ResolversParentTypes['Interaction']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  like?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  love?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  repost?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  share?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InteractionDeltaResolvers<ContextType = any, ParentType extends ResolversParentTypes['InteractionDelta'] = ResolversParentTypes['InteractionDelta']> = {
  creatorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  like?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  love?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  repost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  share?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InteractionDeltaSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['InteractionDeltaSubscriptionPayload'] = ResolversParentTypes['InteractionDeltaSubscriptionPayload']> = {
  data?: Resolver<ResolversTypes['InteractionDelta'], ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InteractionSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['InteractionSubscriptionPayload'] = ResolversParentTypes['InteractionSubscriptionPayload']> = {
  data?: Resolver<Maybe<ResolversTypes['Interaction']>, ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCreator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType, RequireFields<MutationCreateCreatorArgs, 'creator'>>;
  createInteraction?: Resolver<ResolversTypes['Interaction'], ParentType, ContextType, RequireFields<MutationCreateInteractionArgs, 'interaction'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'post'>>;
  deleteCreator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType, Partial<MutationDeleteCreatorArgs>>;
  deleteInteraction?: Resolver<ResolversTypes['Interaction'], ParentType, ContextType, Partial<MutationDeleteInteractionArgs>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, Partial<MutationDeletePostArgs>>;
  publishPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationPublishPostArgs, 'id'>>;
  toggleInteraction?: Resolver<ResolversTypes['Interaction'], ParentType, ContextType, RequireFields<MutationToggleInteractionArgs, 'data'>>;
  unPublishPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUnPublishPostArgs, 'id'>>;
  unVerifyCreator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType, RequireFields<MutationUnVerifyCreatorArgs, 'id'>>;
  updateCreator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType, RequireFields<MutationUpdateCreatorArgs, 'data'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'data'>>;
  verifyCreator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType, RequireFields<MutationVerifyCreatorArgs, 'id'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  interactions?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Interaction']>>, ParentType, ContextType>;
  media?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Tag']>>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostSubscriptionPayload'] = ResolversParentTypes['PostSubscriptionPayload']> = {
  data?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  albums?: Resolver<Maybe<ReadonlyArray<ResolversTypes['ImgurAlbum']>>, ParentType, ContextType, Partial<QueryAlbumsArgs>>;
  creator?: Resolver<Maybe<ResolversTypes['Creator']>, ParentType, ContextType, Partial<QueryCreatorArgs>>;
  creatorExists?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<QueryCreatorExistsArgs>>;
  creators?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Creator']>>>, ParentType, ContextType, Partial<QueryCreatorsArgs>>;
  docs?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Docule']>>, ParentType, ContextType, Partial<QueryDocsArgs>>;
  getPostInteractions?: Resolver<Maybe<ResolversTypes['GetPostInteractionsPayload']>, ParentType, ContextType, RequireFields<QueryGetPostInteractionsArgs, 'id'>>;
  github?: Resolver<Maybe<ResolversTypes['CreatorAccount']>, ParentType, ContextType, Partial<QueryGithubArgs>>;
  google?: Resolver<Maybe<ResolversTypes['CreatorAccount']>, ParentType, ContextType, Partial<QueryGoogleArgs>>;
  images?: Resolver<Maybe<ReadonlyArray<ResolversTypes['ImgurImage']>>, ParentType, ContextType, Partial<QueryImagesArgs>>;
  imgur?: Resolver<Maybe<ResolversTypes['CreatorAccount']>, ParentType, ContextType, Partial<QueryImgurArgs>>;
  interaction?: Resolver<Maybe<ResolversTypes['Interaction']>, ParentType, ContextType, Partial<QueryInteractionArgs>>;
  interactions?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Interaction']>>>, ParentType, ContextType, Partial<QueryInteractionsArgs>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, Partial<QueryPostArgs>>;
  posts?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, Partial<QueryPostsArgs>>;
  searchPosts?: Resolver<Maybe<ResolversTypes['SearchPostsPayload']>, ParentType, ContextType, RequireFields<QuerySearchPostsArgs, 'search'>>;
  self?: Resolver<Maybe<ResolversTypes['CreatorAccount']>, ParentType, ContextType, Partial<QuerySelfArgs>>;
  viewer?: Resolver<Maybe<ResolversTypes['RequestorMirror']>, ParentType, ContextType, Partial<QueryViewerArgs>>;
  vues?: Resolver<Maybe<ReadonlyArray<ResolversTypes['VueComponent']>>, ParentType, ContextType, Partial<QueryVuesArgs>>;
};

export type RequestorMirrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestorMirror'] = ResolversParentTypes['RequestorMirror']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['GitHubAccount']>, ParentType, ContextType>;
  google?: Resolver<Maybe<ResolversTypes['GoogleAccount']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imgur?: Resolver<Maybe<ResolversTypes['ImgurAccount']>, ParentType, ContextType>;
  ip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchPostsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchPostsPayload'] = ResolversParentTypes['SearchPostsPayload']> = {
  posts?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Post']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  countdown?: SubscriptionResolver<ResolversTypes['Int'], "countdown", ParentType, ContextType, Partial<SubscriptionCountdownArgs>>;
  creator?: SubscriptionResolver<Maybe<ResolversTypes['CreatorSubscriptionPayload']>, "creator", ParentType, ContextType, Partial<SubscriptionCreatorArgs>>;
  interaction?: SubscriptionResolver<Maybe<ResolversTypes['InteractionSubscriptionPayload']>, "interaction", ParentType, ContextType, Partial<SubscriptionInteractionArgs>>;
  interactionDelta?: SubscriptionResolver<Maybe<ResolversTypes['InteractionDeltaSubscriptionPayload']>, "interactionDelta", ParentType, ContextType, Partial<SubscriptionInteractionDeltaArgs>>;
  post?: SubscriptionResolver<Maybe<ResolversTypes['PostSubscriptionPayload']>, "post", ParentType, ContextType, Partial<SubscriptionPostArgs>>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creators?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Creator']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  post?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  templates?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Template']>>>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  vues?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Vue']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']> = {
  activations?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['ActiveTemplate']>>>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  media?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  palette?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  auth0?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  google?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imgur?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vue'] = ResolversParentTypes['Vue']> = {
  activations?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['ActiveVue']>>>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VueComponentResolvers<ContextType = any, ParentType extends ResolversParentTypes['VueComponent'] = ResolversParentTypes['VueComponent']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  oid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  query?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  template?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ActiveTemplate?: ActiveTemplateResolvers<ContextType>;
  ActiveVue?: ActiveVueResolvers<ContextType>;
  Creator?: CreatorResolvers<ContextType>;
  CreatorAccount?: CreatorAccountResolvers<ContextType>;
  CreatorSubscriptionPayload?: CreatorSubscriptionPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Docule?: DoculeResolvers<ContextType>;
  GetPostInteractionsPayload?: GetPostInteractionsPayloadResolvers<ContextType>;
  GitHubAccount?: GitHubAccountResolvers<ContextType>;
  GoogleAccount?: GoogleAccountResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  ImgurAccount?: ImgurAccountResolvers<ContextType>;
  ImgurAlbum?: ImgurAlbumResolvers<ContextType>;
  ImgurImage?: ImgurImageResolvers<ContextType>;
  Interaction?: InteractionResolvers<ContextType>;
  InteractionDelta?: InteractionDeltaResolvers<ContextType>;
  InteractionDeltaSubscriptionPayload?: InteractionDeltaSubscriptionPayloadResolvers<ContextType>;
  InteractionSubscriptionPayload?: InteractionSubscriptionPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostSubscriptionPayload?: PostSubscriptionPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RequestorMirror?: RequestorMirrorResolvers<ContextType>;
  SearchPostsPayload?: SearchPostsPayloadResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Template?: TemplateResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  Vue?: VueResolvers<ContextType>;
  VueComponent?: VueComponentResolvers<ContextType>;
};

