import { Api } from '../api';

export class DealActions {

	static checkEmail(email) {
		return new Promise((resolve, reject) => {
			Api.checkEmail(email)
				.then((response) => {
					if (response.is_valid) {
						resolve();
					} else {
						reject();
					}
				})
				.catch(reject);
		});
	}

	static createWithNewPerson(email, person) {
		return Api.createWithNewPerson({ email, person });
	}

	static createWithExistPerson(email, personId) {
		return Api.createWithExistPerson({
			person_id: personId,
			email
		});
	}

}