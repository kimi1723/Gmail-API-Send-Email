const inputText = document.querySelector('.input');
const surnameText = document.querySelector('.input2');
const submitBtn = document.querySelector('.sub');

const baseUrl = 'http://localhost:8080/';

// GET

// const passEmailText = async e => {
// 	e.preventDefault();

// 	const res = await fetch(baseUrl, {
// 		method: 'GET',
// 	});

// 	console.log(res);

// 	const data = await res.json();
// 	console.log(data);
// };

// POST

const passEmailText = async e => {
	e.preventDefault();

	if (inputText.value == '') {
		console.log('err');
		return;
	}

	const res = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: inputText.value,
			surname: surnameText.value,
		}),
	});

	console.log(res);

	const data = await res.json();
	console.log(data);
};

submitBtn.addEventListener('click', passEmailText);

