import { useCallback, useState } from 'react';
import Child from '~/components/Child';

export default function UseCallbackDemo() {
	const [count, setCount] = useState(0);

	// BAD: handleClick is a NEW function object (new reference) on every render,
	// causing Child's useEffect to run every time, even if it doesn't need to
	// const handleClick = () => {
	// 	console.log('Button clicked!');
	// };

	// GOOD: useCallback returns the SAME function object (same reference) across renders
	const handleClick = useCallback(() => {
		console.log('Button clicked!');
	}, []); // empty array: function never changes

	return (
		<div className="page">
			<h2>useCallback</h2>
			<p>
				useCallback returns a memoised version of a function that only changes
				if its dependencies change. Without it, a new function object is created
				on every render — causing child components that receive it as a prop to
				re-render unnecessarily.
			</p>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>+1</button>
			<button onClick={() => setCount(0)}>Reset</button>
			<Child onClick={handleClick} />
		</div>
	);
}

// When to use useCallback
// useCallback only helps when the function is passed to a child wrapped in
// React.memo, used as a dependency in another hook (useEffect, useMemo), or
// causes measurable performance problems. Do not wrap every function — the
// memoisation itself has a cost. Profile first, optimise second.
