const { Configuration, OpenAIApi } = require('openai');


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

exports.index = (req, res) => {
    res.send("Hello from product name page");
}

exports.generateProductDescription = async (req, res, next) => {
    
    try {
        const response = await openai.createCompletion({
            model: 'text-curie-001',
            prompt: 'Write a creative ad for the following product to run on Facebook aimed at parents:\n\nProduct: Learning Room is a virtual environment to help students from kindergarten to high school excel in school.',
            temperature: 0.5,
            max_tokens: 256,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
    
        });
        
        res.status(200).json({
            success: true,
            body: response.data.choices[0].text
        });

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