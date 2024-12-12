import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'DBMS'
}).promise()

export async function getCities(){
    const [rows] = await pool.query("SELECT * FROM Cities");
    return rows;
}

export async function getCity(CityID){
    const [rows] = await pool.query(`SELECT * FROM Cities WHERE State = ?;`, [CityID])
    return rows;
}

export async function createCity(CityName, State, Lat, Lon){
    const result = await pool.query(`
    INSERT INTO Cities (CityName, State, Lat, Lon) VALUES (?, ?, ?, ?)`, [CityName, State, Lat, Lon])
    return result + "City Inserted";
}

export async function updateCityName(cityName, newName){
    console.log(cityName, newName)
    const result = await pool.query(`
    UPDATE Cities SET CityName = ? WHERE CityName = ?`, [newName, cityName])
    return result + "City Inserted";
}

export async function removeCity(cityName) {
    const result = await pool.query(
    `DELETE FROM Cities WHERE CityName = ?`, (cityName))
    return result + "City Deleted";
}

export async function removeCityByName(cityName) {
    const result = await pool.query(
    `DELETE FROM Cities WHERE CityName = ?`, (cityName))
    return result + "City Deleted";
}

export async function removeTeamByName(teamName) {
    const result = await pool.query(
    `DELETE FROM Teams WHERE TeamName = ?`, [teamName]);
    return result + "Team Deleted";
}

export async function createAdmin(Username, Password) {
    const result = await pool.query(
    ` INSERT INTO Admins (Username, Password) VALUES (?, ?)`, [Username, Password])
    return result + "Admin created";
}

export async function createTicket(GameID, Price, Section) {
    const result = await pool.query(
    ` INSERT INTO Tickets (GameID, Price, Section) VALUES (?, ?, ?)`, [GameID, Price, Section])
    return result + "Ticket created";
}

export async function removeTicket(GameID, Price, Section) {
    const result = await pool.query(
    ` DELETE FROM Tickets WHERE GameID = ? AND Price = ? AND Section = ?`, [GameID, Price, Section])
    return result + "Ticket Deleted";
}

export async function createStadium(StadiumName, CityName, Longitude, Latitude){
    const CityData = await pool.query (`SELECT CityID FROM Cities WHERE CityName = ?`, [CityName])
    const CityID = CityData[0][0].CityID;
    const result = await pool.query(
    ` INSERT INTO Stadiums (CID, StadiumName, Lat, Lon) VALUES (?, ?, ?, ?)`, [CityID, StadiumName, Latitude, Longitude ])
    return result + "Stadium created";
}

export async function removeStadiumByName(StadiumName){
    const result = await pool.query(
    `DELETE FROM Stadiums WHERE StadiumName = ?`, [StadiumName]);
    return result + "Stadium Deleted";
}

export async function removeAdminByName(adminName){
    const result = await pool.query(
    `DELETE FROM Admins WHERE Username = ?`, [adminName]);
    return result + "Admin Deleted";
}

export async function createTeam(TeamName, HomeStadiumID, HomeCityID) {
    const result = await pool.query(
    ` INSERT INTO Teams (TeamName, HomeStadiumID, HomeCityID) VALUES (?, ?, ?)`, [TeamName, HomeStadiumID, HomeCityID])
    return result + "Admin created";
}

export async function createTeamByStadiumNameAndCityName(TeamName, HomeStadium, HomeCity) {
    const StadiumData = await pool.query(`SELECT StadiumID FROM Stadiums WHERE StadiumName = ?`, [HomeStadium])
    const StadiumID = StadiumData[0][0].StadiumID;
    const CityData = await pool.query (`SELECT CityID FROM Cities WHERE CityName = ?`, [HomeCity])
    const CityID = CityData[0][0].CityID;
    const result = await pool.query(
    ` INSERT INTO Teams (TeamName, HomeStadiumID, HomeCityID) VALUES (?, ?, ?)`, [TeamName, StadiumID, CityID])
    return result + "Admin created";
}

export async function createGame(Team1, Team2, Stadium, WinningTeam, Team1Score, Team2Score, Date) {
    const Team1Data = await pool.query(`SELECT TeamID FROM Teams WHERE TeamName = ?`, [Team1]);
    const Team2Data = await pool.query(`SELECT TeamID FROM Teams WHERE TeamName = ?`, [Team2]);
    var Team1ID = Team1Data[0][0].TeamID;
    var Team2ID = Team2Data[0][0].TeamID;
    const StadiumData = await pool.query(`SELECT StadiumID FROM Stadiums WHERE StadiumName = ?`, [Stadium])
    const StadiumID = StadiumData[0][0].StadiumID;
    var WinningTeamID = undefined;
    if(WinningTeam == Team1){WinningTeamID = Team1ID;} else if(WinningTeam == Team2){WinningTeamID = Team2ID;} else {WinningTeamID = null;}
    if(Team1Score == ''){Team1Score = null};
    if(Team2Score == ''){Team2Score = null};
    const result = await pool.query(
    ` INSERT INTO Games (TeamID1, TeamID2, StadiumID, Winner, Score1, Score2, GameDate ) VALUES (?, ?, ?, ?, ?, ?, ?)`, [Team1ID, Team2ID, StadiumID, WinningTeamID, Team1Score, Team2Score, Date])
    return result + "Game created";
}

export async function removeGame(Team1, Team2, Date) {
    const Team1Data = await pool.query(`SELECT TeamID FROM Teams WHERE TeamName = ?`, [Team1]);
    const Team2Data = await pool.query(`SELECT TeamID FROM Teams WHERE TeamName = ?`, [Team2]);
    const Team1ID = Team1Data[0][0].TeamID;
    const Team2ID = Team2Data[0][0].TeamID;
    const result = await pool.query(
    ` DELETE FROM Games WHERE TeamID1 = ? AND TeamID2 = ? AND GameDate = ?`, [Team1ID, Team2ID, Date])
    return result + "Game deleted";
}

export async function updateGame(Team1, Team2, WinningTeam, Team1Score, Team2Score, Date) {
    const Team1Data = await pool.query(`SELECT TeamID FROM Teams WHERE TeamName = ?`, [Team1]);
    const Team2Data = await pool.query(`SELECT TeamID FROM Teams WHERE TeamName = ?`, [Team2]);
    const Team1ID = Team1Data[0][0].TeamID;
    const Team2ID = Team2Data[0][0].TeamID;
    var WinningTeamID = undefined;
    if(WinningTeam = Team1){WinningTeamID = Team1ID;} else if(WinningTeam = Team2){WinningTeamID = Team2ID;} else {WinningTeamID = undefined;}
    const result = await pool.query(
    `UPDATE Games SET Score1 = ?, Score2 = ?, Winner = ? WHERE TeamID1 = ? AND TeamID2 = ? AND GameDate = ?`, [Team1Score, Team2Score, WinningTeamID, Team1ID, Team2ID,   Date])
    return result + "Game created";
}

export async function createAirport(AirportName, CityName, Latitude, Longitude) {
    console.log("made it here2")
    const CityData = await pool.query(`SELECT CityID FROM Cities WHERE CityName = ?`, [CityName]);
    const CityID = CityData[0][0].CityID;
    const result = await pool.query(
    ` INSERT INTO Airports (CityID, AirportName, Lat, Lon) VALUES (?, ?, ?, ?)`, [CityID, AirportName, Latitude, Longitude])
    return result + "Airport created";
}

export async function removeAirport(AirportName) {
    const result = await pool.query(
    ` DELETE FROM Airports WHERE AirportName = ? `, [AirportName])
    return result + "Airport deleted";
}


// const cities = await getCity("Texas")
// console.log(cities)
//const inserting = await createCity('Paris', 'Texas','0.0000','0.0000')
//console.log(inserting)

export async function getTeam(teamName) {
    const result = await pool.query(`
        SELECT g.* FROM Games g JOIN Teams t ON t.TeamID = g.TeamID1 
        OR t.TeamId = g.TeamID2 WHERE t.TeamName = ?`, [teamName])
        return result[0]
}

export async function getDate(date) {
    const result = await pool.query(
        `SELECT g.* FROM Games g WHERE g.GameDate = ?`, [date])
    return result[0]
}

// export async function getCity(city) {
//     const result = await pool.query(
//         `SELECT g.* FROM Games g JOIN Stadiums s ON g.StadiumID = s.StadiumID JOIN Cities c on s.StadiumID = c.CityID WHERE c.CityName = ?`
//         ,[city])
// }
 export async function getAirports(range = 1000) {
    const result = await pool.query(
        'Select DISTINCT a.* From games g Join stadiums s on g.StadiumID = s.StadiumID Join cities c on c.CityID = s.CID JOIN airports a on a.CityID = c.CityID Where ST_Distance_Sphere(point(a.Lon , a.Lat), point(-80,41)) * .000621371192 < ?;',
        [range])
    return result[0]
 }


export default {}