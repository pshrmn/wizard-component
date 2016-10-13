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
 *   initialData - an object with data that should be available to the first step
 *   staticData - data that is useful to all steps
 *   steps - an array of steps that need to be completed to finish the wizard
 *   save - a function to call once all steps have been completed
 *   cancel - a function to call to immediately exit the wizard
 *   children - any child elements will be passed to the step, which needs to
 *       handle rendering them
 * state - the wizard maintains two pieces of state:
 *   position - which step it is currently on
 *   data - an array of datum, one for each step
 */
class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      data: [props.initialData].concat(Array(props.steps.length))
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.cancel = this.cancel.bind(this);
    this.finish = this.finish.bind(this);
  }

  next(newData) {
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
  }

  previous() {
    const { position, data } = this.state;
    this.setState({
      position: position > 0 ? position - 1 : 0
    });
  }

  cancel() {
    this.props.cancel();
  }

  finish(data) {
    this.props.save(data);
  }

  render() {
    const { position, data } = this.state;
    const { steps, staticData, children } = this.props;
    const CurrentStep = steps[position];
    // don't pass a previous function to the first step
    const prevStep = position === 0 ? undefined : this.previous;
    // on the last step, call the finish function, otherwise call the next function
    const completeStep = position === steps.length - 1 ? this.finish : this.next;
    return (
      <div className='wizard'>
        <ProgressBar
          steps={steps.length}
          position={position} />
        <CurrentStep
          startData={data[position]}
          endData={data[position+1]}
          staticData={staticData}
          cancel={this.cancel}
          next={completeStep}
          previous={prevStep} />
      </div>
    );
  }
}

Wizard.propTypes = {
  initialData: React.PropTypes.object.isRequired,
  steps: React.PropTypes.array.isRequired,
  staticData: React.PropTypes.object,
  save: React.PropTypes.func,
  cancel: React.PropTypes.func
};

/*
 * Visual progression through the steps
 */
const ProgressBar = ({steps, position}) => (
  <div className='progress-bar'>
    {
      Array.from(Array(steps)).map((s, i) => (
        <div
          key={i}
          className={[
            'marker',
            i < position ? 'complete' : null,
            i == position ? 'active' : null
          ].filter(c => c !== null).join(' ').trim()}>
        </div>
      ))
    }
  </div>
);

export default Wizard;
