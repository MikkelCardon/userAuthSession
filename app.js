import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import { readFileSync } from 'fs';


const app = express();
const PORT = 8080;

const users = JSON.parse(readFileSync('./users.json', 'utf8'));

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    console.log("login attempt");
    
    const {username, password} = req.body
    console.log(username, password);
    

    console.log("users: ", users);
    
    const user = users.users.find(u => u.username === username && u.password === password)

    if(user){
        req.session.user = username
        res.status(200).json({ success: true })
    } else {
        res.status(400).json({ success: false, message: "No match" })
    }
});

app.get('/', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log('SERVER IS RUNNING ON PORT', PORT);
});
