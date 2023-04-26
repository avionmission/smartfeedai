var express = require("express")
var axios = require("axios")
var router = express.Router();
const cheerio = require("cheerio");
const MindsDB = require("mindsdb-js-sdk");

router.get("/title", function(req, res, next){

}); 

//MindsDB setup
const user = {
    user: process.env.MINDSDB_USER,
    password: process.env.MINDSDB_PASS
};

const connectToMindsDB = async (user) => {
    await MindsDB.default.connect(user);
};

const getSummarisedText = async (text) => {
    const model = await MindsDB.default.Models.getModel(
        "text_summary",
        "mindsdb",
    );

    const queryOptions = {
        where: [`text_long = "${text}"`]
    };

    const prediction = await model.query(queryOptions);
    return prediction;
}

// Text summarisation route
router.post('/summary', async function (req, res) {
    let url = req.body.text;
    try {
        const response = await axios.get(url);
        const html = response.data;

        // get html content and extract title
        const $ = cheerio.load(html);
        const title = $('title').text();

        // extract text from webpage
        const paragraphs = $('p');
        let text = '';
        let maxLength = 3000;
        paragraphs.each((i, element) => {
            let paragraphText = $(element).text();
            if (text.length + paragraphText.length > maxLength) {
                // If the length of text plus the length of the current paragraph exceeds maxLength,
                // append only part of the paragraph to text to reach the maximum length.
                let remainingLength = maxLength - text.length;
                text += paragraphText.substring(0, remainingLength);
            } else {
                // Otherwise, append the entire paragraph to text.
                text += paragraphText;
            }

            // If the length of text has reached maxLength, exit the loop.
            if (text.length >= maxLength) {
                return false;
            }
        });

        // use MindsDB to summarise text using GPT4
        await connectToMindsDB(user);
        let summaryText = await getSummarisedText(text.replace(/[^\w\s\.]/g, ''));
        let retValue = summaryText["data"]["text_summary"];

        // include summary in the response
        res.json({title: title, summary: retValue});
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.json(error);
    }
});



module.exports = router;