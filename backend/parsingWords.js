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
        if (lst[i] === word) {
            return true;
        }
    }

    return false;
}

let json = {
    "paragraphs": []
};

// test file
const body = JSON.parse("results_output-1-to-4.json");

for (var i = 0; i < body["responses"].length; i++) {

    var response = body["responses"][i];
    var pages = response["fullTextAnnotation"]["pages"];

    var blocks = pages[0]["blocks"];


    for (var j = 0; j < blocks.length; j++) {

        var paragraphs = blocks["paragraphs"];

        for (var k = 0; k < paragraphs.length; k++) {

            var paragraph = {};

            var words = paragraphs[k]["words"];
            var numYellow = 0;
            var numGreen = 0;

            bool b = false;
            for (var w = 0; w < words.length; w++) {
                var word = "";
                var symbols = words[w];

                for (let s = 0; s < symbols.length; s++) {
                    word += symbols[s];
                }

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

        }

    }




}
