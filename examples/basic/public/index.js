/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NameComponent = _react2.default.createClass({
	  displayName: 'NameComponent',

	  getInitialState: function getInitialState() {
	    var _props$endData = this.props.endData;
	    var endData = _props$endData === undefined ? {} : _props$endData;
	    var _endData$name = endData.name;
	    var name = _endData$name === undefined ? '' : _endData$name;

	    return {
	      completed: name !== '',
	      name: name
	    };
	  },
	  nextHandler: function nextHandler(event) {
	    var _state = this.state;
	    var completed = _state.completed;
	    var name = _state.name;

	    if (!completed) {
	      return;
	    }
	    var startData = this.props.startData;

	    this.props.next(Object.assign({}, startData, { name: name }));
	  },
	  handleName: function handleName(event) {
	    this.setState({
	      name: event.target.value,
	      completed: event.target.value !== ""
	    });
	  },
	  renderButtons: function renderButtons() {
	    var _props = this.props;
	    var next = _props.next;
	    var previous = _props.previous;
	    var cancel = _props.cancel;
	    var completed = this.state.completed;

	    return _react2.default.createElement(
	      'div',
	      { className: 'step-controls' },
	      previous !== undefined ? _react2.default.createElement(
	        'button',
	        { onClick: previous },
	        'Previous'
	      ) : null,
	      _react2.default.createElement(
	        'button',
	        { onClick: this.nextHandler, disabled: !completed },
	        'Next'
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: cancel },
	        'Cancel'
	      )
	    );
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'step' },
	      _react2.default.createElement(
	        'p',
	        null,
	        _react2.default.createElement(
	          'label',
	          null,
	          'Name: ',
	          _react2.default.createElement('input', { value: this.state.name, onChange: this.handleName })
	        )
	      ),
	      this.renderButtons()
	    );
	  }
	});

	var AgeComponent = _react2.default.createClass({
	  displayName: 'AgeComponent',

	  getInitialState: function getInitialState() {
	    var _props$endData2 = this.props.endData;
	    var endData = _props$endData2 === undefined ? {} : _props$endData2;
	    var _endData$age = endData.age;
	    var age = _endData$age === undefined ? '' : _endData$age;

	    return {
	      completed: age !== '',
	      age: age
	    };
	  },
	  nextHandler: function nextHandler(event) {
	    var _state2 = this.state;
	    var completed = _state2.completed;
	    var age = _state2.age;

	    if (!completed) {
	      return;
	    }
	    var startData = this.props.startData;

	    this.props.next(Object.assign({}, startData, { age: age }));
	  },
	  handleAge: function handleAge(event) {
	    this.setState({
	      age: Math.max(parseInt(event.target.value, 10), 0),
	      completed: event.target.value !== ""
	    });
	  },
	  renderButtons: function renderButtons() {
	    var _props2 = this.props;
	    var next = _props2.next;
	    var previous = _props2.previous;
	    var cancel = _props2.cancel;
	    var completed = this.state.completed;

	    return _react2.default.createElement(
	      'div',
	      { className: 'step-controls' },
	      previous !== undefined ? _react2.default.createElement(
	        'button',
	        { onClick: previous },
	        'Previous'
	      ) : null,
	      _react2.default.createElement(
	        'button',
	        { onClick: this.nextHandler, disabled: !completed },
	        'Next'
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: cancel },
	        'Cancel'
	      )
	    );
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'step' },
	      _react2.default.createElement(
	        'p',
	        null,
	        _react2.default.createElement(
	          'label',
	          null,
	          'Age: ',
	          _react2.default.createElement('input', { type: 'number', value: this.state.age, onChange: this.handleAge })
	        )
	      ),
	      this.renderButtons()
	    );
	  }
	});

	var VerifyStep = _react2.default.createClass({
	  displayName: 'VerifyStep',

	  handleSubmit: function handleSubmit() {
	    var _props3 = this.props;
	    var next = _props3.next;
	    var startData = _props3.startData;

	    this.props.next(startData);
	  },
	  render: function render() {
	    var _props4 = this.props;
	    var startData = _props4.startData;
	    var previous = _props4.previous;
	    var cancel = _props4.cancel;
	    var name = startData.name;
	    var age = startData.age;

	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'p',
	        null,
	        'Is this data correct?'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'Name: ',
	        name
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'Age: ',
	        age
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        _react2.default.createElement(
	          'button',
	          { onClick: function onClick() {
	              return previous();
	            } },
	          'Previous'
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.handleSubmit },
	          'Submit'
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: cancel },
	          'Cancel'
	        )
	      )
	    );
	  }
	});

	var BasicWizard = _react2.default.createClass({
	  displayName: 'BasicWizard',

	  save: function save(data) {
	    console.log('saved', data);
	  },
	  cancel: function cancel() {
	    console.log('cancelled');
	  },
	  render: function render() {
	    var steps = [NameComponent, AgeComponent, VerifyStep];
	    return _react2.default.createElement(_index2.default, { steps: steps, save: this.save, cancel: this.cancel, initialData: {} });
	  }
	});

	ReactDOM.render(_react2.default.createElement(BasicWizard, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

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
	var Wizard = _react2.default.createClass({
	  displayName: 'Wizard',

	  propTypes: {
	    initialData: _react2.default.PropTypes.object.isRequired,
	    steps: _react2.default.PropTypes.array.isRequired,
	    save: _react2.default.PropTypes.func,
	    cancel: _react2.default.PropTypes.func
	  },
	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var initialData = _props.initialData;
	    var steps = _props.steps;

	    return {
	      position: 0,
	      data: [initialData].concat(Array(steps.length))
	    };
	  },
	  next: function next(newData) {
	    var _state = this.state;
	    var position = _state.position;
	    var data = _state.data;
	    var steps = this.props.steps;

	    var maxPos = steps.length - 1;
	    // don't let the position become greater than the number of steps
	    // (0 normalized)
	    var nextPos = position === maxPos ? position : position + 1;
	    data[nextPos] = newData;
	    this.setState({
	      position: nextPos,
	      data: data
	    });
	  },
	  previous: function previous() {
	    var _state2 = this.state;
	    var position = _state2.position;
	    var data = _state2.data;

	    this.setState({
	      position: position > 0 ? position - 1 : 0
	    });
	  },
	  cancel: function cancel(event) {
	    event.preventDefault();
	    this.props.cancel();
	  },
	  finish: function finish(data) {
	    this.props.save(data);
	  },
	  render: function render() {
	    var _state3 = this.state;
	    var position = _state3.position;
	    var data = _state3.data;
	    var steps = this.props.steps;

	    var CurrentStep = steps[position];
	    // don't pass a previous function to the first step
	    var prevStep = position === 0 ? undefined : this.previous;
	    // on the last step, call the finish function, otherwise call the next function
	    var completeStep = position === steps.length - 1 ? this.finish : this.next;
	    return _react2.default.createElement('div', { className: 'wizard' }, _react2.default.createElement(ProgressBar, { steps: steps.length, position: position }), _react2.default.createElement(CurrentStep, { startData: data[position],
	      endData: data[position + 1],
	      cancel: this.cancel,
	      next: completeStep,
	      previous: prevStep }));
	  }
	});

	/*
	 * Visual progression through the steps
	 */
	var ProgressBar = _react2.default.createClass({
	  displayName: 'ProgressBar',

	  render: function render() {
	    var _props2 = this.props;
	    var steps = _props2.steps;
	    var position = _props2.position;

	    var dots = Array.from(Array(steps)).map(function (s, i) {
	      var classes = ['marker', i < position ? 'complete' : null, i == position ? 'active' : null];
	      return _react2.default.createElement('div', { key: i, className: classes.join(' ') });
	    });
	    return _react2.default.createElement('div', { className: 'progress-bar' }, dots);
	  }
	});

	exports.default = Wizard;

/***/ }
/******/ ]);