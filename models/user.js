var orm = require("../config/orm.js");

var user = {
	all: function(cb) {
		orm.all("users", function(res) {
			cb(res);
		});
	},
	// does this need to be updated to create?
    userGET: function( username, password, cb){
        orm.userGET("users", username, password, function(res){
            cb(res);
        });
    },
	// does this need to be updated to add?
    userADD: function(cols, vals, cb){
        orm.userADD("users", cols, vals, function(res){
            cb(res);
        });
	},
	
	// does this need to be updated to update?
	// TODO: Refine this so it works
	userFAVORITE: function(cols, vals, cb) {
		orm.userFAVORITE("users", cols, vals, function(res){
			cb(res);
		});
	}
}

module.exports = user;