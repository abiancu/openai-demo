const { Configuration, OpenAIApi } = require('openai');


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

exports.index = (req, res) => {
    res.render('product');
}

exports.generateProductDescription = async (req, res, next) => {
    let prompt = req.body.prompt
    console.log(`prompt: ${prompt}`)
    try {
        const response = await openai.createCompletion({
            model: 'text-curie-001',
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 256,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
    
        });
        
        // res.status(200).json({
        //     success: true,
        //     body: response.data.choices[0].text
        // });
        console.log(response)
        res.render('product', {textFromServer: response.data.choices[0].text})

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