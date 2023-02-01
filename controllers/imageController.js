const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

exports.index = (req, res) => {
    res.render('image');
}

exports.generateImage = async(req, res, next) => {    
    let prompt = req.body.prompt
    let size = req.body.size
    console.log(`prompt: ${prompt}, size: ${size}`)
    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024',
            response_format: 'url'    
        })

        res.render('image', {image: response.data.data[0].url})
       

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