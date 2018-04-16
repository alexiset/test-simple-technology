import { Api} from '../api';

export class PersonActions {

	static create(person) {
		return Api.createPerson(person);
	}

}