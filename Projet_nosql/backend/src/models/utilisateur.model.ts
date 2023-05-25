import {Schema, model} from 'mongoose';

export interface Utilisateur{
    nomComplet:string;
    email:string;
    motDePasse: string;


}

export const UtilisateurSchema = new Schema<Utilisateur>({
    nomComplet: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    motDePasse: {type: String, required: true},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const UtilisateurModel = model<Utilisateur>('utilisateur', UtilisateurSchema);
