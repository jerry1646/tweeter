"use strict";

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
    }
  };
};

