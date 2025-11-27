export interface Apiresponse{
    message:string;
    success:boolean;
    token?:string;
    data?:object;
    zapId?:string;
    zap?:any;
}