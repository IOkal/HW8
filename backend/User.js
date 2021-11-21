const express = require('express');
const router = express.Router();
const Firestore = require('@google-cloud/firestore');

//Firestore database configuration
const db = new Firestore({
  projectId: 'hackwestern8',
  keyFilename: '../hackwestern8-0d3d6c2ee2f1.json',
});

router.post('/signup', async(req, res) => {
  try {
    var userSnapshot = await db.collection('Users').get();
    var foundUser = false
    for await (let doc of userSnapshot.docs) {
      if (doc.data().phone === req.query.phone) {
        foundUser = true
      }
    }
    //If user already exists, send user already exists error
    if (foundUser) {
      return res.json({"error": true, "messages": "User already exists"})
    } else {
      //Create the new user with phone number
      var newUser = await db.collection('Users').add({
        phone: req.query.phone
      })
      return res.json({"error": false, "messages": {uid: newUser.id}})
    }
  } catch (err) {
    console.log(err)
    return res.json({"error": true, "messages": "Something went wrong"})
  }
})

router.post('/login', async(req, res) => {
  try {
    var userSnapshot = await db.collection('Users').get();
    var foundUser = false
    for await (let doc of userSnapshot.docs) {
      if (doc.data().phone === req.query.phone) {
        foundUser = true
      }
    }
    //If user already exists, send user already exists error
    if (foundUser) {
      res.json({"error": false, "messages": {}})
    } else { 
      //User does not exist
      return res.json({"error": true, "messages": "User does not exist"})
    }
  } catch (err) {
    return res.json({"error": true, "messages": "Something went wrong"})
  }
})

router.post('/addDetails', async(req, res) => {
  try {
    //Parse the arrays
    var pref = JSON.parse(req.query.preferences)
    console.log(pref)
    var rest = JSON.parse(req.query.restrictions)
    console.log(rest)

    var userDetailsSnapshot = await db.collection('Users').doc(req.query.uid).collection('Dietary').get();
    var dietaryDetails = await userDetailsSnapshot.docs[0]

    //If user has already set their dietary details
    if (dietaryDetails !== undefined) {
      await dietaryDetails.ref.set({
        preferences: [...dietaryDetails.data().Preferences, pref],
        references: [...dietaryDetails.data().Restrictions, rest]
      })
      return res.json({"error": false, "messages": {}})
    } else {
      await db.collection('Users').doc(req.query.uid).collection('Dietary').add({
        preferences: pref,
        restrictions: rest
      })
      return res.json({"error": false, "messages": {}})
    }
  } catch (err) {
    console.log(err)
    return res.json({"error": true, "messages": "Something went wrong"})
  }
})

router.get('/getDetails', async(req, res) => {
  try {
    var userDetailsSnapshot = await db.collection('Users').doc(req.query.uid).collection('Dietary').get();
    //If the collection is not empty
    if (userDetailsSnapshot.docs !== undefined) {
      if (userDetailsSnapshot.docs.length) {
        var dietaryDetails = await userDetailsSnapshot.docs[0]
        if (dietaryDetails.data() !== undefined) {
          return res.json({"error": false, "messages": {
            preferences: dietaryDetails.data().preferences,
            restrictions: dietaryDetails.data().preferences
          }})
        }
      }
    }
    return res.json({"error": true, "messages": "Nothing to retrieve"})
  } catch (err) {
    return res.json({"error": true, "messages": "Something went wrong"})
  }
})

module.exports = router