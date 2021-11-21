const fs = require('fs');
const {PDFNet} = require('@pdftron/pdfnet-node');
// const PDFTronLicense = require('../LicenseKey');

async function wordsAnnotation(filename) {
    await PDFNet.initialize('demo:1637473300094:7896b7a90300000000ed9ab4130b1edd11f2cffde0d63817bdc7f78845');
    const doc = await PDFNet.PDFDoc.createFromFilePath('./LCL-FoodMenu-June2021.pdf');
    // const doc = await PDFNet.PDFDoc.createFromURL('12896892489-2021-11-20.pdf');

    var body2 = fs.readFileSync("./input.json", "UTF-8");
    var body = JSON.parse(body2);

    var paragraphs = body["paragraphs"];
    var width = body["width"];
    var height = body["height"];

    // const itr = await doc.getPageIterator();
    //   for (itr; (await itr.hasNext()); (await itr.next())) {
    //     pageNum += 1;
    //     console.log('Page ' + pageNum + ': ');
    //     const page = await itr.current();

        for (var i = 0; i < paragraphs.length; i++) {

            var paragraph = paragraphs[i][0];

            var status = paragraph["Status"];
            var pageNum = paragraph["Page"];
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

            const page = await doc.getPage(pageNum);
            hl.refreshAppearance();
            page.annotPushBack(hl);

        }
        await doc.save('annotation_test1.pdf', PDFNet.SDFDoc.SaveOptions.e_linearized);

    // }

}

wordsAnnotation('LCL-FoodMeny-June2021.pdf');
