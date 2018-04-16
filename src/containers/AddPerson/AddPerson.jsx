import React, { Component } from 'react';
import { PersonActions } from '../../actions/personActions';
import { Form } from '../../components/Form';
import * as s from './AddPerson.scss';

export class AddPerson extends Component {

	state = {
		isSuccess: false
	};

	onAddPersonSubmit = (isValid, person) => {
		this.setState({ isSuccess: false });

		if (isValid) {
			PersonActions.create(person)
				.then(() => this.setState({ isSuccess: true }));
		}
	};

	render() {
		return (
			<div className={s.block}>
				<h1>Добавление физ лица</h1>
				<Form onSubmit={this.onAddPersonSubmit}  />

				{this.state.isSuccess && <div className={s.saved}>Сохранено</div>}
			</div>
		);
	}
}