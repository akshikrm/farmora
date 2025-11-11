import CONFIG from "./config.js"

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from "#routes/auth.router";
import userRoutes from "#routes/user.router";
import packageRoutes from "#routes/package.router";
import configurationRoutes from "#routes/configuration.router";
import subscriptionRouter from '#routes/subscription.router';
import farmsRouter from '#routes/farm.router';
import seasonRouter from '#routes/season.router';

import responseHandler from '#middlewares/response.middleware';
import globalErrorHandler from '#middlewares/error.middleware';

import { connectDB, } from '#utils/db';

const app = express();

const { json } = bodyParser

app.use(json());
app.use(cors());

app.use(responseHandler)

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/farms', farmsRouter);
app.use("/api/config", configurationRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/seasons", seasonRouter);
app.use("/api/subscriptions", subscriptionRouter);

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
