
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS stadiums;
DROP TABLE IF EXISTS airports;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS admins;

CREATE TABLE Cities (
	CityID int AUTO_INCREMENT,
    CityName VarChar(64),
    State VarChar(64),
    Lat VarChar(64),
    Lon VarChar(64),
    
    PRIMARY KEY (CityID)
);

CREATE TABLE Stadiums (
	StadiumID int AUTO_INCREMENT,
    CID int,
    StadiumName VarChar(64),
	Lat VarChar(64),
    Lon VarChar(64),
    
    PRIMARY KEY (StadiumID),
    FOREIGN KEY (CID) references Cities(CityID)
);

CREATE TABLE Teams (
	TeamID int AUTO_INCREMENT,
    TeamName varchar(64),
    HomeStadiumID int,
    HomeCityID int,
    
	FOREIGN KEY (HomeCityID) references Cities(CityID),
	FOREIGN KEY (HomeStadiumID) references Stadiums(StadiumID),
    Primary Key (TeamID)
);

CREATE TABLE Games (
	GameID int AUTO_INCREMENT,
    TeamID1 int,
    TeamID2 int,
    StadiumID int,
    Winner int,
    Score1 int,
    Score2 int,
    GameDate DATE,
    
	Primary Key (GameID),
    Foreign Key (TeamID1) references Teams(TeamID),
    Foreign Key (TeamID2) references Teams(TeamID),
	Foreign Key (StadiumID) references Stadiums(StadiumID),
    foreign key (Winner) references Teams(TeamID)
);

CREATE TABLE Tickets (
	TicketID int AUTO_INCREMENT,
    GameID int,
    Price Float,
    Section varchar(32),
    PRIMARY KEY (TicketID),
    FOREIGN KEY (GameID) REFERENCES Games(GameID)
);

CREATE TABLE Airports (
	AirportID int AUTO_INCREMENT,
    CityID int,
    AirportName VarChar(64),
    Lat VarChar(64),
    Lon VarChar(64),
    
    PRIMARY KEY (AirportID),
    FOREIGN KEY (CityID) references Cities(CityID)
);

CREATE TABLE admins (
	ID int auto_increment,
    username varchar(32),
    password varchar(54),
    
    PRIMARY KEY (ID)
);

Select * from cities;
Select * from airports;
Select * from stadiums;


INSERT INTO admins(username, password) VALUES ("admin","admin");


INSERT INTO Cities (CityName, State, Lat, Lon) VALUES
("Pittsburgh", "Pennsylvania", "40°26'30N", "80°00'19W"), #Note that coordinates are generally formatted "40°26'30"N". Will likely need to augment the strings to work with maps API
("Paradise", "Nevada", "36°06'07N", "115°08'48W"),
("Kansas City", "Missouri", "39°07'23N", "94°34'53W"),
("Arlington", "Texas", "32°44'32N", "97°06'32W"),
("Charlotte", "North Carolina", "35°14'15N", "80°50'40W"),
("New Orleans", "Louisiana", "29°58'21N", "90°04'36W"),
("Denver", "Colorado", "39°45'04N", "104°59'32W"),
("Jacksonville", "Florida", "30°21'32N", "81°39'10W" ),
("Detroit", "Michigan","42°20'31N", "83°02'48W"),
("Foxborough", "Massachusets", "42°04'03N","71°14'54W" ),
("Miami Gardens", "Florida", " 25°56'39N" ,"80°14'46W" ),
("Orchard Park", "New York","42°46'07N", "78°44'36W"),
("Cleveland", "Ohio", "41°30'32N", "81°41'33W" ),
("Green Bay", "Wisconsin","44°31'05N","88°00'45W" ),
("Santa Clara", "California", "37°21'29N", "121°57'15W" ),
("Philadelphia", "Pennsylvania", "39°58'10N","75°09'46W"),
("Indianapolis", "Indiana", "39°46'50N", "86°09'26W" ),
("Seattle", "Washington", "47°36'43N", "122°20'00W"),
("Baltimore", "Maryland","39°17'31N", "76°36'45W" ),
("Atlanta", "Georgia", "33°45'23N", "84°23'18W" ),
("East Rutherford", "New York", "40°50'08N" ,"74°05'50W" ),
("Nashville", "Tennessee", "36°10'42N", "86°46'58W" ),
("Landover", "Maryland","38°56'03N", "76°53'47W" ),
("Houston", "Texas", "29°46'10N", "95°22'23W" ),
("Cincinnati", "Ohio", "39°06'30N", "84°30'49W" ),
("Tampa", "Florida", "27°57'56N", "82°27'28W" ),
("Inglewood", "California", "33°57'44N", "118°21'11W" ),
("Chicago", "Illinois", "41°52'49N", "87°37'47W" ),
("Glendale", "Arizona", "34°08'40N", "118°15'23W" ),
("Minneapolis", "Minnesota","44°58'45N", "93°15'53W" );


INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('McGee 04 Heliport',34.775671,-77.392244,8);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Veterans Affairs Medical Center Heliport',29.699687,-95.39069,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Abc7-Tv Heliport',35.15719986,-118.2890015,29);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Johns Hopkins Bayview Hospital Heliport',39.291401,-76.546303,19);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Ainsworth Airport',30.31270027,-95.02690125,13);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Howard Memorial Hospital Heliport',33.94884,-93.88024,22);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Kauffman Heliport',40.14630127,-104.887001,7);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Glen Fed Heliport',34.157179,-118.254637,29);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Gary Gale Seaplane Base',30.19389915,-81.68190002,8);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Mountain Airpark',34.5617981,-83.71350098,13);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Roto-Whirl/Holiday Heliport',39.922501,-86.226097,17);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Roto-Whirl/Vantage Heliport',39.837299,-86.118597,17);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Johns Hopkins Hospital Heliport',39.297725,-76.592941,19);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Henry Ford Hospital Heliport',42.36750031,-83.08439636,9);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Bert Walter Berkowitz Heliport',39.08530045,-94.57379913,3);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Shenandoah Valley Farms Airport',33.80070114,-89.02729797,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Flying S Ranch Airport',35.755699,-80.735298,13);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Metro Heli-Pad Heliport',29.61470032,-95.35489655,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Houston Heliport',29.819259,-95.663143,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Lake Bay Gall Airport',30.44190025,-95.18630219,13);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Harris County Courthouse Heliport',29.71610069,-95.47689819,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Seattle Seaplanes Seaplane Base',47.62760162,-122.3320007,18);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Childrens Hospital Emergency Heliport',47.66400146,-122.2809982,18);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('University of Kansas Hospital Heliport',39.056277,-94.608892,3);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Bear Creek Heliport',29.79220009,-95.63490295,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Channel 7 Heliport',39.7253,-104.984,7);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Conoco Heliport',29.7894,-95.611099,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Ascension Saint Agnes Hospital Heliport',39.270546,-76.673863,19);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Channel Two Heliport',29.69020081,-95.52770233,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Satterbergs Airport',61.65470123,-149.8999939,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Lutheran Hospital Heliport',41.354198,-81.708199,13);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Johns Hopkins Hospital Critical Care Tower Heliport',39.296011,-76.592109,19);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Grace Hospital Heliport',42.4178009,-83.18299866,9);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Allen Condo/Tower Heliport',29.760111,-95.382389,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Jacksonville / Hunter Field',32.017778,-95.79694444,8);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('North Patrol Div Station Heliport',39.245025,-94.591486,3);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Arrowhead Heliport',28.10499,-82.4826,26);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('South One Ten Airport',31.178499,-83.226501,22);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Grady Memorial Hospital Heliport',33.752476,-84.382115,20);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Ktrk Tv Station Heliport',29.72550011,-95.42970276,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Bolton Airport',31.91740036,-95.2071991,8);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('St Luke''s Hospital at the Vintage Heliport',29.990094,-95.5681,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Deer Crossing Airport',34.54970169,-83.82219696,13);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Cypress Fairbanks Medical Center Heliport',29.928028,-95.588944,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Houston Airpark',29.519727,-95.27453,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Gray Steel Heliport',29.791041,-95.438761,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('General Plumbing Contractors Heliport',29.897,-95.395167,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('J W Riley Hospital For Children Heliport',39.77690125,-86.18060303,17);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Marriott Parking Garage Rooftop Heliport',39.283199,-76.601997,19);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Police Helicopter Patrol Heliport',29.64859962,-95.27410126,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('CMTI Heliport',39.259539,-76.566258,19);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Parkview Center Hospital Heliport',29.86829948,-95.40850067,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Fort Benjamin Harrison Hospital Heliport',39.86500168,-85.99780273,17);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('St Vincent Indianapolis Hospital Heliport',39.90800095,-86.1934967,17);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Charter Bank Building Heliport',29.741899,-95.484703,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Henley Aerodrome',35.83330154,-91.4332962,5);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Fedex Field Heliport',38.908774,-76.866934,23);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('CHOA North Druid Hills Helipads',33.831444,-84.330133,20);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('West Houston Medical Center Heliport',29.728542,-95.594489,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('McGill Ultralight Field',33.683283,-112.165883,29);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Glendale Plaza Emergency Heliport',34.155692,-118.258515,29);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Presbyterian/St Luke''s Medical Center Heliport',39.747752,-104.967866,7);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Atlanta Medical Center Heliport',33.762669,-84.373932,20);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Washington County Hospital Heliport',38.338726,-89.392299,22);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Pegasus Ranch Aerodrome',37.382,-92.210701,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Runway Ranch Airport',38.95000076,-94.45020294,3);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Kimmel Land & Cattle Airport',33.83000183,-88.92279816,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Meridian Corporate Center Heliport',35.23630142,-80.93309784,5);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Saint Thomas Midtown Hospital Heliport',36.153953,-86.802022,22);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Tristar Skyline Medical Center Heliport',36.24625,-86.749957,22);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('WGCL-TV Heliport',33.787341,-84.401055,20);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Peterson Seaplane Base',45,-93.419674,30);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Tenneco Lab Helistop',29.72299957,-95.47109985,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Roto-Whirl/Ski World Heliport',39.154999,-86.297203,22);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('SW Police Station Nr 4 Heliport',29.688365,-95.452083,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Bradley Memorial Hospital Heliport',35.178211,-84.869442,13);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('St Mary''s Hospital Heliport',44.53219986,-88.06590271,14);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Carolinas Medical Center Heliport',35.204368,-80.838466,5);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('St Vincent''s Medical Center Heliport',30.308245,-81.690613,8);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('NE Police Station Nr 2 Heliport',29.813299,-95.336304,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Dorothy Roeber Memorial Heliport',43.8072,-115.1308,20);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Houston Police Department Northwest Heliport',29.857422,-95.539819,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Industry Air Park',39.84479904,-82.57959747,19);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Kurio Heliport',29.801901,-95.565498,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('John S Dunn Heliport',29.714123,-95.395047,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('123 Arcom Heliport',39.85889816,-85.99829865,17);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Chevron Place Heliport',29.95299911,-90.07309723,6);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Wend Valley Airport',42.579007,-84.908947,5);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('University of Chicago Hospitals Heliport',41.78839874,-87.60420227,28);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Pier 7 Heliport',39.271518,-76.572422,19);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Horizons Heliport',39.12260056,-84.40989685,25);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('First City Financial Center Heliport',29.75379944,-95.3655014, 24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Aegis Heliport',44.471432,-87.994818,14);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Teate Field',33.1696,-97.731664,2);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('UF Health North Heliport',30.483961,-81.631897,8);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Rabbit Hole Heliport',33.5381012,-84.47440338,20);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Porter Memorial Hospital Heliport',39.67079926,-104.9759979,7);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Mayo Clinic Heliport',30.264936,-81.441263,8);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Southport Heliport',39.66809845,-86.09500122,17);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Presence Sts Mary and Elizabeth Medical Center Heliport',41.902802,-87.6828,28);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Providence Medical Center Heliport',39.12689972,-94.78769684,3);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Jackson Barracks Heliport',29.953501,-90.009499,6);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('New Orleans East Hospital Heliport',30.028439,-89.975604,6);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Flying ''E'' Airport',37.3492012,-92.12830353,24);
INSERT INTO airports(AirportName,Lat,Lon,CityID) VALUES ('Little Mountain Airport',35.591767,-81.080421,7);

INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (1, 'Acrisure Stadium', 40.44718933235641, -80.01539528413535);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (2, 'Allegiant Stadium',36.090689873523374, -115.18358713397343);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (3, 'Arrowhead Stadium', 39.04888074146373, -94.48427689527459);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (4, 'AT&T Stadium', 32.74758890944343, -97.09323810689075);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (5, 'Bank of America Stadium', 35.22597159927578, -80.85269571474213);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (6, 'Caesars Superdome', 29.950513158743412, -90.08110370110468);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (7, 'Empower Field at Mile High', 39.74349865237954, -105.01993770773495);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (8, 'EverBank Stadium', 30.32378018996298, -81.63730668575701);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (9, 'Ford Field', 42.34015312014736, -83.04562782489393); 
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (10, 'Gillette Stadium', 42.09110647790941, -71.26431136405257);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (11, 'Hard Rock Stadium', 25.95818132954641, -80.23927759415145);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (12, 'Highmark Stadium', 42.77389745133717, -78.78695136721673);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (13, 'Huntington Bank Field', 41.50593075168117, -81.69939692931617);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (14, 'Lambeau Field', 44.50143273673948, -88.06209016511545);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (15, 'Levis Stadium', 37.403188615646165, -121.96946345417163);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (16, 'Lincoln Financial Field', 39.90145165772772, -75.16754581419447);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (17, 'Lucas Oil Stadium', 39.76014271683956, -86.16363862598529);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (18, 'Lumen Field', 47.595245844496766, -122.33162741922669);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (19, 'M&T Bank Stadium', 39.27794971643342, -76.62289687836355);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (20, 'Mercedes-Benz Stadium', 33.75559506558387, -84.40070230594482);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (21, 'MetLife Stadium', 40.813709330033205, -74.07446789400502);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (22, 'Nissan Stadium', 36.16655595318013, -86.7712554308211);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (23, 'Northwest Stadium', 38.907965208617746, -76.8647267733988);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (24, 'NRG Stadium', 29.684712900470117, -95.41097348417344);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (25, 'Paycor Stadium', 39.09544919803525, -84.51597721510123);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (26, 'Raymond James Stadium', 27.975992131708892, -82.50332570153078);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (27, 'SoFi Stadium', 33.95362131025762, -118.33907132940958);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (28, 'Soldier Field', 41.86252905707651, -87.61680443211452);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (29, 'State Farm Stadium', 33.527763428399965, -112.26247048942992);
INSERT INTO stadiums(CID, StadiumName, Lat, Lon) VALUES (30, 'U.S. Bank Stadium', 44.9736969855438, -93.25744607886615);

INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ('Buffalo Bills', 12, 12);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ('Miami Dolphins', 11, 11);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ('New England Patriot', 10, 10);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ('New York Jets', 21, 21);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ('Baltimore Ravens',  19, 19);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ('Cincinnati Bengals', 25, 25);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ('Cleveland Browns', 13, 13);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Pittsburgh Steelers', 1,1);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Houston Texans', 24, 24);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Indianatpolis Colts', 17, 17);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Jacksonville Jaguars', 8 ,8);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Tennessee Titans', 22 , 22);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Denver Broncos', 7, 7);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Las Vegas Raiders', 2, 2);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Los Angeles Chargers', 27, 27);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Dallas Cowboys', 4, 4);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'New York Giants', 21, 21);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Philadelphia Eagles', 16, 16);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Washington Commanders', 23, 23);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Chicago Bears', 28, 28);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Detroit Lions', 9, 9);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Green Bay Packers', 14, 14);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'New Orleans Saints', 6, 6);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Arizona Cardinals', 29, 29);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Los Angeles Rams', 27, 27);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'San Francisco 49ers', 15, 15);
INSERT INTO teams(TeamName, HomeStadiumID, HomeCityID) VALUES ( 'Seattle Seahawks', 18, 18);

