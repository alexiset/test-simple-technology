export class Api {

	static checkEmail(email) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();

			req.open('GET', `/fake-api/mail_checking.json?email=${email}`, true);
			req.send();

			req.onreadystatechange = () => {
				if (req.readyState === 4) {
					if (req.status === 200) {
						resolve(JSON.parse(req.responseText));
					} else {
						reject();
					}
				}
			};
		});
	}

	static createWithNewPerson(params) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			const data = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

			req.open('GET', `/fake-api/deals/create_with_new_person.json?${data}`, true);
			req.send();

			req.onreadystatechange = () => {
				if (req.readyState === 4) {
					if (req.status === 200) {
						resolve(JSON.parse(req.responseText));
					} else {
						reject();
					}
				}
			};
		});
	}

	static createWithExistPerson(params) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			const data = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

			req.open('GET', `/fake-api/deals/create_with_exist_person.json?${data}`, true);
			req.send();

			req.onreadystatechange = () => {
				if (req.readyState === 4) {
					if (req.status === 200) {
						resolve(JSON.parse(req.responseText));
					} else {
						reject();
					}
				}
			};
		});
	}

	static createPerson(params) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			const data = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

			req.open('GET', `/fake-api/create_person.json?${data}`, true);
			req.send();

			req.onreadystatechange = () => {
				if (req.readyState === 4) {
					if (req.status === 200) {
						resolve(JSON.parse(req.responseText));
					} else {
						reject();
					}
				}
			};
		});
	}

}