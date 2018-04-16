import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { AddPerson } from './containers/AddPerson';
import { Deal } from './containers/Deal';

export class App extends Component {

	render() {
		return (
			<Router>
				<Switch>
					<Route path="/deal.html" component={Deal}></Route>
					<Route path="/add-person.html" component={AddPerson}></Route>
				</Switch>
			</Router>
		);
	}

}