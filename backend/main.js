async function detectText() {

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

detectText();