 const functions = require('firebase-functions');
 const admin = require('firebase-admin');
 admin.initializeApp();

 const Firestore = admin.firestore;
 const db = Firestore();

 const axios = require("axios");
 const cors = require("cors")({
     origin: true
 });

 const googleMapsApiKey = "AIzaSyC0gXmzev0lfJwcyEGqWpnFEmu0i5ywf2c";

 exports.geocodeAddressAndSave = functions.https.onRequest(async(request, response) => {
     try {
         let address = encodeURI(request.body.address);
         let { data } = await axios.get(
             `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsApiKey}`
         );

         if (data.status !== "OK") {
             return cors(request, response, () => {
                 response.status(200).send("No Results");
             });
         }

         const geocodedLocation = data.results[0];
         const objGeolocation = {
             address: geocodedLocation.formatted_address,
             geoPoint: new admin.firestore.GeoPoint(geocodedLocation.geometry.location.lat, geocodedLocation.geometry.location.lng)
         }

         await db.collection('locations').add(objGeolocation);

         return cors(request, response, () => {
             response.status(200).send(objGeolocation);
         });
     } catch (error) {
         return cors(request, response, () => {
             console.log(error);
             response.status(500).send();
         });
     }
 });