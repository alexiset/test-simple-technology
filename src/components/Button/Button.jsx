import React, { Component } from 'react';
import classNames from 'classnames';
import * as s from './Button.scss';

export class Button extends Component {

	render() {
		const { className, isDisable, onClick } = this.props;
		const buttonClassName = classNames(s.block, className, {
			[s.disabled]: isDisable
		});

		return (
			<button className={buttonClassName} onClick={onClick} disabled={isDisable}>{this.props.children}</button>
		);
	}

}