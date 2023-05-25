




import express from "express";
import cors from "cors";
import tacheRouter from './routers/tache.router'
import utilisateurRouter from './routers/utilisateur.router'
import {dbConnect} from "./configs/database.config";

dbConnect();

const app = express();


app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:5173"]
}));

app.use("/api/taches",tacheRouter)
app.use("/api/utilisateurs",utilisateurRouter)



const port = 5000;
app.listen(port, () => {
    console.log("l'application est sur http://localhost:" + port);
})
