const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const booksRouter = require('./routes/books');
const errorHandler = require('./middlewares/errorHandler');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

// Conection with DB

mongoose.connect(process.env.MONGO_URL, {
    useNewParser: true,
    useUnifedTopology: true,
})

.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('Error connecting to MongoDB', err));

// Rutas bases
app.get('/', (req, res) => {
    res.send('Welcome to difital library');
});

// Initialize server
app.listen(PORT, () => {
    console.log('Server running at port:${PORT}');
});

// Rutas
app.use('/books', booksRouter);

// Manejo de errores
app.use(errorHandler);
