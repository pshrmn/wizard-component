import React from 'react';

/*
 * A Wizard walks through multiple steps to get to a desired state.
 * Each step is a form that has three buttons: next, previous, and cancel.
 * The next button will cause the wizard to proceed to the next step, the
 * previous button will revert to the previous step, and the cancel button
 * will exit the wizard. If the current step is the last step, the next button
 * will function as the finish button, passing the function the completed
 * state of the wizard.
 *
 * props -
 *   steps - an array of steps that need to be completed to finish the wizard
 *   save - a function to call once all steps have been completed
 *   cancel - a function to call to immediately exit the wizard
 * state - the wizard maintains two pieces of state:
 *   position - which step it is currently on
 *   data - an array of datum, one for each step
 */
const Wizard = React.createClass({
  propTypes: {
    steps: React.PropTypes.array.isRequired,
    save: React.PropTypes.func,
    cancel: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      position: 0,
      data: []
    };
  },
  next: function(newData) {
    const { position, data } = this.state;
    this.setState({
      position: position + 1,
      data: data.concat([newData])
    });
  },
  previous: function() {
    const { position, data } = this.state;
    this.setState({
      position: position - 1,
      // throw away any data for subsequent steps
      data: data.slice(0, position)
    });
  },
  cancel: function(event) {
    event.preventDefault();
    this.props.cancel();
  },
  finish: function(data) {
    this.props.save(data);
  },
  render: function() {
    const { position, data } = this.state;
    const { steps } = this.props;
    const CurrentStep = steps[position];
    // current data is the data returned by the previous step
    const currentData = data[position-1] || {};
    // on the last step, call the finish function, otherwise call the next function
    const completeStep = position === steps.length - 1 ? this.finish : this.next;
    return (
      <div className='wizard'>
        <ProgressBar steps={steps.length} position={position} />
        <CurrentStep data={currentData}
                     cancel={this.cancel}
                     next={completeStep}
                     previous={this.previous} />
        <button onClick={this.cancel}>Cancel</button>
      </div>
    );
  }
});

/*
 * Visual progression through the steps
 */
const ProgressBar = React.createClass({
  render: function() {
    const { steps, position } = this.props;
    const dots = Array.from(Array(steps)).map((s, i) => {
      const classes = [
        'step',
        i < position ? 'complete' : null,
        i == position ? 'active' : null
      ];
      return <li key={i} className={classes.join(' ') }></li>
    });
    return (
      <ul className='progress-bar'>
        {dots}
      </ul>
    );
  }
});

export default Wizard;
