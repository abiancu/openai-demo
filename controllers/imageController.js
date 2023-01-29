const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

exports.index = (req, res) => {
    res.send("Hello from image generator page");
}

exports.generateImage = async(req, res, next) => {

    try {
        const response = await openai.createImage({
            prompt: "A cartoon image of a happy kid driving a formula one race car",
            n: 1,
            size: '512x512',
            response_format: 'url'    
        })

        res.status(200).json({
            success: true,
            body: response.data.data[0].url
        })

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            res.status(400).json({
                success: false, 
                error: error
            });
            return next(error);
        } else {
            console.log(error.message);
            res.status(400).json({
                success: false, 
                error: error
            });
            return next(error);
        }
    }
}