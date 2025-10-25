import dotenv from "dotenv"
dotenv.config()

const CONFIG = {
	db_name: process.env.DB_NAME,
	db_user: process.env.DB_USER,
	db_password: process.env.DB_PASS,
	db_host: process.env.DB_HOST,
	db_dialect: 'postgres',
	port: process.env.PORT || 3000
}

export default CONFIG
