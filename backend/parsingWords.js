// var mappings = {
//     "pork": ["pig", "bacon", "prosciutto", "ribs", "pancetta", "gammon", "rasher", "sowbelly", "pork slab", "porkbelly", "hog"],
//     "alcohol": ["wine", "beer", "vodka", "booze", "liquor", "rose"],
//     "mushroom": ["funghi"],
//     "gluten": ["wheat", "rye", "couscous", "bran", "bread", "pita", "bagel", "flatbread", "roll", "pasta", "cake", "crackers",
// "biscuits", "pie", "pastry", "crouton", "malt", "yeast", "fries", "gravy", "soy", "chips"],
//     "vegan": ["meat", "pork", "beef", "steak", "chicken", "fish", "shrimp", "seafood", "bacon", "egg", "cheese", "milk"]
// };

// function getSynonyms (word) {
//     return mappings[word.lower()];
// }
bucketName = 'hackwestern8-twilio-menus';
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

function checkIfWordInList (word, lst) {

    for (var i = 0; i < lst.length; i++) {
        if (lst[i].toLowerCase() === word.toLowerCase()) {
            return true;
        }
    }

    return false;
}

async function downloadFile(fileName, destFileName) {
    const options = {
        destination: destFileName,
    };
    // Downloads the file
    await storage.bucket(bucketName).file(fileName).download(options);
    console.log(
        `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
    );
};

async function detectWords() {
    let json = {
        "width": 0,
        "height": 0,
        "paragraphs": []
    };

    var mappings = {
    "pork": ["pig", "bacon", "prosciutto", "ribs", "pancetta", "gammon", "rasher", "sowbelly", "pork slab", "porkbelly", "hog"],
    "alcohol": ["wine", "beer", "vodka", "booze", "liquor", "rose"],
    "mushroom": ["funghi"],
    "gluten": ["wheat", "rye", "couscous", "bran", "bread", "pita", "bagel", "flatbread", "roll", "pasta", "cake", "crackers",
    "biscuits", "pie", "pastry", "crouton", "malt", "yeast", "fries", "gravy", "soy", "chips"],
        "vegan": ["meat", "pork", "beef", "steak", "chicken", "fish", "shrimp", "seafood", "bacon", "egg", "cheese", "milk"]
    };

    var redList = ["pork","Salami","salame","bacon","pancetta","ham", "prosciutto", "ribs", "gammon"];
    var yellowList = ["mushroom","funghi"];
    var greenList = ["pizza","pizzas"];

    var fs = require("fs");

    // Downloading JSON from Bucket
    // Creates a client
    const destFileName = './InitialOCR.json';

    await downloadFile('results/output-1-to-4.json', destFileName).catch(console.error);
    var body2 = fs.readFileSync("./InitialOCR.json", "UTF-8");
    var body = JSON.parse(body2);
    // console.log(body)
    // console.log(data);

    // test file
    // const body = JSON.parse("../results_output-1-to-4.json");
    // console.log(body.responses[1].fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[0].symbols[0].text)

    json.width = body["responses"][0]["fullTextAnnotation"]["pages"][0].width;
    json.height = body["responses"][0]["fullTextAnnotation"]["pages"][0].height;

    for (var i = 0; i < body["responses"].length; i++) {


        var response = body["responses"][i];
        var pages = response["fullTextAnnotation"]["pages"];

        var blocks = pages[0]["blocks"];

        for (var j = 0; j < blocks.length; j++) {

            var paragraphs = blocks[j]["paragraphs"];

            for (var k = 0; k < paragraphs.length; k++) {

                var paragraph = [];

                var words = paragraphs[k]["words"];
                var numYellow = 0;
                var numGreen = 0;

                var b = false;
                for (var w = 0; w < words.length; w++) {
                    var word = "";
                    var symbols = words[w]["symbols"];

                    for (let s = 0; s < symbols.length; s++) {
                        word = word + symbols[s].text;
                    }
                    // console.log(word)

                    if (checkIfWordInList(word, redList)) {
                        paragraph.push({"boundingBox": paragraphs[k].boundingBox, "Status": "R", "Page": i+1});
                        b = true;
                        break;
                    }
                    else if (checkIfWordInList(word, yellowList)) {
                        numYellow++;
                    }
                    else if (checkIfWordInList(word, greenList)) {
                        numGreen++;
                    }

                }
                if (b){
                    json["paragraphs"].push(paragraph);
                    break;
                };

                if (numYellow > 0) {
                    paragraph.push({"boundingBox": paragraphs[k].boundingBox, "Status": "Y", "Page": i+1});
                } else if (numGreen > 0) {
                    paragraph.push({"boundingBox": paragraphs[k].boundingBox, "Status": "G", "Page": i+1});
                } else {
                    paragraph.push({"boundingBox": paragraphs[k].boundingBox, "Status": "N", "Page": i+1});
                }

                json["paragraphs"].push(paragraph);
                fs.writeFile ("input.json", JSON.stringify(json), function(err) {
                    if (err) throw err;
                    // console.log('complete');
                    }
                );
                // console.log(JSON.stringify(json));
            }
        }
    }
}

detectWords();
