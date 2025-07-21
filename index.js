const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const mongo_uri = process.env.MONGO_URI;

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const Count = require('./models/Count.js');
const Visitor = require('./models/Visitor');

// Middleware
app.use(cors({
	origin: 'https://happytatoes.github.io'
}));
app.use(express.json());
app.use('/', router);

// Mongoose connection establish
mongoose.connect(mongo_uri)
  .then(() => {
    console.log('MongoDB connected');
 })
  .catch(err => {
    console.error('MongoDB connection error:', err);
});

// Get current count
router.get('/count', async (req, res) => {
	try {
		let doc = await Count.findOne();
		if (!doc) {
			doc = await Count.create({ value: 0 });
		}
		res.json({ count: doc.value });
	} catch (err) {
		res.status(500).json({ error: 'Error fetching count' });
	}
});

// Increment count
router.post('/increment', async (req, res) => {
	try {
		let doc = await Count.findOne();
		if (!doc) {
			doc = await Count.create({ value: 1 });
		} else {
			doc.value += 1;
			await doc.save();
		}
		res.json({ count: doc.value });
	} catch (err) {
		console.error('Increment Error:', err);
		res.status(500).json({ error: 'Error incrementing count' });
	}
});

// Get visitor count
router.get('/visitors', async (req, res) => {
	try {
		let visitorDoc = await Visitor.findOne();
		if (!visitorDoc) {
			visitorDoc = await Visitor.create({ value: 0 });
		}
		res.json({ visitors: visitorDoc.value });
	} catch (err) {
		res.status(500).json({ error: 'Error fetching visitor count' });
	}
});


// Increment visitor count
router.post('/addvisitor', async (req, res) => {
	try {
		let visitorDoc = await Visitor.findOne();
		if (!visitorDoc) {
			visitorDoc = await Visitor.create({ value: 1 });
		} else {
			visitorDoc.value += 1;
			await visitorDoc.save();
		}
		res.json({ visits: visitorDoc.value });
	} catch (err) {
		res.status(500).json({ error: 'Error incrementing visitor count' });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = router;