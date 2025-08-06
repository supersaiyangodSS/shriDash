import express, { Response, Request } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import hbs from 'hbs';
import fs from 'fs';
import connectLiverreload from 'connect-livereload';

const app = express();

app.use(connectLiverreload());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const viewsPath = join(__dirname, '../views');
const partialsPath = join(__dirname, '../views/partials');


app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.get('/', (req: Request, res: Response) => {
    const dataPath = join(__dirname, '../data/data.json');
    fs.readFile(dataPath, 'utf-8', (err, jsonData) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error loading data');
        }
        const parsedData = JSON.parse(jsonData);
        res.render('index.hbs', parsedData);
    })
});

export default app;