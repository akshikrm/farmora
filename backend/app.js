import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import CONFIG from "./config.js"

const { json } = bodyParser

import authRoutes from "#routes/authRouter";
import subscriptionRoutes from "#routes/subscriptionRouter";
import configurationRoutes from "#routes/configurationRoutes";
import { connectDB, } from '#utils/db';
import errorHandler from '#middlewares/error-handler';


const app = express();

app.use(json());
app.use(cors());

app.use(errorHandler)

app.use('/api/auth', authRoutes);
app.use("/api", subscriptionRoutes);
app.use("/api/config", configurationRoutes);

app.get("/", (_, res) => {
	res.json({ message: "server is up and running", status: "ok" })
})

app.use((err, _, res, next) => { res.error(err) })

const PORT = CONFIG.port;

const startApp = async () => {
	await connectDB();
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startApp();
