import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const apiTehtavatRouter : express.Router = express.Router();

apiTehtavatRouter.use(express.json());

apiTehtavatRouter.get("/", async (req : express.Request, res : express.Response) => {

    try {
        res.json(await prisma.tehtava.findMany());
        
    } catch (error : any) {
        res.status(500).json({"Virhe" : "Palvelimella tapahtui odottamaton virhe"})
    }

});

apiTehtavatRouter.put("/:id", async (req : express.Request, res : express.Response) => {

    if (await prisma.tehtava.count({
        where : {
            id : req.params.id
        }
    }))
    {
        try {

            res.json(await prisma.tehtava.update({
                where : {
                    id : req.params.id
                },
                data : {
                    nimi : req.body.nimi,
                    suoritettu : Boolean(req.body.suoritettu)
                    }
            }))
            
        } catch (error) {
            res.status(400).json({"Virhe" : "Virheellinen pyynnön body"})
        }
    }
    else {

    };
});

apiTehtavatRouter.post("/", async (req : express.Request, res : express.Response) => {

    if (Boolean(req.body.nimi) && (Boolean(req.body.suoritettu) === true || false))
    {
        try {
            await prisma.tehtava.create({
            data : {
                nimi : req.body.nimi,
                suoritettu : Boolean(req.body.suoritettu)
                }
            });

            res.json(await prisma.tehtava.findMany());
            
        } catch (error : any) {
            res.status(500).json({"Virhe" : "Palvelimella tapahtui odottamaton virhe"})
        }
    }
    else {
        res.status(400).json({"Virhe" : "Virheellinen pyynnön body"})
    }
});

apiTehtavatRouter.delete("/:id", async (req : express.Request, res : express.Response) => {

    if (await prisma.tehtava.count({
        where : {
            id : req.params.id
        }
    }))
    {
        try {
            await prisma.tehtava.delete({
                where : {
                    id : req.params.id
                }
            })
        
            res.json(await prisma.tehtava.findMany());
            
        } catch (error : any) {
            res.status(500).json({"Virhe" : "Palvelimella tapahtui odottamaton virhe"})
        }
    }
    else {
        res.status(400).json({"Virhe" : "Virheellinen ID"})
    }

});

export default apiTehtavatRouter;