declare type PostType = {
    id: string,
    title: string,
    description: string,
    content: Object|string,
    user: UserType
}

declare type PostListsType = {
    data: Array<PostType>,
    filter: string,
    pagination: PaginationType
}

declare type PostReducerState = {
    lists: PostListsType,
    current_post: PostType
}