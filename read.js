/// <reference path="./typings/express/express.d.ts" />
var UserSQL = {  
                queryAll:'SELECT * FROM users',  
                getUserById:'SELECT * FROM users WHERE id = ? ',
              };
 module.exports = UserSQL;