export type TableListItem = {
    key: number;
    activityName: string;
    coverImage: string;
    name: string;
    startTime: string;
    endTime: string;
    belongType: number;
    status: number;
    down: number;
}
export type TableListPagination = {
    total: number;
    pageSize: number;
    current: number;
}
