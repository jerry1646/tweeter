"use strict";

const ObjectId = require('mongodb').ObjectID;

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function(err, res){
        if (err){
          console.log(err);
        } else{
          callback(err);
        }
      });
    },

    // Get all tweets in `db`
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(function(err, result){
        callback(err,result);
      });
    },


    updateLike: function(data, callback) {
      // console.log(data);
      // const _id = `ObjectId("${data.id}")`;
      // console.log(_id);
      const like = Number(data.like);
      // const filter = {_id: ObjectId(data.id)};
      db.collection("tweets").updateOne({_id: ObjectId(data.id)}, {$set: {"like":like}}, (err, result) => {
        // the whole object
        console.log("like updated");
        if (err) {
          res.send('Something exploded on PUT /todos!')
        } else{
          callback(err);
        }
      });
    }
  }
}

// > db.tweets.updateOne({_id:ObjectId("5bbfcff348714933fb815d47")}, {$set: {"like": 5}})
