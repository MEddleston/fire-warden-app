const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fireWardenRoutes = require('./routes/fireWardenRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/fire-wardens', fireWardenRoutes);

app.get('/', (req, res) => {
    res.send("Fire Warden App Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
