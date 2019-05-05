# RecipeAppPOC
Recipe app example

### To get this running locally:
- In terminal, cd into project
- In the connection.js file, enter your mySQL password on line 8
- Open a new tab and run: mysql.server start
- Open another new tab and run: mysql -u root -p (to get into the sql command line)
- Open another new tab and run: node server.js

TODO:
- Fix allowing a user to add a favorite by clicking the ".favorite-button"
- Deploy this app to Heroku.
- Hide the API key in app.js.
