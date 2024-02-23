let NOSTATE = null

class StateMachine {
	constructor(initalState, possibleStates, stateArgs=[]) {
		this.initalState = initalState
		this.possibleStates = possibleStates
		this.stateArgs = stateArgs
		this.state = NOSTATE

		for (const state of Object.values(this.possibleStates)) {
			state.stateMachine = this
		}
	}

	step() {
		if (this.state === NOSTATE) {
			this.state = this.initalState 
			this.possibleStates[this.state].enterState(...this.stateArgs)
			// note: "Spread syntax allows an iterable such as an array expression to be expanded in places where zero or more arguments or elements are expected." (MDN)
		}

		this.possibleStates[this.state].executeState(...this.stateArgs)
	}

	transition(newState, ...enterArgs) {
		this.state = newState
		this.possibleStates[this.state].enterState(...this.stateArgs, ...enterArgs)
	}
}

class State {
	enterState() {
		console.log(`Changed State`)
	}

	executeState() {
		
	}
}