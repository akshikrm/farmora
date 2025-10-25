const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
const userRoutes = require('./app/routes/userRoutes');
const authRoutes = require('./app/routes/authRouter');
const subscriptionRoutes = require("./app/routes/subscriptionRouter");
const configurationRoutes = require("./app/routes/configurationRoutes");
const { connectDB, sequelize } = require('./app/config/db');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api", subscriptionRoutes);
app.use("/api/config", configurationRoutes);

const PORT = process.env.PORT || 3000;

const startApp = async () => {
  await connectDB();
  await sequelize.sync({ force: true }); // Sync models with the database
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startApp();
