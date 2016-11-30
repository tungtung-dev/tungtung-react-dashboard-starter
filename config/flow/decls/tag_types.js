type TagType = {
    name: string,
    slug: string
}

type TagListType = {
    data: Array<TagType>,
    pagination: PaginationType
}

type TagReducerState = {
    lists: TagListType
}