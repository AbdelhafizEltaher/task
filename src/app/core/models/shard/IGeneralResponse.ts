export interface IGeneralResponse<T> {
    data: T;
    errors : Array<string>;
    isSuccess:boolean
    message:string
}
export interface ILookup {
    id: number;
    name: string;
}