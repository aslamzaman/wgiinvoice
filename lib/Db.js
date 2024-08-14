import mongoose from "mongoose";

export const Connect = async () => {
	try {
		const MONGODB_URI = `${process.env.DATABASE_URL}`;
		const connection = await mongoose.connect(MONGODB_URI);
		console.log('MongoDB connected:', connection.connection.host);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}
