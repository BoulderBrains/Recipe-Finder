var orm = require("../config/orm.js");

var user = {
    userGET: function( username, password, cb){
        orm.userGET("users", username, password, function(res){
            cb(res);
        });
    },

    userADD: function(vals, cb){
        orm.userADD("users", vals, function(res){
            cb(res);
        });
    }


}

module.exports = user;