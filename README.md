# Tweeter Project

A simple single-page AJAX-based Twitter clone that uses jQuery, Express, MongoDB, HTML5 and vanilla CSS3 to achieve basic Twitter functionalities

Also hosted here (https://infinite-badlands-59228.herokuapp.com/)

## Getting Started

1. Clone this repository.
2. Install dependencies using the `npm install` command.
3. This application requires a local running MongoDB instance.
4. Configure .env file to sepcify MongoDB url if required. It is set to "MONGODB_URI=mongodb://127.0.0.1:27017/tweets" by default.
3. Start the web server using the `npm start local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Screenshots
!["Home page"](https://github.com/jerry1646/tweeter/blob/master/docs/page.png)
!["Functional like feature"](https://github.com/jerry1646/tweeter/blob/master/docs/like-feature.png)

## Dependencies

- body-parser
- chance
- md5
- Express
- MongoDB
- Node 5.10.x or above

## Notes
- Future works include implementing user account features (now users are just randomly generated), flag and re-tweet features
