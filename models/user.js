var orm = require("../config/orm.js");

var user = {
    userGET: function( username, password, cb){
        orm.userGET("users", username, password, function(res){
            cb(res);
        });
    },

    userADD: function(cols, vals, cb){
        orm.userADD("users", cols, vals, function(res){
            cb(res);
        });
	},
	
	// TODO: Refine this so it works
	userFAVORITE: function(cols, vals, cb) {
		orm.userFavorite("users", cols, vals, function(res){
			cb(res);
		});
	}


}

module.exports = user;