import express from 'express';
import ejs from 'ejs';
import cors from 'cors';
import bodyParser from 'body-parser';
//require('dotenv').config(); // For loading environment variables
import {getCity, getCities, getDate, getTeam, createCity, removeCity, updateCityName, removeCityByName, removeTeamByName, createAdmin, createTeam, createTeamByStadiumName} from "./database.mjs"
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);


// Initialize Express app
const app = express();
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/static", express.static('./static/'));
app.use(express.static(path.join(__dirname, 'public/')));
console.log('Serving static files from:', path.join(__dirname, 'public'));

app.set('view engine', 'ejs')

app.get("/", async (req, res) => {
    res.render('index.ejs')
})

app.get("/test", (req, res) => {
    res.render('test')
})

app.get("/admin", (req, res) => {
    res.render('AdminDashboard')
})

//app.get("/api/data", (req, res) => {
//    const data = {message: "This is the message"};
//    res.json(data)
//})

app.get("/city/:state", async (req, res) => {
    const state = req.params.state
    const notes = await getCity(state);
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

app.get("/removeCity", async (req, res) => {
    const notes = await removeCity("Nacogdoches");
    console.log(notes)
    res.send(notes)
})

app.post("/removeCityByName", async (req, res) => {
    const { cityName} = req.body;
    const notes = await removeCityByName(cityName);
    res.send('City:' + cityName +  ' successfully removed from the database!');
})

app.post("/removeTeamByName", async (req, res) => {
    const { teamName} = req.body;
    const notes = await removeTeamByName(teamName);
    res.send('Team:' + teamName +  ' successfully removed from the database!');
})

app.post("/createAdmin", async (req, res) => {
    const { Username, Password} = req.body;
    const notes = await createAdmin(Username, Password);
    res.send('Admin:' + Username + "successfully created!");
})

app.post('/createCity', async (req, res) => {
    const { city, state, latitude, longitude } = req.body;
    // Insert data into the database
    const placeholder = await createCity(city, state, latitude, longitude);
    res.send('New City successfully saved to the database!');
});

app.post('/createTeam', async (req, res) => {
    const { TeamName, HomeStadium, HomeCityID} = req.body;
    // Insert data into the database
    const placeholder = await createTeamByStadiumName(TeamName, HomeStadium, HomeCityID);
    res.send('New Team successfully saved to the database!');
});

app.post('/testGetCities', async (req, res) => {
    const data = await getCities();
    res.send(data)
    //res.send('Data successfully saved to the database!');
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