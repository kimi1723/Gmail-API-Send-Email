const fs = require('fs');
const path = require('path');
const sendMail = require('./gmail');
const express = require('express');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
require('dotenv').config();

const app = express();
const port = 8080;

app.use(express.static('./'));
app.use(express.json());

//  GET
// app.get('/info', (req, res) => {
// 	res.status(200).json({ info: 'preset tekst' });

// });

// POST
app.post('/', (req, res) => {
	const { name, surname } = req.body;

	if (name.length < 3 || !surname) {
		return res.status(400).send({ status: 'failed' });
	}

	res.status(200).send({ status: 'received' });

	const main = async e => {
		const options = {
			to: 'hacks@onet.pl',
			cc: 'bertillo@mordo.pl',
			replyTo: 'bertillo@mordo.pl',
			subject: 'Hello bertillo@mordo.pl 🚀',
			text: 'This email is sent from the command line',
			html: `Imie: ${name}, <br>
			Nazwisko: ${surname}`,

			textEncoding: 'base64',
			headers: [
				{ key: 'X-Application-Developer', value: 'Amit Agarwal' },
				{ key: 'X-Application-Version', value: 'v1.0.0.2' },
			],
		};

		const messageId = await sendMail(options);
		return messageId;
	};

	main()
		.then(messageId => console.log('Message sent successfully:', messageId))
		.catch(err => console.error(err));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
