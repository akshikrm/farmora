import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv"
dotenv.config()

const { json } = bodyParser

// import userRoutes from "#routes/userRoutes";
import authRoutes from "#routes/authRouter";
// import subscriptionRoutes from "#routes/subscriptionRouter";
// import configurationRoutes from "#routes/configurationRoutes";
import { connectDB } from '#utils/db';


const app = express();

app.use(json());
app.use(cors());


app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use("/api", subscriptionRoutes);
// app.use("/api/config", configurationRoutes);


app.get("/", (_, res) => {
	res.json({ message: "server is up and running", status: "ok" })
})


const PORT = process.env.PORT || 3000;

const startApp = async () => {
	await connectDB();
	// await Sequelize.sync({ force: true }); // Sync models with the database
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startApp();
