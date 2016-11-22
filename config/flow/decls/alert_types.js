type AlertType = {
    id: string,
    title: string,
    content: string,
    status: string,
    alertType: string
}

type AlertReducerState = Array<AlertType>