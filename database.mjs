import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    //password: '',
    database: 'dbproject'
}).promise()

export async function getCities(){
    const [rows] = await pool.query("SELECT * FROM Cities");
    return rows;
}

export async function login(username, password){
    const [rows] = await pool.query("SELECT * FROM admins WHERE username = ? AND password = ?", [username, password])
    console.log(rows)
    console.log(rows.length)
    return rows.length == 1
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
    const test = await pool.query(`
        SELECT * FROM Teams WHERE TeamName = ? AND HomeStadiumID = ? AND HomeCityID = ?`, [TeamName, StadiumID, CityID])
    if(test[0][0] == undefined){
    const result = await pool.query(
    ` INSERT INTO Teams (TeamName, HomeStadiumID, HomeCityID) VALUES (?, ?, ?)`, [TeamName, StadiumID, CityID])
    return "New Team created";
    } else {
        return "Team already exists!"
    }
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

export async function checkAdminLogin(username, password){
    const result = await pool.query(`
        SELECT * FROM LoginInfo WHERE Username = ? AND HashedPass = ?`, [username, password])
        //More here
}

// export async function getCity(city) {
//     const result = await pool.query(
//         `SELECT g.* FROM Games g JOIN Stadiums s ON g.StadiumID = s.StadiumID JOIN Cities c on s.StadiumID = c.CityID WHERE c.CityName = ?`
//         ,[city])
// }


export async function getGames(filters) {
    const { startDate, endDate, team, stadium } = filters;

    let query = `
        SELECT 
            g.GameDate,
            g.GameID,
            t1.TeamName AS Team1,
            t2.TeamName AS Team2,
            s.StadiumName AS Stadium,
            g.Score1,
            g.Score2,
            t3.TeamName AS Winner,
            g.StadiumID
        FROM Games g
        JOIN Teams t1 ON g.TeamID1 = t1.TeamID
        JOIN Teams t2 ON g.TeamID2 = t2.TeamID
        JOIN Stadiums s ON g.StadiumID = s.StadiumID
        LEFT JOIN Teams t3 ON g.Winner = t3.TeamID
        WHERE 1=1
    `;

    const params = [];
    if (startDate && endDate) {
        query += " AND g.GameDate BETWEEN ? AND ?";
        params.push(startDate, endDate);
    } else if (startDate) {
        query += " AND g.GameDate = ?";
        params.push(startDate);
    }

    if (team) {
        query += ` AND (g.TeamID1 IN (SELECT TeamID FROM Teams WHERE TeamName LIKE ?)
                        OR g.TeamID2 IN (SELECT TeamID FROM Teams WHERE TeamName LIKE ?))`;
        params.push('%' + team + '%', '%' + team + '%');
    }

    if (stadium) {
        query += " AND g.StadiumID IN (SELECT StadiumID FROM Stadiums WHERE StadiumName LIKE ?)";
        params.push('%' + stadium + '%', '%' + stadium + '%');
    }

    try {
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        console.error("Error querying games:", error);
        throw error;
    }
}

 export async function getAirports(range, stadiumID) {
    const result = await pool.query(
        `SELECT a.* FROM Stadiums s JOIN Cities c ON c.CityID = s.CID JOIN Airports a ON a.CityID = c.CityID WHERE s.StadiumID = ? AND ST_Distance_Sphere(point(a.Lon, a.Lat), point(s.Lon, s.Lat)) * 0.000621371192 < ?;`,
        [stadiumID, range])
    return result[0]
 }
 export async function getTickets(GameID) {
    const result = await pool.query(
        `SELECT Price, Section FROM Tickets WHERE GameID = ?`,
        [GameID])
    return result[0]
 }



export default {}