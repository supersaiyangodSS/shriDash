import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.json('test')
})

export default app;
