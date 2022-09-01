import express from "express";
import apiTehtavatRouter from "./routes/apiTehtavat";

const app : express.Application = express();

app.use("/api/tehtavat", apiTehtavatRouter);

const portti : number = Number(process.env.PORT) || 3001;

app.get("/", (req : express.Request, res : express.Response) => {

    res.send("use /api");
});

app.listen(portti, () => {
    console.log(`Palvelin käynnistyi osoitteeseen http://localhost:${portti}`)
})