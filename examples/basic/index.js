import React from 'react';
import ReadDOM from 'react-dom';
import Wizard from '../../lib/index';

const FirstStep = React.createClass({
  getInitialState: function() {
    return {
      name: ''
    };
  },
  handleSubmit: function(event) {
    event.preventDefault();
    this.props.next({
      name: this.state.name
    });
  },
  handleName: function(event) {
    this.setState({
      name: event.target.value
    });
  },
  render: function() {
    const { data, previous } = this.props;
    return (
      <div>
        <label>
          Name: <input onChange={this.handleName} value={this.state.name} />
        </label>
        <p>
          <button onClick={() => previous()}>Previous</button>
          <button onClick={this.handleSubmit}>Next</button>
        </p>
      </div>
    );
  }
});

const SecondStep = React.createClass({
  getInitialState: function() {
    return {
      age: 0
    };
  },
  handleSubmit: function(event) {
    event.preventDefault();
    const { data, next } = this.props;
    // merge the data with data from previous step
    const fullData = Object.assign({}, data, {
      age: this.state.age
    });
    this.props.next(fullData);
  },
  handleAge: function(event) {
    this.setState({
      age: parseInt(event.target.value, 10)
    });
  },
  render: function() {
    const { data, previous } = this.props;
    return (
      <div>
        <label>
          Age: <input onChange={this.handleAge} type="number" value={this.state.age} />
        </label>
        <p>
          <button onClick={() => previous()}>Previous</button>
          <button onClick={this.handleSubmit}>Next</button>
        </p>
      </div>
    );
  }
});

const VerifyStep = React.createClass({
  handleSubmit: function() {
    const { next, data } = this.props;
    this.props.next(data);
  },
  render: function() {
    const { data, previous } = this.props;
    const { name, age } = data;
    return (
      <div>
        <p>
          Is this data correct?
        </p>
        <p>
          Name: {name}
        </p>
        <p>
          Age: {age}
        </p>
        <p>
          <button onClick={() => previous()}>Previous</button>
          <button onClick={this.handleSubmit}>Submit</button>
        </p>
      </div>
    );
  }
});

const BasicWizard = React.createClass({
  save: function(data) {
    console.log('saved', data);
  },
  cancel: function() {
    console.log('cancelled');
  },
  render: function() {
    const steps = [FirstStep, SecondStep, VerifyStep];
    return <Wizard steps={steps} save={this.save} cancel={this.cancel} />
  }
});

ReactDOM.render(
  <BasicWizard />,
  document.getElementById('app')
);