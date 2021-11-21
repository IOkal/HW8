'use strict'

const express = require('express');
const bodyParser = require('body-parser');
// To download files:
const http = require('https');
const fs = require('fs');
const bucketName = 'hackwestern8-twilio-menus';
const {Storage} = require('@google-cloud/storage');
const { waitForDebugger } = require('inspector');


// Create a new instance of express
const app = express();
const storage = new Storage();

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Route that receives a POST request to /sms
app.post('/sms', async (req, res) => {
  const phoneNumber = req.body.From.substring(1);
  const body = req.body.Body;
  // const imageURL = req.body.

  // Creating filename
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  var fileDate = phoneNumber + '-' + year + "-" + month + "-" + date;
  var fileName = '';

  if(req.body.NumMedia > 0){
    console.log(JSON.stringify(req.body));
    var imageURL = req.body.MediaUrl0;
    if(req.body.MediaContentType0 == "image/jpeg"){
      fileName = fileDate + '.jpeg';
    } else {
      fileName = fileDate + '.png';
    }
    // Download the image from URL
    // await downloadFile(fileName, body)
    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    // await delay(500);
    // Upload image to Bucket:
    // var filePath = './' + fileName;
    // await uploadFile(filePath, fileName).catch(console.error);
    
    // Run OCR on image in bucket:
    detectIMGText(imageURL);

  } else {
    // Download PDF from URL
    fileName = fileDate + '.pdf';
    await downloadFile(fileName, body)
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(500);

    // Upload image to Bucket:
    var filePath = './' + fileName;
    await uploadFile(filePath, fileName).catch(console.error);
    
    // Run OCR on image in bucket:
    await detectPDFText(fileName);
  }

  res.set('Content-Type', 'text/plain');
  res.send(`We are processing your request`);
});

async function downloadFile(fileName, body) {
  const file = fs.createWriteStream(fileName);
  const request = http.get(body, function(response) {
    response.pipe(file);
  });
}

async function detectPDFText(fileName) {
    
  // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision');
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
      keyFilename: "../hackwestern8-0d3d6c2ee2f1.json",
  });

  // const fileName = 'LCL-FoodMenu-June2021.pdf';
  const outputPrefix = 'results'

  const gcsSourceUri = `gs://${bucketName}/${fileName}`;
  const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/`;

  const inputConfig = {
  // Supported mime_types are: 'application/pdf' and 'image/tiff'
  mimeType: 'application/pdf',
  gcsSource: {
      uri: gcsSourceUri,
  },
  };
  const outputConfig = {
  gcsDestination: {
      uri: gcsDestinationUri,
  },
  };
  const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
  const request = {
  requests: [
      {
      inputConfig: inputConfig,
      features: features,
      outputConfig: outputConfig,
      },
  ],
  };

  const [operation] = await client.asyncBatchAnnotateFiles(request);
  const [filesResponse] = await operation.promise();
  const destinationUri =
  filesResponse.responses[0].outputConfig.gcsDestination.uri;
  console.log('Json saved to: ' + destinationUri);
  return;
};

async function detectIMGText(imageURL) {
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs text detection on the gcs file
  const [result] = await client.textDetection(imageURL);
  const detections = result.textAnnotations;
  console.log('Text:');
  detections.forEach(text => console.log(text));
};

async function uploadFile(filePath, fileName) {
  await storage.bucket(bucketName).upload(filePath, {
    destination: fileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
};

// Tell our app to listen on port 3000
app.listen(80, function (err) {
  console.log('Server started on port 80');
});
