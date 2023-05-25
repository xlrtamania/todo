import { Router} from "express";
import asyncHandler from "express-async-handler";
import {Tache, TacheModel} from "../models/tache.model";
import {HTTP_BAD_REQUEST} from "../constants/http_status";
const router = Router();




router.get("/",asyncHandler(
    async (req,res)=>{
        const taches= await TacheModel.find();
        res.send(taches);
    }
));

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const taches = await TacheModel.find({titre: {$regex:searchRegex}})
        res.send(taches);
    }
))



router.get("/:tacheId", asyncHandler(
    async (req, res) => {
        const tache = await TacheModel.findById(req.params.tacheId);
        console.log(tache)
        res.send(tache);
    }
))

router.post('/addTache', asyncHandler(
    async (req, res) => {
        const {titre, dateModification, statue,dateLimite,commentaire, sousTaches}=req.body;
        const tache = await TacheModel.findOne({titre});
        if(tache){
            res.status(HTTP_BAD_REQUEST)
                .send('Tache est deja existe essayer d ajouter une autre!');
            return;
        }

        const newTache:Tache = {
            titre:titre.toLowerCase(),
            dateModification,
            statue,
            dateLimite,
            commentaire,
            sousTaches,
        }


        const dbTache = await TacheModel.create(newTache);
        res.send(dbTache);
    }
))

router.put("/:tacheId", asyncHandler(
    async (req, res) => {
        const {titre, dateModification, statue,dateLimite,commentaire, sousTaches}=req.body;
        const newTache:Tache = {
            titre:titre.toLowerCase(),
            dateModification,
            statue,
            dateLimite,
            commentaire,
            sousTaches,
        }
        const tache = await TacheModel.findOneAndUpdate({_id:req.params.tacheId },newTache);

        console.log(tache)
        res.send(tache);
    }
))
router.delete("/:tacheId", asyncHandler(
    async (req, res) => {
        await TacheModel.deleteOne({ _id: req.params.tacheId });
        res.sendStatus(204);
    }
))
export default router;
