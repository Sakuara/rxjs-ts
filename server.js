const express = require('express');
const app = express();

app.get('/api/userinfo',(req,res) => {
    res.json({
        username: 'kavi',
        age: 27
    })
})

app.listen(3000);