declare type FolderType = {
    id: string,
    name: string
}

declare type MediaType = {
    id: string,
    type: string,
    name: string,
    thumbnail_url: string,
    original_url: string,
    checked: boolean
}

declare type MediasType = {
    data: MediaType[],
    pagination: Object,
    filter: string
}

declare type MediaReducerState = {
    folders: Array<FolderType>,
    currentFolder: FolderType,
    medias: MediasType,
    firstLoaded: boolean
}
