# NetBlend
### (Social Media API)

<p>&nbsp;</p>

## Technology Used:
| Technology Used         | Resource URL           |
| ------------- |:-------------:|
| Git | [https://git-scm.com/](https://git-scm.com/)     |
| JavaScript  | [https://www.javascript.com/](https://www.javascript.com/)      |
| Node.js | [https://nodejs.org/en](https://nodejs.org/en)      |
| Express.js | [https://expressjs.com/](https://expressjs.com/)   |
|Mongoose   | [https://mongoosejs.com/](https://mongoosejs.com/)      | 
|  MongoDB   |    [https://www.mongodb.com/](https://www.mongodb.com/)   |
|  MongoDB Compass | [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)    |
| Insomnia   | [https://insomnia.rest/](https://insomnia.rest/)     |


<p>&nbsp;</p>

## Description:

Walk-Through Video: 

MongoDB has emerged as a favored database solution among numerous social networks owing to its remarkable speed in handling vast quantities of data and its adaptability in managing unstructured data. Since data serves as the fundamental building block of these applications. I was tasked with creating a Social Media API  where users can freely express their thoughts, and other users can respond to those thoughts in the form of “reactions”. Additionally, users should have the ability to curate their own list of connections/friends. To accomplish this, I utilized Express.js for handling routes, MongoDB database, and the Mongoose Object Data Modeling (ODM) library. Furthermore, MongoDB Compass was utilized to aid me in interacting with the NetBlend database in a user friendly format with query builders, and a real-time data preview. This application provided me with valuable hands-on experience in building a robust and efficient API for social networking platforms, so that users can seamlessly engage and share within the network.

This application brings together many different kinds of software and associated packages to create a dynamic Social Media API called “NetBlend”. NetBlend is a versatile application that empowers users to effortlessly manage their user accounts, thoughts or posts, reactions or comments, and interactions with other users. With NetBlend, users have the ability to create, read, update, and delete their own user accounts, as well as publish and manage their thoughts or posts. They can also engage with other users' thoughts through the integration of Insomnia, allowing them to fetch and leave reactions on those thoughts. Additionally, NetBlend offers a personalized experience by enabling users to conveniently add or remove other users from their network, fostering meaningful connections within the platform.This Social Media API holds all of the data for the soon to come NetBlend Social Media application.



### Screenshot of Functioning Web Application:


![App In Use](/images/test-get-route-for-all-users.png)

<p>&nbsp;</p>

## Table of Contents:
* [Description](#description)
* [Installation](#installation) 
<br>
(JavaScript, Node.js, NPM Packages, Routing, Functional Programming, Arrow Functions, Objects, Functions, Mongoose, MongooseDB, MongoDB Compass, Insomnia, Express.js)
<br>

* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

<p>&nbsp;</p>

## Installation:

To install this project, a knowledge of JavaScript, Node.js, and Express.js, MongoDB, Mongoose, MongoDB COmpass, and Insomnia  were required.  I had to first install Node.js to my computer and then install the Express and NPM packages. I installed the following dependencies with my npm install (express, moment.js, mongoose, and nodemon).The Express package allowed me to use the express framework in Node.js. In order to create this application. Methods used ranged from JavaScript, Node.js, NPM Packages, Routing, Functional Programming, Arrow Functions, Objects, Functions, Mongoose, MongooseDB, MongoDB Compass, Insomnia, Express.js. NetBlend is an application which gives users an opportunity to create, read, update, and delete their user accounts, thoughts or posts, as well as reactions or comments to those thoughts. In addition, users are able to fetch another user's thoughts through insomnia, and leave their reactions. Finally, users should be able to add and delete other users for a more personalized experience. The code below makes this happen. 

<p>&nbsp;</p>

### Establish MongoDB Connection
```js
const { connect, connection } = require('mongoose');


const connectionString =
 process.env.MONGODB_URI || 'mongodb://localhost:27017/netblendDB';


connect(connectionString, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});


module.exports = connection;
```
(Above: This code establishes a connection to a MongoDB database using the Mongoose library. It retrieves the MongoDB connection URL from an environment variable, but falls back to a default local URL if not provided. The connection is configured with additional options and the established connection object is exported for further database interaction.)


<p>&nbsp;</p>

### Thought Handling Functions
```js
const { User, Thought } = require("../models");

module.exports={
  
   getThought(req, res) {
       Thought.find()
         .then((thought) => res.json(thought))
         .catch((err) => res.status(500).json(err));
     },
   createThought(req, res) {
       Thought.create(req.body)
           .then((thought) => {
               User.findOneAndUpdate(
                   { _id: req.body.userId },
                   { $push: { thoughts: thought._id } },
                   { new: true }
                 ).then((updatedUser) => {
                   res.json(updatedUser)})
                   .catch((err) => res.status(500).json(err));
                 })
   }}
```
(Above:This code exports two functions for handling thoughts related to a user. The getThought function retrieves all thoughts from the database and sends them as a JSON response. The createThought function creates a new thought based on the request body, updates the user's thoughts array with the newly created thought, and sends the updated user as a JSON response. If any errors occur during the process, a 500 status code and the error message are returned as a JSON response.)


<p>&nbsp;</p>


### Retrieving Single Thought
```js
getSingleThought(req, res) {
       Thought.findOne({ _id: req.params.thoughtId })
         .select('-__v')
         .populate("user")
         .then((thought) =>
           !thought
             ? res.status(404).json({ message: 'No thought with that ID' })
             : res.json(thought)
         )
         .catch((err) => res.status(500).json(err));
     },
```
(This code, defines a function getSingleThought that retrieves a single thought from the database based on the provided thoughtId parameter. The retrieved thought is then populated with the associated user information. If the thought is not found, a 404 status code and an error message are sent as a JSON response. Otherwise, the thought object is sent as a JSON response. Any encountered errors during the process result in a 500 status code and the error message being sent as a JSON response.)


<p>&nbsp;</p>


### Delete Thought
```js
deleteThought(req, res) {
       Thought.findOneAndDelete({ _id: req.params.thoughtId })
         .then((thought) =>
           !thought
             ? res.status(404).json({ message: 'No thought with that ID' })
             : User.deleteMany({ _id: { $in: thought.user } })
         )
         .then(() => res.json({ message: 'Thought and users deleted!' }))
         .catch((err) => res.status(500).json(err));
     },
```
(Above: This code defines a function deleteThought that deletes a thought from the database based on the provided thoughtId parameter. If the thought is not found, a 404 status code and an error message are sent as a JSON response. Otherwise, the function proceeds to delete the associated users based on the thought.user array. Once the deletion process is completed, a JSON response with a success message is sent. If any errors occur during the process, a 500 status code and the error message are sent as a JSON response.)


<p>&nbsp;</p>

### Update Thought
```js
 updateThought(req, res) {
       Thought.findOneAndUpdate(
         { _id: req.params.thoughtId },
         { $set: req.body },
         { runValidators: true, new: true }
       )
         .then((thought) =>
           !thought
             ? res.status(404).json({ message: 'No thought with this id!' })
             : res.json(course)
         )
         .catch((err) => res.status(500).json(err));
     },
```
(Above: This code defines a function updateThought that updates a thought in the database based on the provided thoughtId parameter. The updated thought is retrieved and sent as a JSON response. If the thought is not found, a 404 status code and an error message are sent as a JSON response. Any encountered errors during the process result in a 500 status code and the error message being sent as a JSON response.)

<p>&nbsp;</p>


### Create User and Get Users
```js
createUser(req, res) {
     User.create(req.body)
         .then((user) => res.json(user))
         .catch((err) => res.status(500).json(err));
 },
   getUser(req,res){
       User.find()
       .populate("thoughts")
       .then(async(users)=>{
           const userObj = {
               users
           };
           return res.json(userObj);
       })
       .catch((err) => {
           console.log(err);
           return res.status(500).json(err);
       })
   }, 
```
(Above: The createUser function creates a new user in the database based on the provided request body and sends the created user as a JSON response. If any errors occur during the process, a 500 status code and the error message are sent as a JSON response.

The getUser function retrieves all users from the database, populates their associated thoughts, and sends the user objects as a JSON response. If any errors occur during the process, a 500 status code and the error message are sent as a JSON response.Both functions handle the asynchronous operations using promises and handle any encountered errors appropriately.)

<p>&nbsp;</p>


### Add & Delete Friends
```js
addFriend(req, res) {
       User.findOneAndUpdate(
         { _id: req.params.userId },
         { $addToSet: { friends: req.body.friendId } },
         { runValidators: true, new: true }
       )
         .then((user) =>
           !user
             ? res.status(404).json({ message: "No user found with that ID :(" })
             : res.json(user)
         )
         .catch((err) => res.status(500).json(err));
     },
     deleteFriend(req, res) {
       User.findOneAndUpdate(
         { _id: req.params.userId },
         { $pull: { friends: req.params.friendId } },
         { new: true }
       )
         .then((user) =>
           !user
             ? res.status(404).json({ message: "No User find with this ID!" })
             : res.json(user)
         )
         .catch((err) => res.status(500).json(err));
     },
```
(Above:  The addFriend function adds a friend to a user's friend list in the database based on the provided userId and friendId parameters. The updated user object is then sent as a JSON response. If the user is not found, a 404 status code and an error message are sent as a JSON response.

The deleteFriend function removes a friend from a user's friend list in the database based on the provided userId and friendId parameters. The updated user object is sent as a JSON response. If the user is not found, a 404 status code and an error message are sent as a JSON response.

Both functions utilize the findOneAndUpdate method to update the user's friend list, handle any encountered errors using promises, and appropriately respond with the updated user object or error messages.)

<p>&nbsp;</p>

### User Schema
```js
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
   {
       username: {
           type: String,
           unique: true,
           required: true,
           trim: true,
         },
         email: {
           type: String,
           unique: true,
           required: true,
           match: [
               /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
               "Please fill a valid email address",
             ],
         },
         thoughts: [{
           type: Schema.Types.ObjectId,
           ref: "Thought",
         },
       ],
           friends: [{
           type: Schema.Types.ObjectId,
           ref: "User",
         },
       ],
   },
   {
       toJSON: {
         virtual: true,
       },
       id: false,
     }
)
```
(Above: This code defines a Mongoose schema for a user object with properties such as username and email. The schema includes validations for the uniqueness and required fields of username and email. It also defines relationships with other schemas, such as Thought and User, through the use of references.

Additionally, the schema includes configuration options, such as setting the virtual option to true in the toJSON property, allowing virtual properties to be included when converting the user object to JSON. The id option is set to false, ensuring that the schema does not include an id field.)


<p>&nbsp;</p>

### Thought Controllers
```js
const router = require('express').Router();
const {
 getThought,
 getSingleThought,
 createThought,
 updateThought,
 deleteThought,
} = require('../../controllers/thoughtController.js');


router.route('/').get(getThought).post(createThought);


router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);


module.exports = router;


```
(Above: This code sets up an Express router to handle various routes related to thoughts. It imports functions from the thoughtController.js file for handling different operations on thoughts, such as retrieving thoughts, creating a new thought, updating a thought, and deleting a thought. The router defines the corresponding HTTP methods and routes for each operation, such as GET, POST, DELETE, and PUT, and maps them to the respective controller functions. Finally, the router is exported to be used in other parts of the application.)



<p>&nbsp;</p>



### Usage: 

As the market shifts towards embracing big data, companies are faced with the challenge of not only collecting vast amounts of information but also utilizing it to derive actionable insights. To enhance social media data analysis, integrating an API has emerged as a valuable solution. This application is the social media API for NetBlend, and acts as a remote database that users are able to directly interact with by making accounts, adding friends, and sharing their thoughts and reactions to other users’ thoughts and reactions. In the realm of social media data analysis, APIs allow companies to connect to various platforms. Even big companies such as Twitter, Facebook, and Instagram, grant access to diverse datasets through their dynamic APIs. 

The use of NetBlend offers two significant benefits. Firstly, it saves a substantial amount of time and effort by eliminating the need to set up independent data collection infrastructure. Secondly, it provides greater control over the data being collected. By integrating NetBlend, programmers and even users are able to manipulate the database and collected data in a centralized location as well as leverage the NetBlend data to monitor public sentiment, identify potential issues, and extract valuable insights from user data. 


Overall, this application encourages community and user interaction in the form of a Social Media API. Users are able to friend each other, add thoughts and reactions to other users thoughts, and manage their own data. When it comes to social media data analysis, integrating the NetBlend API can prove to be a valuable asset. This API not only enables you to gather more precise and accurate data but also streamlines the entire data collection process, saving you valuable time and effort. By leveraging the capabilities of the NetBlend API, you can enhance the effectiveness and efficiency of your social media data analysis, enabling you to make more informed decisions and extract actionable insights from the vast amount of data available.

## Credits

* Recursion: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion 
* Inheritance: https://en.wikipedia.org/wiki/Composition_over_inheritance 
* Closures: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures 
* JavaScript Design Patterns: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures 
* Big-O Notation: https://www.freecodecamp.org/news/time-is-complex-but-priceless-f0abd015063c/
* Reference Operators: https://www.mongodb.com/docs/search/?q=reference+operator&searchProperty=manual-v6.0 
* $Match (Aggregation):https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/ 
* Execution Context: https://www.javascripttutorial.net/javascript-execution-context/
* 'this' Operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
* Data Structure: https://en.wikipedia.org/wiki/Data_structure
* The Event-Loop: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop 
* Higher-Order Functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
* Mongoose Docs: https://mongoosejs.com/docs/api/document.html
* Mongoose Schemas: https://mongoosejs.com/docs/api/document.html
* Mongoose Dates: https://mongoosejs.com/docs/api/document.html
* Mongoose Moment: https://www.npmjs.com/package/mongoose-moment
* Mongoose FindOneAndUpdate: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
* Effectivness of Social Media API's: https://www.domo.com/learn/article/the-effectiveness-of-api-integration-in-analyzing-social-media-data


### License:
MIT License

Copyright (c) [2023] [Afi Nkhume-Crecy]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,







