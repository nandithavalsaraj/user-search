# Fetch public GitHub repositories for a given user

This project is a Single Page Application built using ReactJS which help fetches public repositories of a user given their GithHub username. Given a valid Github username, the public repositories of that user(if exists) are listed in a card layout with details of the repository (i.e. repository name, description and the last updated date).

## Running the App
- Clone the repository
- Navigate into the folder and run `npm install` to download dependencies.
- To launch application:
  - Development mode:
    - Run `npm run start` to serve the webapp in development mode.
    - Open [https://localhost:3000] in browser.
  - Production mode:
    - Run `npm run build` to generate production build into `build/` folder.
    - Run `serve -s build` to serve the production build using static server.
    - Open [https://localhost:5000] in browser.


## Available scripts 

### `npm start`

Runs the app in the development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and ready to be deployed.<br />

### `serve -s build`

Once app is built in production mode, this command serves the production build using a static server.

Built using [Create-React-App](https://github.com/facebook/create-react-app)
