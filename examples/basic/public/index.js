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

	var FirstStep = _react2.default.createClass({
	  displayName: 'FirstStep',

	  getInitialState: function getInitialState() {
	    return {
	      name: ''
	    };
	  },
	  handleSubmit: function handleSubmit(event) {
	    event.preventDefault();
	    this.props.next({
	      name: this.state.name
	    });
	  },
	  handleName: function handleName(event) {
	    this.setState({
	      name: event.target.value
	    });
	  },
	  render: function render() {
	    var _props = this.props;
	    var data = _props.data;
	    var previous = _props.previous;

	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'label',
	        null,
	        'Name: ',
	        _react2.default.createElement('input', { onChange: this.handleName, value: this.state.name })
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
	          'Next'
	        )
	      )
	    );
	  }
	});

	var SecondStep = _react2.default.createClass({
	  displayName: 'SecondStep',

	  getInitialState: function getInitialState() {
	    return {
	      age: 0
	    };
	  },
	  handleSubmit: function handleSubmit(event) {
	    event.preventDefault();
	    var _props2 = this.props;
	    var data = _props2.data;
	    var next = _props2.next;
	    // merge the data with data from previous step

	    var fullData = Object.assign({}, data, {
	      age: this.state.age
	    });
	    this.props.next(fullData);
	  },
	  handleAge: function handleAge(event) {
	    this.setState({
	      age: parseInt(event.target.value, 10)
	    });
	  },
	  render: function render() {
	    var _props3 = this.props;
	    var data = _props3.data;
	    var previous = _props3.previous;

	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'label',
	        null,
	        'Age: ',
	        _react2.default.createElement('input', { onChange: this.handleAge, type: 'number', value: this.state.age })
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
	          'Next'
	        )
	      )
	    );
	  }
	});

	var VerifyStep = _react2.default.createClass({
	  displayName: 'VerifyStep',

	  handleSubmit: function handleSubmit() {
	    var _props4 = this.props;
	    var next = _props4.next;
	    var data = _props4.data;

	    this.props.next(data);
	  },
	  render: function render() {
	    var _props5 = this.props;
	    var data = _props5.data;
	    var previous = _props5.previous;
	    var name = data.name;
	    var age = data.age;

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
	    var steps = [FirstStep, SecondStep, VerifyStep];
	    return _react2.default.createElement(_index2.default, { steps: steps, save: this.save, cancel: this.cancel });
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
	    steps: _react2.default.PropTypes.array.isRequired,
	    save: _react2.default.PropTypes.func,
	    cancel: _react2.default.PropTypes.func
	  },
	  getInitialState: function getInitialState() {
	    return {
	      position: 0,
	      data: []
	    };
	  },
	  next: function next(newData) {
	    var _state = this.state;
	    var position = _state.position;
	    var data = _state.data;

	    this.setState({
	      position: position + 1,
	      data: data.concat([newData])
	    });
	  },
	  previous: function previous() {
	    var _state2 = this.state;
	    var position = _state2.position;
	    var data = _state2.data;

	    this.setState({
	      position: position - 1,
	      // throw away any data for subsequent steps
	      data: data.slice(0, position)
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
	    // current data is the data returned by the previous step
	    var currentData = data[position - 1] || {};
	    // on the last step, call the finish function, otherwise call the next function
	    var completeStep = position === steps.length - 1 ? this.finish : this.next;
	    return _react2.default.createElement('div', { className: 'wizard' }, _react2.default.createElement(ProgressBar, { steps: steps.length, position: position }), _react2.default.createElement(CurrentStep, { data: currentData,
	      cancel: this.cancel,
	      next: completeStep,
	      previous: this.previous }), _react2.default.createElement('button', { onClick: this.cancel }, 'Cancel'));
	  }
	});

	/*
	 * Visual progression through the steps
	 */
	var ProgressBar = _react2.default.createClass({
	  displayName: 'ProgressBar',

	  render: function render() {
	    var _props = this.props;
	    var steps = _props.steps;
	    var position = _props.position;

	    var dots = Array.from(Array(steps)).map(function (s, i) {
	      var classes = ['step', i < position ? 'complete' : null, i == position ? 'active' : null];
	      return _react2.default.createElement('li', { key: i, className: classes.join(' ') });
	    });
	    return _react2.default.createElement('ul', { className: 'progress-bar' }, dots);
	  }
	});

	exports.default = Wizard;

/***/ }
/******/ ]);