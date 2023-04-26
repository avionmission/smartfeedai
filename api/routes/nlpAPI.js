var express = require("express")
var router = express.Router();
const MindsDB = require("mindsdb-js-sdk")

router.get("/", function(req, res, next){
    res.send("Api is working properly")
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
        "summariser_en",
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
    let text = req.body.text;
    try {
        await connectToMindsDB(user);
        let summaryText = await getSummarisedText(text);
        let retValue = summaryText["data"]["text_summary"];
        res.json({summary : retValue})
    } catch (error) {
        console.log(`Error: ${error}`);
        res.json(error);
    }
});

module.exports = router;