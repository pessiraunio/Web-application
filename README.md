## Project description

Web application for sport plan hosting. Add exercise plans and copy from others to your own account.

### How to run

## Prequisities

docker installed
nodejs installed


## Install packages

In the project directory

cd /server
npm install
cd ..
cd /client
npm install

### set up database

Go to project directory and run command

docker-compose up

Initialize database for testing.

cd /server
node server/scripts/init_db.js


### `npm run dev`

Run development server.


### cd client `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
