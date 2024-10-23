const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');
const TestResult = require('./models/TestResult');
const path = require('path');  // เพิ่มบรรทัดนี้
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // ใช้ path

// Routes
app.use('/auth', authRoutes);
app.use('/test', testRoutes);

// Dashboard Page
app.get('/dashboard', async (req, res) => {
    const results = await TestResult.findAll();
    const user = req.session.user;
    res.render('dashboard', { results, user });
});

// Home Page
app.get('/', async (req, res) => {
    const results = await TestResult.findAll();
    const user = req.session.user;
    res.render('index', { results, user });
});

// Add this line in your app.js to create the route '/register'
app.get('/register', (req, res) => {
    res.redirect('/auth/register');
});

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
