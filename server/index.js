const express = require('express')
const app = express();

const API_URL = 'https://agams-captcha.onrender.com/?captcha='
const ARGS_API = '&pass=agamsclass'

const cors = require('cors')
app.use(cors());
 
app.get('/api', async (req, res) => {
    const randomChoices = ['dog', 'cat', 'mouse', 'cammel'];
    const randomPick = Math.floor(Math.random() * 4);
    const response = await fetch(API_URL+randomChoices[randomPick]+ARGS_API);
    const data = await response.text();
    res.send({image: data, valid: randomChoices[randomPick], options: randomChoices})
})

app.listen(process.env.PORT || 4000)