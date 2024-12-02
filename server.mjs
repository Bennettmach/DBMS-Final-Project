import express from 'express';
import ejs from 'ejs';
import cors from 'cors';
import bodyParser from 'body-parser';
//require('dotenv').config(); // For loading environment variables
import {getCity, getCities, getDate, getTeam, createCity, removeCity} from "./database.mjs"

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/static", express.static('./static/'));

app.get("/", async (req, res) => {
    res.render('index.ejs')
})


app.get("/city", async (req, res) => {
    const notes = await getCity("Texas");
    console.log(notes)
    res.send(notes);
})

app.get("/cities", async (req, res) => {
    const notes = await getCities();
    console.log(notes)
    res.send(notes);
})


app.get("/team", async (req, res) => {
    const notes = await getTeam("Dallas Cowboys");
    console.log(notes)
    res.send(notes);
})


app.get("/Date", async (req, res) => {
    const notes = await getDate("2024-04-27");
    console.log(notes)
    res.send(notes);
})

app.get("/addCity", async (req, res) => {
    const notes = await createCity("Nacogdoches", "Tennessee", "0.00", "0.00");
    console.log(notes)
    res.send(notes);
})

app.get("/removeCity", async (req, res) => {
    const notes = await removeCity("Nacogdoches");
    console.log(notes)
    res.send(notes)
})

// Define the PORT
const port = 4000;

// Start the server
app.listen(port, () => {
    console.log('Connected to port ' + port);
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Error 404: Not Found!');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    const status = err.statusCode || 500;
    res.status(status).send(err.message);
});