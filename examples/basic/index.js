import React from 'react';
import ReadDOM from 'react-dom';
import Wizard from '../../lib/index';

const NameComponent = React.createClass({
  getInitialState: function() {
    const { endData = {}} = this.props;
    const { name = ''} = endData;
    return {
      completed: name !== '',
      name: name
    };
  },
  nextHandler: function(event) {
    const { completed, name } = this.state;
    if ( !completed ) {
      return;
    }
    const { startData } = this.props;
    this.props.next(Object.assign({}, startData, {name}));
  },
  handleName: function(event) {
    this.setState({
      name: event.target.value,
      completed: event.target.value !== ""
    });
  },
  renderButtons: function() {
    const { next, previous, cancel } = this.props;
    const { completed } = this.state;
    return (
      <div className='step-controls'>
        { previous !== undefined ? <button onClick={previous}>Previous</button> : null}
        <button onClick={this.nextHandler} disabled={!completed} >Next</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    );
  },
  render: function() {
    return (
      <div className='step'>
        <p>
          <label>
            Name: <input value={this.state.name} onChange={this.handleName} />
          </label>
        </p>
        { this.renderButtons() }
      </div>
    );
  }
});

const AgeComponent = React.createClass({
  getInitialState: function() {
    const { endData = {}} = this.props;
    const { age = ''} = endData;
    return {
      completed: age !== '',
      age: age
    };
  },
  nextHandler: function(event) {
    const { completed, age } = this.state;
    if ( !completed ) {
      return;
    }
    const { startData } = this.props;
    this.props.next(Object.assign({}, startData, {age}));
  },
  handleAge: function(event) {
    this.setState({
      age: Math.max(parseInt(event.target.value, 10), 0),
      completed: event.target.value !== ""
    });
  },
  renderButtons: function() {
    const { next, previous, cancel } = this.props;
    const { completed } = this.state;
    return (
      <div className='step-controls'>
        { previous !== undefined ? <button onClick={previous}>Previous</button> : null}
        <button onClick={this.nextHandler} disabled={!completed} >Next</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    );
  },
  render: function() {
    return (
      <div className='step'>
        <p>
          <label>
            Age: <input type='number' value={this.state.age} onChange={this.handleAge} />
          </label>
        </p>
        { this.renderButtons() }
      </div>
    );
  }
});

const VerifyStep = React.createClass({
  handleSubmit: function() {
    const { next, startData } = this.props;
    this.props.next(startData);
  },
  render: function() {
    const { startData, previous, cancel } = this.props;
    const { name, age } = startData;
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
          <button onClick={cancel}>Cancel</button>
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
    const steps = [NameComponent, AgeComponent, VerifyStep];
    return <Wizard steps={steps} save={this.save} cancel={this.cancel} initialData={{}}/>
  }
});

ReactDOM.render(
  <BasicWizard />,
  document.getElementById('app')
);