#Simple Wizard Component

A React component to create a setup wizard that passes the state from one step to the next. Any validation should be done by the step components, the Wizard just facilitates the data flow.

####props

`steps` - an array of components. Each step 
`save` - a function to call when the wizard is complete.
`cancel` - a function to call to exit the wizard.

##Step Components

Step components can be whatever you want them to be. They receive a `data` object in their `props` which reflects the current state of the wizard, and return the successive state when their next function is called.

####props

`data` - the current state of the wizard as a result of the previous step. (empty object for the first step)
`previous` - return to the previous step
`next` - proceed to the next step (or call the save Wizard's finish function for the last step)

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
