# BurgerJoints

This is burger joints application that shows the burger joints near tartu bus station outside 1Km radius.

## Information

- 2 main components Map(Shows the Map with venues) and Photos(Display the burger joint images).
- Some of the Burger joints don't have images.
- Latest burger joint image has been fetched and one with the burger in them is highlighted with red border.
- I added custom marker for the burger joints.
- In the master branch ngrx is used sharing the loading state. It is not required for such a small application. It has been implemented just to demonstrate that i am familiar with the state management concept.
- Without Ngrx implementation could be find in the branch - "behaviour-subject-loading-service"
- A separate loading service is implemented to keep the code clean.
- Test cases are added for the recognize burger service.

## App Setup

- Clone the project using the command "git clone https://github.com/gurparshad/burger-joints.git"
- Go into the root directory of the project
- Create a "environemnt.ts" file in the root directory and place in the environemnt variables provided in teh google docs.
- The Angular CLI requires a minimum Node.js version of v18.13. So switch to the required version or above by running the command "nvm use <node_version>"
- Run "npm install" to install al the required packages.
- Run "npm start"
- The application will start at http://localhost:4200/ if the port is not already in use.

## Commands

- npm start: to start the application
- npm run build: to build the application
- npm run watch: to start the application in watch mode
- npm run test: to run the test cases
- npm run lint: for linting, will give errors and warnings if find any linting issue
- npm run format: will run prettier formatter.
- pre-commit-msg: will run before every git commit.

## Tech stack

- Angular 17
- Rxjs
- Ngrx
- SCSS
- HTML
- Typescript
- Google maps api
- eslint
- prettier

## Further improvemenets and tasks that could be done.

- Test cases - Unit and E2E
- Ui Improvements
- Containerize the application using docker
- Global Error handling and Fallback UI.
