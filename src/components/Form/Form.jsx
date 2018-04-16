import React, { Component } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import * as s from './Form.scss';

export class Form extends Component {

	static defaultProps = {
		isShowSave: true
	};

	state = {
		isDisable: false,
		birthday: '',
		correctFirstName: '',
		correctLastName: '',
		correctSecondName: '',
		isShowLastNameError: false,
		isShowFirstNameError: false,
		isShowSecondNameError: false,
		isShowDateError: false
	};

	componentDidMount() {
		if (this.props.onMount) {
			this.props.onMount({
				onSubmit: this.onSubmitClick
			});
		}

		if (this.props.onDisableChange) {
			this.props.onDisableChange(true);
		}

		this.onChange(this.state);
	}

	componentWillUpdate(nextProps, nexState) {
		if (nexState.isDisable !== this.state.isDisable && this.props.onDisableChange) {
			this.props.onDisableChange(nexState.isDisable);

			if (!nexState.isDisable && this.props.onPersonChange) {
				this.props.onPersonChange({
					birthday: nexState.birthday,
					lastName: nexState.correctLastName,
					name: nexState.correctFirstName,
					secondName: nexState.correctSecondName
				});
			}
		}
	}

	onLastNameChange = (event) => {
		const newState = {
			correctLastName: this.getCorrectName(event),
			isShowLastNameError: false
		};

		this.setState(newState);
		this.onChange(Object.assign({}, this.state, newState));
	};

	onFirstNameChange = (event) => {
		const newState = {
			correctFirstName: this.getCorrectName(event),
			isShowFirstNameError: false
		};

		this.setState(newState);
		this.onChange(Object.assign({}, this.state, newState));
	};

	onSecondNameChange = (event) => {
		const newState = {
			correctSecondName: this.getCorrectName(event),
			isShowSecondNameError: false
		};

		this.setState(newState);
		this.onChange(Object.assign({}, this.state, newState));
	};

	onBirthdayChange = (event) => {
		const newState = {
			birthday: event.target.value.trim(),
			isShowDateError: false
		};

		this.setState(newState);
		this.onChange(Object.assign({}, this.state, newState));
	};

	onChange(state) {
		const {
			birthday,
			correctFirstName,
			correctLastName,
			correctSecondName,
			isShowLastNameError,
			isShowFirstNameError,
			isShowSecondNameError,
			isShowDateError
		} = state;
		const isFieldsNotEmpty = birthday.length && correctFirstName.length && correctLastName.length && correctSecondName.length;

		this.setState({
			isDisable: isShowLastNameError || isShowFirstNameError || isShowSecondNameError || isShowDateError || !isFieldsNotEmpty
		});
	}

	getCorrectName(event) {
		const name = event.target.value
			.trim()
			.replace(/[^А-Яа-яёЁ]/g, '');

		return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
	}

	onSubmitClick = (event) => {
		event.preventDefault();

		const isValidDate = this.validationDate(this.state.birthday);
		const isValidFirstName = this.isValidNameStr(this.state.correctFirstName);
		const isValidLastName = this.isValidNameStr(this.state.correctLastName);
		const isValidSecondName = this.isValidNameStr(this.state.correctSecondName);
		const isValid = isValidDate && isValidFirstName && isValidLastName && isValidSecondName;

		this.setState({
			isShowDateError: !isValidDate,
			isShowFirstNameError: !isValidFirstName,
			isShowLastNameError: !isValidLastName,
			isShowSecondNameError: !isValidSecondName
		});

		if (this.props.onSubmit) {
			this.props.onSubmit(isValid, {
				birthday: this.state.birthday,
				lastName: this.state.correctLastName,
				name: this.state.correctFirstName,
				secondName: this.state.correctSecondName
			});
		}

		return isValid;
	};

	validationDate(date) {
		return /^(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}$/.test(date) && this.getAge(date) > 6
	}

	getAge(dateStr) {
		const arDate = dateStr.split('.');
		const date = new Date(Number(arDate[2]), Number(arDate[1]) - 1, Number(arDate[0]));
		const ageDifMs = Date.now() - date.getTime();
		const ageDate = new Date(ageDifMs);

		return ageDate.getUTCFullYear() - 1970;
	}

	isValidNameStr(name) {
		return (name && name.length > 2);
	}

	render() {
		const { isShowSave } = this.props;
		const {
			isDisable,
			correctFirstName,
			correctLastName,
			correctSecondName,
			isShowLastNameError,
			isShowFirstNameError,
			isShowSecondNameError,
			isShowDateError
		} = this.state;

		return (
			<div className={s.block}>
				<hr />

				<form>
					<fieldset className={s.fields}>
						<legend>Добавление физ лица</legend>
						<dl>
							<dt>Фамилия</dt>
							<dd>
								<Input className={s.input} onChange={this.onLastNameChange} value={correctLastName} />
								{isShowLastNameError && <span>x</span>}
							</dd>
						</dl>

						<dl>
							<dt>Имя</dt>
							<dd>
								<Input className={s.input} onChange={this.onFirstNameChange} value={correctFirstName} />
								{isShowFirstNameError && <span>x</span>}
							</dd>
						</dl>
						<dl>
							<dt>Отчество</dt>
							<dd>
								<Input className={s.input} onChange={this.onSecondNameChange} value={correctSecondName} />
								{isShowSecondNameError && <span>x</span>}
							</dd>
						</dl>

						<dl className={s.date}>
							<dt>Дата рождения</dt>
							<dd>
								<Input className={s.input} onChange={this.onBirthdayChange} value={this.state.birthday} />
								{isShowDateError&& <span>x</span>}
							</dd>
						</dl>

						{isShowSave && <Button isDisable={isDisable} onClick={this.onSubmitClick}>Сохранить</Button>}
					</fieldset>
				</form>
			</div>
		);
	}
}