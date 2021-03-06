## Setup

- cd proshop/ && npx create-react-app proshop
- cleanup files
- npm run dev once concurrently is setup, npm run server to run just server for testing

## Dependencies /frontend

- npm install react-bootstrap
- Add bootswatch theme css and simple header from bootstrap react
- npm install react-router-dom react-router-bootstrap
- npm install axios
- package.json add proxy into first object "proxy": "http://127.0.0.1:5000", to avoid CORS and enable api calls.
- npm install redux react-redux redux-thunk redux-devtools-extension

## Dependencies /root

- npm init
- entry point select server.js
- npm install express
- In package.json put into "scripts" to use npm start and concurrently:

  "start": "node backend/server",

  "server": "nodemon backend/server",

  "client": "npm start --prefix frontend",

  "dev": "concurrently \"npm run server\" \"npm run client\" ",

  "data:import": "node backend/seeder",

  "data:destroy": "node backend/seeder -d"

  inside main object add

  "type": "module" to use es6 modules instead of having to use require etc.

  Seed data using command: npm run data:import or npm run data:destroy

- npm install nodemon concurrently --save-dev
- npm install dotenv
- npm install mongoose
- npm install bcryptjs
- npm install express-async-handler
- npm install jsonwebtoken

###

###

###

###

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
