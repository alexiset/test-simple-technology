import React, { Component } from 'react';
import classNames from 'classnames';
import * as s from './Input.scss';

export class Input extends Component {

	render() {
		const { className, onChange, value } = this.props;
		const inputClassName = classNames(s.block, className);

		return (
			<input type="text" className={inputClassName} onChange={onChange} value={value}/>
		)
	}

}