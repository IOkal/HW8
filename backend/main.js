async function detectIMGText() {

    const vision = require("@google-cloud/vision");
    const client = new vision.ImageAnnotatorClient({
        keyFilename: "../hackwestern8-0d3d6c2ee2f1.json",
    });

    // client
    //     .textDetection("../Menu.png")
    //     .then((results) => {
    //         const labels = results[0].text
    //     })

    const fileName = '../Menu.png';

    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));

}

async function detectPDFText(bucketName) {

    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: "../hackwestern8-0d3d6c2ee2f1.json",
    });

    const fileName = 'LCL-FoodMenu-June2021.pdf';
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
}

// detectText();
detectPDFText('hackwestern8-twilio-menus');
