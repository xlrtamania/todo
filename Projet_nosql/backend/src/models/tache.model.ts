import mongoose, {Schema, model} from 'mongoose';
import {TacheStatue} from "../constants/tache_statue";

export interface Tache{
    uid:string;
    titre:string;
    dateModification:string;
    statue: string;
    dateLimite:string;
    commentaire:string;
    sousTaches: string[];
}

export const TacheSchema = new Schema<Tache>(
    {   uid:{type:String,required:false},
        titre: {type: String, required:true},
        dateModification: {type:String, required:true},
        statue: {type: String, required:true},
        dateLimite: {type: String, required:true},
        commentaire: {type: String, required:false},
        sousTaches: {type: [String], required:false},
    },{
        toJSON:{
            virtuals: true
        },
        timestamps:true
    }
);

export const TacheModel = model<Tache>('task', TacheSchema);
