import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    //password: '3141Unitedstates!',
    database: 'dbms'
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

export async function getGames(filters) {
    const { startDate, endDate, team, stadium } = filters;

    let query = `
        SELECT 
            g.GameDate,
            t1.TeamName AS Team1,
            t2.TeamName AS Team2,
            s.StadiumName AS Stadium,
            g.Score1,
            g.Score2,
            t3.TeamName AS Winner
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


export default {}