import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import CONFIG from "./config.js"

const { json } = bodyParser

import authRoutes from "#routes/authRouter";
import packageRoutes from "#routes/packageRouter";
import configurationRoutes from "#routes/configurationRoutes";
import { connectDB, } from '#utils/db';
import responseHandler from '#middlewares/response-handler';
import subscriptionRouter from '#routes/subscriptionRouter';
import globalErrorHandler from '#middlewares/error-handler';


const app = express();

app.use(json());
app.use(cors());

app.use(responseHandler)

app.use('/api/auth', authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/config", configurationRoutes);

app.get("/", (_, res) => {
	res.json({ message: "server is up and running", status: "ok" })
})


app.use(globalErrorHandler)

const PORT = CONFIG.port;

const startApp = async () => {
	await connectDB();
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startApp();
