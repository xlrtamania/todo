import {connect} from 'mongoose';
import {ConnectOptions} from "mongoose";
export const dbConnect=()=>{
    connect("mongodb://127.0.0.1:27017/mongotodo"!,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
        ()=> console.log("connect successfully"),
        (error)=> console.log(error)
    )
}
