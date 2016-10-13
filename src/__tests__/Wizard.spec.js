import React from 'react';
import renderer from 'react-test-renderer';
import Wizard from '../index';

class Step extends React.Component {

  render() {
    return (
      <div>
        {this.props.text}
        <button onClick={this.props.previous}>Previous</button>
        <button onClick={this.props.next}>Next</button>
        <button onClick={this.props.cancel}>Cancel</button>
      </div>
    );
  }
}

const steps = [
  props => <Step text='first' {...props} />,
  props => <Step text='second' {...props} />,
  props => <Step text='last' {...props} />
]

it('renders a Wizard with steps and initialData props', () => {
  const Component = renderer.create(
    <Wizard
      steps={steps}
      initialData={{}} />
  );
  const tree = Component.toJSON();
});

it('goes to the next step when the next button is clicked', () => {
  const Component = renderer.create(
    <Wizard
      steps={steps}
      initialData={{}} />
  );
  let tree = Component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[1].children[0]).toBe('first');

  const Step = tree.children[1];
  const Next = Step.children[2];
  Next.props.onClick()
  tree = Component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[1].children[0]).toBe('second');
});

it('goes to the previous step when the previous button is clicked', () => {
  const Component = renderer.create(
    <Wizard
      steps={steps}
      initialData={{}} />
  );
  let tree = Component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[1].children[0]).toBe('first');

  let Step = tree.children[1];
  const Next = Step.children[2];
  Next.props.onClick()
  tree = Component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[1].children[0]).toBe('second');

  Step = tree.children[1];
  const Previous = Step.children[1];
  Previous.props.onClick()
  tree = Component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[1].children[0]).toBe('first');
})

it('doesn\'t add a previous function to first step', () => {
  const Component = renderer.create(
    <Wizard
      steps={steps}
      initialData={{}} />
  );
  const tree = Component.toJSON();

  const Step = tree.children[1];
  const Previous = Step.children[1];
  expect(Previous.props.onClick).toBeUndefined();
});

it('displays a progress bar indicating the active and complete steps', () => {
  const Component = renderer.create(
    <Wizard
      steps={steps}
      initialData={{}} />
  );
  let tree = Component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[1].children[0]).toBe('first');

  // on first render, the first progress indicator should be active
  let ProgressBar = tree.children[0]
  expectActiveIndex(ProgressBar.children, 0);

  // after the next button has been clicked, the first progress indicator
  // should be complete and the second should be active
  let Step = tree.children[1];
  const Next = Step.children[2];
  Next.props.onClick()
  tree = Component.toJSON();
  ProgressBar = tree.children[0]
  expectActiveIndex(ProgressBar.children, 1);
});

it('calls the cancel function when the cancel button is clicked', () => {
  const cancel = jest.fn()
  const Component = renderer.create(
    <Wizard
      steps={steps}
      initialData={{}}
      cancel={cancel} />
  );
  const tree = Component.toJSON();
  const Step = tree.children[1];
  const Cancel = Step.children[3];
  Cancel.props.onClick();
  expect(cancel.mock.calls.length).toBe(1);
});

it('calls the save function when next button of last step is called', () => {
  const save = jest.fn();
  const Component = renderer.create(
    <Wizard
      steps={steps}
      initialData={{}}
      save={save} />
  );
  // first step
  let tree = Component.toJSON();
  expect(tree).toMatchSnapshot();
  let Step = tree.children[1];
  let Next = Step.children[2];
  Next.props.onClick()
  // second step
  tree = Component.toJSON();
  Step = tree.children[1];
  Next = Step.children[2];
  Next.props.onClick()
  // final step
  tree = Component.toJSON();
  Step = tree.children[1];
  Next = Step.children[2];
  Next.props.onClick()
  expect(save.mock.calls.length).toBe(1);
});

function expectActiveIndex(children, targetIndex) {
  children.forEach((child, index) => {
    const activeIndex = child.props.className.indexOf('active');
    const completeIndex = child.props.className.indexOf('complete');

    if (index === targetIndex) {
      expect(activeIndex).not.toBe(-1);
    } else if ( index < targetIndex ) {
      expect(activeIndex).toBe(-1);
      expect(completeIndex).not.toBe(-1);
    }
    else {
      expect(activeIndex).toBe(-1);
      expect(completeIndex).toBe(-1);
    }
  })
}
