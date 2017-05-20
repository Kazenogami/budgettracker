import React, { Component } from 'react';
import './App.css';

class Account extends Component {
	
	constructor() {
		super();
		this.state = {
			value: 0.0,
			transactions: [0],
			amount: 0,
			category: "",
		};
		
		
			
		this.handleChange = this.handleChange.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
	}
	
	handleChange(event) {
		this.setState({amount: parseFloat(parseFloat(event.target.value).toFixed(2))});
	}
	
	changeCategory(event) {
		this.setState({category: event.target.value});
	}
	
	add() {
		var val = this.state.amount;
		var last = this.state.value;
		var totVal = last + val;
		totVal = parseFloat(totVal.toFixed(2));
		this.setState({value: totVal})
		this.state.transactions.push({amount: val, total: totVal, category: this.state.category})
		
		localStorage.setItem('settings', JSON.stringify(this.state));
	}
	
	sub() {
		var val = -this.state.amount;
		var last = this.state.value
		var totVal = last + val;
		totVal = parseFloat(totVal.toFixed(2));
		this.setState({value: totVal})
		this.state.transactions.push({amount: val, total: totVal, category: this.state.category})
		
		localStorage.setItem('settings', JSON.stringify(this.state));
	}
	
	clearData() {
		this.setState({
				value: 0.0,
				transactions: [],
				amount: 0,
				category: "",
			});
			
			localStorage.setItem('settings', JSON.stringify(this.state));
		}
	
	setSettings() {
			try {
				var obj = {};
				var settings = localStorage.getItem('settings');
				var result
				settings = JSON.parse(result);
				Object.assign(obj, settings);
				this.setState(obj);
			} catch(e){
				
			} finally {
				
			}
	}
	
	render() {
		return (
		<div>
		<div className="Manage">
		<p className="Balance">$ {this.state.value}</p>
			<table width="100%">
			<tbody>
				<tr>
					<td>Amount</td>
					<td>Category</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>
						<input type="numbers" onChange={this.handleChange} />
					</td>
					<td>
						<input type="text" id="category" onChange={this.changeCategory}  />
					</td>
					<td>
						<button className="AddValue" onClick={() => this.add()}>Add</button>
					</td>
					<td>
						<button className="SubValue" onClick={() => this.sub()}>Deduct</button>
					</td>
					<td>
						<button className="ClearData" onClick={() => this.clearData()}>Clear history</button>
					</td>
			  </tr>
			  </tbody>
		  </table>
		  </div>
		  <div className="Transactions">
				<p>Transactions</p>
				<table width='100%' id="t01">
				<tbody>
					<tr>
						<th>Category</th>
						<th>Amount</th>
						<th>Total</th>
					</tr>
					{this.state.transactions.map((event) => {
						var col = event.amount > 0 ? 'black' : 'red';
						return (
							<tr key={event} style={{color : col}}>
								<td>{event.category}</td>
								<td>{event.amount}</td>
								<td>{event.total}</td>
							</tr>
					);})}
					</tbody>
				</table>
		  </div>
		  </div>
		);
	}
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>Account Balance</p>
          <Account />
		  
        </div>
      </div>
    );
  }
}

export default App;
