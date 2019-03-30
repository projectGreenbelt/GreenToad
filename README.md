## Project Greenbelt (GreenToad) 

> The all-in-one app for status updates and current breakdowns of all the public access points on the Austin Greenbelt!

## Motivation

> As local Austinites and nature lovers we felt that there needed to be a comprehensive app that fellow Greenbelters could use to be informed in real-time what current situations are going down at each public access point. Stats we've currently included in this demo are water levels, water flows, current Greenbelt weather, as well as brief descriptions of each location and instructions for access. 

### Learning Objectives

* Mark: Increase React proficiency by building react components as part of the View in our site, and become more comfortable using Ternary Operartors to conditionally render components. 
* James: Increase React proficiency, as well as buid skill set pertaining to user authentication and real-time interaction between application users.

### Primary Purpose Of App

1. Shows users the list of greenbelt locations in Austin, along with Austin weather information, current water levels, and current water flow at each location.
2. Allows users to select a location from the list of greenbelt locations.
3. Once a greenbelt location is selected, the following functionality will be available:

* View threads/posts from other users who have selected this location. 
* View directions on how to get to the selected Greenbelt location.
* Allow user to start their own thread, which can in turn be viewed by other users.

### Wireframes

- <b>Home Page:</b>

![projectgreenbelt](https://user-images.githubusercontent.com/40775721/53996536-63b22180-40fe-11e9-85b8-e40e95267ee9.png)



- <b>User Posts Page:</b>

![user_post_alt](https://user-images.githubusercontent.com/41517616/50718048-9b92df00-1051-11e9-9183-ecb042bddf1b.png)

### Demoes

- [Widescreen](https://drive.google.com/file/d/1qYlutBazsrYM6ZLkKngHXrOj2JRbp0K7/view)

  <p align="center">
    <img src="https://gfycat.com/DeepDistinctIndianpalmsquirrel">
  </p>

- [Normal](https://drive.google.com/file/d/1rIa7fcEAjyiVvj4E2n3ebHNga3LUFIk8/view)
  
  <p align="center">
    <img src="https://thumbs.gfycat.com/PoliteJealousIrishredandwhitesetter-small.gif">
  </p>

- [Mobile](https://drive.google.com/file/d/1_ySdU_5Zzw3TSgXsC9fWveFU-eUMqz_e/view)

  <p align="center">
    <img src="https://thumbs.gfycat.com/ThoughtfulSpryBlacklab-small.gif">
  </p>
 

### Tech/framework used

<b>Front-End</b>

- React.js
- Material UI
- CSS
- JavaScript
- 0auth
- JSS
- D3
- ES6
- React-Google-Maps
- React-Liquid-Gauge
- React-Forecast
- React-Moment
- Axios



<b>Back-End</b>

- Mongo Database
- Mongo Labs (For deployed Database)
- Mongoose Schema
- Node.js
- Express
- 0auth
- Socket.io

<b>API</b>
- Google Maps API
- USG Water Services API
- Dark Sky API
  
<b>Deployment</b>

- [Heroku](https://greentoad.herokuapp.com/)

### Project Management

- We are using Github flow to manage this project with Github's interactive project board to track issues that will be resolved through pull requests. Every pull request must be reviewed and approved by a developer other than the originator before any changes to master can be made. Each pull request must have a detailed breakdown of the issues and changes that are being fixed and merged with that specific request. 

### Future Development

- In the future, we would like to add more features to the Social page that would show more location specific content. Also, we would like to add more widgets to the home page such as a list of all the trails on the Greenbelt and their current conditions. There really is an endless amount of possibilites that we could work with in this space to benefit the user.

- For App speed and performance, we would like to work more with Ternary Operators to conditionally render almost all of the content on the page with having to refresh/reload. For example, when checking into a specific location, a ternary operator will fire off and conditionally render the Posts and submitPosts components to the home page intsead of redirecting the routing to a "new" page. We believe this would make the website much more dynamic and truer to the vision that we believe a highly responsive React App should be.

- For testing, We began working with Jest tests, CI (Continuous Intergration), and Enzyme but sidetracked to focus more on the features of the app to deliver a quality MVP in the time alloted. Now, since that is done, we would like to begin writing more tests such as Benchmark Speed Testing and Shallow Rendering to increase site functionality. 


<b>If you would like to contribute to our idea code-wise, make a pull request and we will do our best to respond as quickly as we can! Or just give us some money and we will do it for you! ;)</b>


### Team Members
1. [James Tobey](https://github.com/jctobey)
2. [Mark Mayfield](https://github.com/themarcusaurelius)
