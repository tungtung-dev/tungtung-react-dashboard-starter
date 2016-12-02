type CategoryType = {
    name: string,
    slug: string
}

type CategoryListType = {
    data: Array<CategoryType>,
    pagination: PaginationType
}

type CategoryReducerType = {
    lists: CategoryListType
}