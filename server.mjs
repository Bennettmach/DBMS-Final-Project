import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//require('dotenv').config(); // For loading environment variables
import {getCity, getCities, getDate, getTeam, createCity, removeCity, updateCityName, getAirports} from "./database.mjs"
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);


// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/static", express.static('./static/'));
app.use(express.static(path.join(__dirname, 'public/')));
console.log('Serving static files from:', path.join(__dirname, 'public'));

app.set('view engine', 'ejs')

app.get("/", async (req, res) => {
    const result = await getCities();
    console.log(result);
    res.render('index.ejs', {data: result});
})

app.get("/map", async (req, res) => {
    const result = await getAirports();
    console.log(result);
    res.render("map.ejs", {data: result});
})

app.get("/test", async (req, res) => {
    const result = await getCities();
    console.log(result);
    res.render('test', { data: result });
})

//app.get("/api/data", (req, res) => {
//    const data = {message: "This is the message"};
//    res.json(data)
//})
app.get("airport/:range", async (req, res) => {
    const range = req.params.range;
    const result = await getAirports(range);
    console.log(range);
    console.log(result);
    res.render('test', {data: result})
})

app.get("/city/:state", async (req, res) => {
    const state = req.params.state;
    const result = await getCity(state);
    console.log(result);
    res.render('test', { data: result });
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

app.get("/removeCity", async (req, res) => {
    const notes = await removeCity("Nacogdoches");
    console.log(notes)
    res.send(notes)
})

app.post('/createCity', async (req, res) => {
    const { city, state } = req.body;
    // Insert data into the database
    const placeholder = await createCity(city, state, "0.00", "0.00");
    res.send('Data successfully saved to the database!');
});

app.post('/updateCityName', async (req, res) => {
    const { cityName, newName } = req.body;
    console.log(cityName, newName)
    const placeholder = await updateCityName(cityName, newName)
    res.send('Data updated in the database!');
});

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