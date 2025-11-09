import jwt from 'jsonwebtoken';
import users from '#models/user';

const { verify } = jwt

const SECRET_KEY = process.env.JWT_SECRET || 'E77BDE77EAFD388AF54979EE26B4D';

export async function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

	if (!token) return res.status(401).json({ error: 'Token missing' });

	try {
		const decoded = verify(token, SECRET_KEY);
		req.user = await users.findByPk(decoded.id);
		if (!req.user) return res.status(404).json({ error: 'User not found' });
		next();
	} catch (error) {
		console.error('authenticateToken error', error);
		res.status(403).json({ error: 'Invalid token' });
	}
}

export async function verifyAdmin(req, res, next) {
	await authenticateToken(req, res, async () => {
		if (!req.user || req.user.user_type != 1) {
			return res.status(403).json({ error: "Access denied. Admins only." });
		}
		next();
	});
}
