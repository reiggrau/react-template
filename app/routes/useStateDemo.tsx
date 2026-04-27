import { useState } from 'react';

export default function UseStateDemo() {
	// Basic usage
	const [count, setCount] = useState(0);

	// State with objects — always spread, never mutate
	const [user, setUser] = useState({ name: 'Guillem', role: 'developer' });

	// Lazy initialisation
	// BAD — function runs on every render, not just the first
	// const [state, setState] = useState(expensiveComputation());

	// GOOD — pass a function, only called once on mount
	const [state, setState] = useState(() => expensiveComputation());

	function expensiveComputation() {
		console.log('Running expensive computation');
		return 42;
	}

	return (
		<div className="page">
			<h2>useState</h2>
			<p>
				useState is a React Hook that allows you to add state to functional
				components. It returns an array with two elements: the current state
				value and a function to update that value. You can use it to manage any
				type of state, such as numbers, strings, objects, or arrays.
			</p>
			<div>
				<p>Count: {count}</p>
				<div className="flex gap-1">
					<button onClick={() => setCount(count - 1)}>-1</button>
					<button onClick={() => setCount(0)}>Reset</button>
					<button onClick={() => setCount(count + 1)}>+1</button>
				</div>
			</div>
			<h2>useState with objects and arrays</h2>
			<p>
				Never mutate state directly. React uses reference equality to detect
				state changes. If you mutate an object and pass the same reference to
				setState, React sees the same reference and skips the re-render. Always
				create a new object or array: spread operator for objects,
				map/filter/spread for arrays.
			</p>
			<p>{JSON.stringify(user)}</p>
			<div className="flex flex-col gap-1 items-center">
				<button
					onClick={() => {
						user.name = 'New Name';
					}}
				>
					user.name = 'New Name'
				</button>
				<button onClick={() => setUser({ ...user, name: 'New Name' })}>
					{`setUser(prev => ({ ...prev, name: 'New Name' }))`}
				</button>
				<button onClick={() => setUser({ name: 'Guillem', role: 'developer' })}>
					Reset
				</button>
			</div>
		</div>
	);
}

// Functional update form
// X Potential bug
// PROBLEM: if setCount is called multiple times in the same render cycle, 'count' may be stale
// setCount(count + 1)
// setCount(count + 1) // both read same stale count
// result: only increments by 1, not 2

// OK Correct
// CORRECT: functional form always gets the most recent value
// setCount(prev => prev + 1)
// setCount(prev => prev + 1) // increments twice
// result: increments by 2 correctly

// With arrays — always return a new array
// const [items, setItems] = useState(['a', 'b', 'c'])
// Add item
// setItems(prev => [...prev, 'newItem'])
// Remove item
// setItems(prev => prev.filter(item => item !== 'b'))
// Update item
// setItems(prev => prev.map(item => item === 'a' ? 'updated' : item))
