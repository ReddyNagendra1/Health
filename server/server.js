require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

const uri = process.env.MONGODB_URL;
console.log("MongoDB URL:", uri);

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
        process.exit(1);
    }
}

connectToDatabase();

// Define your routes here
// For example:
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});