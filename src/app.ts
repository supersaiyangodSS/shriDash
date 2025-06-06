import express, { Response, Request } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import hbs from 'hbs';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static('public'));
app.set('views', join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.get('/', (req: Request, res: Response) => {
    res.render('index.hbs', {
        title: 'awesome',
        message: 'this is json'
    })
});

export default app;