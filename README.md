[![Blitz.js](https://raw.githubusercontent.com/blitz-js/art/master/github-cover-photo.png)](https://blitzjs.com)

This is a [Blitz.js](https://github.com/blitz-js/blitz) app.

# Din Advent
## Development
Start: `yarn start`
First time: run `yarn` first

## Build
Run `yarn build`

## Connect to database
The database is only accessible to the web server in the same region at the hosting provider, render.com. To connect to a database from your computer: 
1) Login to render.com and add you IP to the database you'd like to access
2) Download / start pgWeb on your machine: https://github.com/sosedoff/pgweb
3) setup the with the name of the database, the name of the database and port 5432 (see info in render). The password you can also get in render. Host: frankfurt-postgres.render.com
4) Do your stuff!
5) Remember to remove the IP that you added in step 2!
