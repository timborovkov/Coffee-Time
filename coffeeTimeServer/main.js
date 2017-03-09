var firebase = require("firebase-admin");
var algoliasearch = require('algoliasearch');
var client = algoliasearch("7F0P7G1SKS", "066206dec675679b76839f4d2fca16c4");
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://coffee-time-fc6c1.firebaseio.com"
});

app.get('/', function (req, res) {
  res.send('Welcome!');
});

var index = client.initIndex('cafes');
firebase.database().ref('cafes').on('value', initIndex);
function initIndex(dataSnapshot) {
  var objectsToIndex = [];
  var values = dataSnapshot.val();
  for (var key in values) {
    if (values.hasOwnProperty(key)) {
      var firebaseObject = values[key];
      firebaseObject.objectID = key;
      objectsToIndex.push(firebaseObject);
    }
  }
  index.saveObjects(objectsToIndex, function(err, content) {
    if (err) {
      throw err;
    }
    console.log('Firebase<>Algolia import done');
  });
}

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!')
});