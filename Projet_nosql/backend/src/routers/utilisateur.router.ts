import jwt from "jsonwebtoken";
import {Router} from "express";
import asyncHandler from "express-async-handler";
import {Utilisateur, UtilisateurModel} from "../models/utilisateur.model";
import {HTTP_BAD_REQUEST} from "../constants/http_status";
const router = Router();





router.post("/login", asyncHandler(
    async (req, res) => {
        const {email, password} = req.body;
        const utilisateur = await UtilisateurModel.findOne({email,password});

        if(utilisateur !==null ) {
            res.send(utilisateur);
        }
        else{
            res.status(HTTP_BAD_REQUEST).send("le nom d'utilisateur ou le   mot de passe est incorrect ");
        }

    }
))


router.post('/register', asyncHandler(
    async (req, res) => {
        const {nomComplet, email, motDePasse} = req.body;
        const utilisateur = await UtilisateurModel.findOne({email});
        if(utilisateur){
            res.status(HTTP_BAD_REQUEST)
                .send('Utilisateur is already exist, please login!');
            return;
        }

        const newUtilisateur:Utilisateur = {
            nomComplet,
            email: email.toLowerCase(),
            motDePasse: motDePasse,
        }

        const dbUtilisateur = await UtilisateurModel.create(newUtilisateur);
        const utilisateurObject = dbUtilisateur.toObject();
        res.send(utilisateurObject);
    }
))



export default router;
