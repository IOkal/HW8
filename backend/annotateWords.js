function wordsAnnotation(filename) {

    const doc = await PDFNet.PDFDoc.createFromURL(filename);
    const page = await doc.getPage(1);


    var body2 = fs.readFileSync("../input.json", "UTF-8");
    var body = JSON.parse(body2);

    var paragraphs = body["paragraphs"];
    var width = body["width"];
    var height = body["height"];

    for (var i = 0; i < paragraphs.length; i++) {

        var paragraph = paragraphs[i][0];

        var status = paragraph["Status"];
        var normalizedBounds = paragraph["boundingBox"]["normalizedVertices"];

        var lowerLeftX = normalizedBounds[0]["x"] * width;
        var lowerLeftY = normalizedBounds[0]["y"] * height;

        var upperRightX = normalizedBounds[2]["x"] * width;
        var upperRightY = normalizedBounds[2]["y"] * height;

        // Create a highlight
        const hl = await PDFNet.HighlightAnnot.create(doc, new PDFNet.Rect(lowerLeftX, lowerLeftY, upperRightX, upperRightY));
        if (status === "R") {
            hl.setColor((await PDFNet.ColorPt.init(1, 0, 0)), 3);
        }
        else if (status === "G") {
            hl.setColor((await PDFNet.ColorPt.init(0, 1, 0)), 3);
        }
        else if (status === "Y") {
            hl.setColor((await PDFNet.ColorPt.init(1, 1, 0.2)), 3);
        }

        hl.refreshAppearance();
        page.annotPushBack(hl);

    }

}
