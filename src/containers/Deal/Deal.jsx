import React, { Component } from 'react';
import classNames from 'classnames';
import { Form } from '../../components/Form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import * as s from './Deal.scss';
import { DealActions } from '../../actions/dealActions';

export class Deal extends Component {

	state = {
		personList: [
			{ id: 1, name: 'Физ Лицо 1' },
			{ id: 2, name: 'Физ Лицо 2' },
		],
		isShowAddPerson: false,
		isShowEmailError: false,
		personId: 1,
		isSuccess: false,
		isValidEmail: false
	};

	onAddPersonMount = (options) => {
		if (options.onSubmit) {
			this.onAddPersonSubmit = options.onSubmit;
		}
	};

	onAddPersonFormSubmit() {
		const { email, isDisableByAddPerson, addPerson } = this.state;

		this.setState({ isSuccess: false });

		this.isValidEmail(email)
			.then(() => {
				if (!isDisableByAddPerson) {
					DealActions.createWithNewPerson(email, addPerson)
						.then(() => this.setState({ isSuccess: true }));
				}
			})
			.catch(() => {
				this.setState({ isShowEmailError: true });
			});
	}

	onAddPersonChange = (person) => {
		this.setState({
			addPerson: person
		});
	};

	onAddPersonDisableChange = (isDisable) => {
		this.setState({
			isDisableByAddPerson: isDisable
		});
	};

	showAddPerson = () => {
		this.setState({
			isShowAddPerson: true
		});
	};

	onEmailChange = (event) => {
		const email = event.target.value.trim();

		this.setState({
			email,
			isShowEmailError: false
		});

		this.isValidEmail(email);
	};

	onSubmit = (event) => {
		const { isShowAddPerson, email, personId } = this.state;

		if (isShowAddPerson) {
			if (this.onAddPersonSubmit && this.onAddPersonSubmit(event)) {
				this.onAddPersonFormSubmit();
			}
		} else {
			this.setState({ isSuccess: false });

			this.isValidEmail(email)
				.then(() => {
					DealActions.createWithExistPerson(email, personId)
						.then(() => this.setState({ isSuccess: true }));
				})
				.catch(() => {
					this.setState({ isShowEmailError: true });
				});
		}
	};

	onPersonIdChange = (event) => {
		this.setState({ personId: event.target.value });
	};

	isValidEmail(email) {
		return new Promise((resolve, reject) => {
			if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)) {
				this.setState({ isValidEmail: false });
				reject();
			} else {
				DealActions.checkEmail(email)
					.then(() => {
						this.setState({ isValidEmail: true });
						resolve();
					})
					.catch(reject);
			}
		});
	}

	render() {
		const { personList, isValidEmail, isSuccess, isShowEmailError, isShowAddPerson, isDisableByAddPerson } = this.state;
		const isDisable = !isValidEmail || isShowAddPerson && isDisableByAddPerson;
		const savedClassName = classNames(s.saved, {
			[s.saved_show]: isSuccess
		});

		return (
			<div>
				<h1>Сделка</h1>
				<hr />
				<fieldset className={s.fields}>
					<dl className={s.fieldsRow}>
						<dt className={s.fieldsTitle}>контрагент</dt>
						<dd className={s.fieldsValue}>
							<Input onChange={this.onEmailChange}/>
							{isShowEmailError && <span>x</span>}
						</dd>
					</dl>

					<dl className={s.fieldsRow}>
						<div className={s.person}>
							<div className={s.personList}>
								<select className={s.personSelect} onChange={this.onPersonIdChange}>
									{personList.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
								</select>

								<Button onClick={this.showAddPerson}>Добавить</Button>
							</div>

							{isShowAddPerson &&
								<div className={s.personForm}>
									<Form
										isShowSave={false}
										isDisable={isDisable}
										onPersonChange={this.onAddPersonChange}
										onDisableChange={this.onAddPersonDisableChange}
										onMount={this.onAddPersonMount}
									/>
								</div>
							}

							<div className={s.personSave}>
								<Button isDisable={isDisable} onClick={this.onSubmit}>Сохранить</Button>
							</div>
						</div>
					</dl>
				</fieldset>

				<div className={savedClassName}>Сохранено</div>
			</div>
		)
	}
}