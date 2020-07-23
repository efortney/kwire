# SO-Clone

## About SO-Clone

This project was inspired by Stack Overflow's Q&A style website, and Twitter's UI. It is built to be a combination of the two.

## Running Locally

1. Ensure that you have installed [Node.js](https://nodejs.org/en/)
   - Check your install by running the command `node -v` inside of your terminal.
2. Clone this repo by running the command `https://github.com/efortney/so-clone.git` inside of your terminal. Make sure you are in a directory that you wish to develop the app in.
3. In your terminal, run the command `cd so-clone`.
4. Run `npm i` at the root of the project, once it finishes installing, run `cd client && npm i`
5. Once you are inside of the project, you can now run the application. Use the command `npm run start:dev` and navigate to [http://localhost:3000](http://localhost:3000).

## Architecture

SO-Clone is built on the MERN stack. It has a client rendered front end built in React that uses a proxy in order to communciate with a Node.js express server. This server is responsible for communication with a mongoDB atlas database. Instead of handling authentication, Passport.js is used as the sole authentication / authorization library.
