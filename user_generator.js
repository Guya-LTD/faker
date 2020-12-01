const fs = require("fs");
const neatCsv = require("neat-csv");

// Variables
var no_admin_users = 10;
var admin_password = "admin";
var names = {};
var users = [];
var roles = [
    "AD_2110", // E-commerce Admin
    "AD_3110"  // Xpress Admin
];

// Read All Names
try{
    const jsonString = fs.readFileSync("names.json");
    names = JSON.parse(jsonString);
} catch (err) {
    console.log(err);
    return;
}

/**
 * @return string
 */
var generateRandomName = () => {
    // Create array of object keys.
    const keys = Object.keys(names);

    // Generate random index based on number of keys
    const randIndex = Math.floor(Math.random() * keys.length);

    // Select a key from the array of keys using the random index
    const randKey = keys[randIndex];

    // Use the key to get the corresponding name from the "names" object
    const name = names[randKey].in_am;

    return name;
}

/**
 * @return string
 */
var generateFullName = () => {
    return generateRandomName() + " " + generateRandomName();
}

/**
 * Generating Admin Users
 * 0 - 4 = E-commerce Admin users
 * 5 - 10 = Xpress Admin users
 */
for(i = 0; i <= no_admin_users; i++) {
    //var uti = roles[0];
    //if(i >= 5) uti = roles[0];

    admin = {
        user_fullname: generateFullName(),
        user_email: "admin" + i +"@localhost.com",
        user_identity: "admin" + i +"@localhost.com",
        user_uti: i >= 5 ? roles[1] : roles[0],
        user_password: admin_password,
        user_pnum: ""
    }
    // Push user to users
    users.push(admin);
}



// Final writing to file
const jsonString = JSON.stringify(users, null, 4);

fs.writeFile('users.json', jsonString, err => {
    if(err) console.log("Error writting file", err);
    else console.log("Successfully wote file");
})