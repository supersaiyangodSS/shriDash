import livereload from 'livereload';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = livereload.createServer({
  exts: ['hbs', 'js', 'css', 'ts'],
  delay: 100
});

server.watch(__dirname + '/views'); // adjust path if your .hbs folder is elsewhere
