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

function checkIfWordInList (word, lst) {

    for (var i = 0; i < lst.length; i++) {
        if (lst[i].toLowerCase() === word.toLowerCase()) {
            return true;
        }
    }

    return false;
}

function detectWords() {
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

    var redList = ["pizza"];
    var yellowList = ["pasta"];
    var greenList = ["chicken"];

    var fs = require("fs");
    var body2 = fs.readFileSync("../results_output-1-to-4.json", "UTF-8");
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
                    // console.log(symbols)

                    console.log(symbols.length)
                    for (let s = 0; s < symbols.length; s++) {
                        word = word + symbols[s].text;
                    }
                    // console.log(word)

                    if (checkIfWordInList(word, redList)) {
                        paragraph.push({"boundingBox": paragraphs[k].boundingBox, "Status": "R"});
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
                if (b) break;

                if (numYellow > 0) {
                    paragraph.push({"boundingBox": paragraphs[k].boundingBox, "Status": "Y"});
                } else if (numGreen > 0) {
                    paragraph.push({"boundingBox": paragraphs[k].boundingBox, "Status": "G"});
                } else {
                    paragraph.push({"boundingBox": paragraphs[k].boundingBox, "Status": "N"});
                }

                json["paragraphs"].push(paragraph);
                fs.writeFile ("input.json", JSON.stringify(json), function(err) {
                    // if (err) throw err;
                    console.log('complete');
                    }
                );
                // console.log(JSON.stringify(json));
            }
        }
    }
}

detectWords();
