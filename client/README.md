# Lolo News - RSS feed parser
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Express.js](https://expressjs.com/). 

## Project purpose
Create a website “Lolo” that fetches the source content from a RSS feed.
The full content should be shown on the created web page.

- Every article can be opened by clicking on the article title, description or image.
- Before displaying the article, it must be freed from clutter using Mercury API web parser: https://mercury.postlight.com/web-parser/
- Clutter free article content should be displayed in scalable modal / pop-up window.
- No other external APIs or web services can be used.
- Scalable CSS should be added by developer and not by referencing well known front-end component libraries like “Bootstrap” or similar.
- Finished website host on Heroku cloud platform: https://www.heroku.com/

## Available Scripts

To run the project: run server and front-end scripts concurrently.

### in project root `yarn start`

Launches the server instance for API routes.

### in project client/ `yarn start` 

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

The deployed project can be viewed at [Lolo News app](https://lolo-news.herokuapp.com/).