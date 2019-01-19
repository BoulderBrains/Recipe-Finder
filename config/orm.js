// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++){
		arr.push("?");
	}
	return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
	var arr = [];

	for (var key in ob){
		arr.push(key + "=" + ob[key]);
	}
	return arr.toString();
};

//Object for all our SQL statement functions.
var orm = {
	//Get user from login and compares to database
	userGET: function(tableInput,username, passW, cb) {
		// Construct the query string that return all rows from the target table
		var queryString = "SELECT username, passW FROM " + tableInput + " WHERE username = '"+ username + "' AND passW = '" + passW + "' ;";
		// Perform the database query
		connection.query(queryString, function(err, result){
			if (err) {
				throw err; 
			}
			// Return results in callback
			cb(result);
		});
	},
	// Function that insert a single table entry
	userADD: function(table, cols, vals, cb){
		// Construct the query string that insert a single row into the target table
		var queryString = "INSERT INTO " + table;
		//Check for existing user
		queryString += "( username, passW ) ";
		queryString += "SELECT * FROM ( SELECT '";
		queryString += cols.toString();
		queryString += "' as username, '";
		queryString += vals.toString();
		queryString += "' as passW ) AS tmp WHERE NOT EXISTS ( SELECT username FROM ";
		queryString += table;
		queryString += " WHERE username = '";
		queryString += cols.toString();
		queryString += "' ) ;";
		
		//queryString += " SET ";
		//queryString += "username = '";
		//queryString += cols.toString();
		//queryString += "' , passW = '";
		//queryString += vals.toString();
		//queryString += "' ;";

		console.log(queryString);

		// Perform the database query
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			// Return results in callback
			cb(result);
		});
	},
	// Function that updates a single table entry
	userFAV: function(table, objColVals, condition, cb){
		// Construct the query string that update a signle entry in the target table
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		// console.log(queryString);
		connection.query(queryString, function(err, result){
			if (err) {
				throw err;
			}
			// Return results in callback
			cb(result);
		});
	}
};

// Export the orm object for the model (burger.js).
module.exports = orm;
