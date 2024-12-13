import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//require('dotenv').config(); // For loading environment variables

import {getCity, getCities, getDate, getTeam, createCity, removeCity, updateCityName, 
    removeCityByName, removeTeamByName, createAdmin, createTeam, 
    createTeamByStadiumNameAndCityName, removeAdminByName, createTicket, removeTicket, 
    createStadium, removeStadiumByName, createGame, removeGame, removeAirport, createAirport,
    updateGame, getGames, getAirports,
    getTickets} from "./database.mjs"

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

    try {
        const games = await getGames({}); // Fetch all games without filters
        res.render('index.ejs', { games:games });
    } catch (error) {
        console.error("Error fetching games for index:", error);
        res.render('index.ejs', { games: [] }); // Render an empty list if there's an error
    }
});


app.get("/map/:stadium", async (req, res) => {
    const stadium = req.params.stadium;
    const result = await getAirports(500,stadium);
    console.log(result);
    res.render("map.ejs", {data: result});
})


app.get("/test", async (req, res) => {
    const result = await getCities();
    console.log(result);
    res.render('test', { data: result });
})
app.get('/adminlogin', (req, res) => {
    res.render('adminlogin'); 
})

app.get("/admin", (req, res) => {
    res.render('AdminDashboard')
})
app.get("/tickets/:ticket", async (req, res) => {
    const ticket = req.params.ticket;
    const result = await getTickets(ticket);
    console.log(ticket);
    console.log(result);
    res.render('tickets',{data: result}); 
    
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
app.get("/games", async (req, res) => {
    const { startDate, endDate, team, stadium } = req.query;

    const filters = { startDate, endDate, team, stadium };

    try {
        const rows = await getGames(filters);
        console.log("Games retrieved:", rows); // For debugging
        res.json(rows); // Send the filtered games
    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).send("Server error");
    }
});

app.get("/adminLogin/:username/:password", async (req, res) => {
    const { username, password } = req.params;
    const result = await checkAdminLogin(username, password);
    console.log(result);
    res.render('AdminDashboard', { boolean: result });
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

app.post("/createAirport", async (req, res) => {
    console.log("made it here")
    const { AirportName, CityName, Latitude, Longitude} = req.body;
    const notes = await createAirport(AirportName, CityName, Latitude, Longitude);
    res.send('Airport:' + AirportName + "successfully created!");
})

app.post("/removeAirport", async (req, res) => {
    const { AirportName} = req.body;
    const notes = await removeAirport(AirportName);
    res.send('Airport:' + AirportName + "deleted!");
})

app.post("/createTicket", async (req, res) => {
    const { GameID, Price, Section} = req.body;
    const notes = await createTicket(GameID, Price, Section);
    res.send('Ticket for GameID:' + GameID + "successfully created!");
})

app.post("/removeTicket", async (req, res) => {
    const { GameID, Price, Section} = req.body;
    const notes = await removeTicket(GameID, Price, Section);
    res.send('Ticket for GameID:' + GameID + "deleted!");
})

app.post("/createStadium", async (req, res) =>{
    const {StadiumName, CityName, Longitude, Latitude} = req.body;
    const notes = await createStadium(StadiumName, CityName, Longitude, Latitude);
    res.send("Stadium:" + StadiumName + "Successfully Created")
})

app.post("/removeStadiumByName", async (req, res) => {
    const { StadiumName} = req.body;
    const notes = await removeStadiumByName(StadiumName);
    res.send('Stadium:' + StadiumName +  ' successfully removed from the database!');
})

app.post("/removeAdminByName", async (req, res) => {
    const { adminName} = req.body;
    const notes = await removeAdminByName(adminName);
    res.send('Admin:' + adminName +  ' successfully removed from the database!');
})

app.post('/createGame', async (req, res) => {
    const { Team1, Team2, Stadium, WinningTeam, Team1Score, Team2Score, Date } = req.body;
    // Insert data into the database
    const placeholder = await createGame(Team1, Team2, Stadium, WinningTeam, Team1Score, Team2Score, Date);
    res.send('New Game successfully saved to the database!');
});

app.post('/removeGame', async (req, res) => {
    const { Team1, Team2, Date } = req.body;
    // Insert data into the database
    const placeholder = await removeGame(Team1, Team2, Date);
    res.send('Game deleted from database!');
});

app.post('/updateGame', async (req, res) => {
    const { Team1, Team2, WinningTeam, Team1Score, Team2Score, Date } = req.body;
    //console.log(cityName, newName)
    const placeholder = await updateGame(Team1, Team2, WinningTeam, Team1Score, Team2Score, Date);
    res.send('Data updated in the database!');
});

app.post('/createCity', async (req, res) => {
    const { city, state, latitude, longitude } = req.body;
    // Insert data into the database
    const placeholder = await createCity(city, state, latitude, longitude);
    res.render('New City successfully saved to the database!');
});

app.post('/createTeam', async (req, res) => {
    const { TeamName, HomeStadium, HomeCity} = req.body;
    // Insert data into the database
    const placeholder = await createTeamByStadiumNameAndCityName(TeamName, HomeStadium, HomeCity);
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