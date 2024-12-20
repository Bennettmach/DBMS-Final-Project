import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//require('dotenv').config(); // For loading environment variables

import {getCity, getCities, getDate, getTeam, createCity, removeCity, updateCityName, 
    removeCityByName, removeTeamByName, createAdmin, createTeam, 
    createTeamByStadiumNameAndCityName, removeAdminByName, createTicket, removeTicket, 
    createStadium, removeStadiumByName, createGame, removeGame, removeAirport, createAirport,
    updateGame, getGames, getAirports, login,getTickets} from "./database.mjs"

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
        res.render('index.ejs', { games });
    } catch (error) {
        console.error("Error fetching games for index:", error);
        res.render('index.ejs', { games: [] }); // Render an empty list if there's an error
    }
});


//     const result = await getCities(){
//     console.log(result);
//     res.render('index.ejs', {data: result});
// }

app.get("/map", async (req, res) => {
    const stadium = req.query.stadium
    const range = req.query.dist
    console.log(stadium+"-----------")
    console.log(range+"-----------")
    const result = await getAirports(range, stadium);
    console.log(result);
    res.render("map.ejs", {data: result, stadiumID: stadium});
})
app.get("/tickets/:ticket", async (req, res) => {
    const ticket = req.params.ticket;
    console.log(ticket);
    const result = await getTickets(ticket);
    console.log(result);
    res.render("tickets.ejs", {data: result});
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
    if (req.cookies && req.cookies.loggedIn === 'yes') {
        res.render('AdminDashboard', {message: null});
    } else {
        res.render('adminLogin');
    }
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
    res.render('AdminDashBoard.ejs');
})

app.post("/removeCityByName", async (req, res) => {
    const { cityName} = req.body;
    const notes = await removeCityByName(cityName);
    res.render('AdminDashBoard.ejs');
})

app.post("/removeTeamByName", async (req, res) => {
    const { teamName} = req.body;
    const notes = await removeTeamByName(teamName);
    res.render('AdminDashBoard.ejs');
})

app.post("/createAdmin", async (req, res) => {
    const { Username, Password} = req.body;
    const notes = await createAdmin(Username, Password);
    res.render('AdminDashBoard.ejs');
})

app.post("/createAirport", async (req, res) => {
    console.log("made it here")
    const { AirportName, CityName, Latitude, Longitude} = req.body;
    const notes = await createAirport(AirportName, CityName, Latitude, Longitude);
    res.render('AdminDashBoard.ejs');
})

app.post("/removeAirport", async (req, res) => {
    const { AirportName} = req.body;
    const notes = await removeAirport(AirportName);
    res.render('AdminDashBoard.ejs');
})

app.post("/createTicket", async (req, res) => {
    const { GameID, Price, Section} = req.body;
    const notes = await createTicket(GameID, Price, Section);
    res.render('AdminDashBoard.ejs');
})

app.post("/removeTicket", async (req, res) => {
    const { GameID, Price, Section} = req.body;
    const notes = await removeTicket(GameID, Price, Section);
    res.render('AdminDashBoard.ejs');
})

app.post("/createStadium", async (req, res) =>{
    const {StadiumName, CityName, Longitude, Latitude} = req.body;
    const notes = await createStadium(StadiumName, CityName, Longitude, Latitude);
    res.render('AdminDashBoard.ejs');
})

app.post("/removeStadiumByName", async (req, res) => {
    const { StadiumName} = req.body;
    const notes = await removeStadiumByName(StadiumName);
    res.render('AdminDashBoard.ejs');
})

app.post("/removeAdminByName", async (req, res) => {
    const { adminName} = req.body;
    const notes = await removeAdminByName(adminName);
    res.render('AdminDashBoard.ejs');
})

app.post('/createGame', async (req, res) => {
    const { Team1, Team2, Stadium, WinningTeam, Team1Score, Team2Score, Date } = req.body;
    // Insert data into the database
    const placeholder = await createGame(Team1, Team2, Stadium, WinningTeam, Team1Score, Team2Score, Date);
    res.render('AdminDashBoard.ejs');
});

app.post('/removeGame', async (req, res) => {
    const { Team1, Team2, Date } = req.body;
    // Insert data into the database
    const placeholder = await removeGame(Team1, Team2, Date);
    res.render('AdminDashBoard.ejs');
});

app.post('/updateGame', async (req, res) => {
    const { Team1, Team2, WinningTeam, Team1Score, Team2Score, Date } = req.body;
    //console.log(cityName, newName)
    const placeholder = await updateGame(Team1, Team2, WinningTeam, Team1Score, Team2Score, Date);
    res.render('AdminDashBoard.ejs');
});

app.post('/createCity', async (req, res) => {
    const { city, state, latitude, longitude } = req.body;
    // Insert data into the database
    const placeholder = await createCity(city, state, latitude, longitude);
    res.render('AdminDashboard.ejs');
});

app.post('/createTeam', async (req, res) => {
    const { TeamName, HomeStadium, HomeCity} = req.body;
    // Insert data into the database
    const placeholder = await createTeamByStadiumNameAndCityName(TeamName, HomeStadium, HomeCity);
    res.render('AdminDashBoard.ejs');
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
    res.render('AdminDashBoard.ejs');
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const awnser = await login(username, password)
    if(awnser != []){
        res.cookie("loggedIn", "yes")
        res.render('AdminDashboard')
    } else{
        res.render('adminLogin')
    }
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