#Simple Wizard Component

A React component to create a setup wizard that passes the state from one step to the next. Any validation should be done by the step components, the Wizard just facilitates the data flow.

####props

`steps` - an array of components. Each step 
`save` - a function to call when the wizard is complete.
`cancel` - a function to call to exit the wizard.

##Usage

```javascript
const YourWizard = React.createClass({
  render: function() {
    return (
      <Wizard steps={steps} save={() => {/*...*/}} cancel={() => {/*...*/}} />
    );
  }
});
```

##Step Components

Step components can be whatever you want them to be. They receive `startData` and `endData` objects in their `props` which reflects the current state of the wizard, and return the successive state when their next function is called.

####props

`startData` - the current state of the wizard as a result of the previous step.
`endData` - the data returned by the component. This is useful for re-populating the step when travelling backwards.
`previous` - return to the previous step
`next` - proceed to the next step (or call the save Wizard's finish function for the last step)

It doesn't make sense for the first step to have a previous button since nothing exists before the first step. The wizard will pass `previous=undefined` for the first step, and it is up to you to render the step to show this (either by disabling the previous button or by not rendering it at all).

While a step is considered incomplete, it is a good idea to leave the `next` button disabled. It is useful for a step component to keep a `completed` or `finished` property about itself to determine whether or not the `next` button should be disabled.

The `startData` passed to a step is all that it knows about the results of previous steps. The value passed to the next function should always be an object. It is up to you to pass on all data that will be relevant to future steps.


##Step Example

```javascript
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
```
