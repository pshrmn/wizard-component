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
    initialData: React.PropTypes.object.isRequired,
    steps: React.PropTypes.array.isRequired,
    save: React.PropTypes.func,
    cancel: React.PropTypes.func
  },
  getInitialState: function() {
    const { initialData, steps } = this.props;
    return {
      position: 0,
      data: [initialData].concat(Array(steps.length))
    };
  },
  next: function(newData) {
    const { position, data } = this.state;
    const { steps } = this.props;
    const maxPos = steps.length - 1;
    // don't let the position become greater than the number of steps
    // (0 normalized)
    const nextPos = position === maxPos ? position : position + 1;
    data[nextPos] = newData;
    this.setState({
      position: nextPos,
      data: data
    });
  },
  previous: function() {
    const { position, data } = this.state;
    this.setState({
      position: position > 0 ? position - 1 : 0
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
    // don't pass a previous function to the first step
    const prevStep = position === 0 ? undefined : this.previous;
    // on the last step, call the finish function, otherwise call the next function
    const completeStep = position === steps.length - 1 ? this.finish : this.next;
    return (
      <div className='wizard'>
        <ProgressBar steps={steps.length} position={position} />
        <CurrentStep startData={data[position]}
                     endData={data[position+1]}
                     cancel={this.cancel}
                     next={completeStep}
                     previous={prevStep} />
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
        'marker',
        i < position ? 'complete' : null,
        i == position ? 'active' : null
      ];
      return <div key={i} className={classes.join(' ') }></div>
    });
    return (
      <div className='progress-bar'>
        {dots}
      </div>
    );
  }
});

export default Wizard;
