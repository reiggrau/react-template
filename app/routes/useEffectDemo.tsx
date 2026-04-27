import { useEffect, useState } from 'react';

export default function UseEffectDemo() {
	const [userId, setUserId] = useState(0);

	// 1. No array — runs after EVERY render
	useEffect(() => {
		console.log('renders every time');
	});

	// 2. Empty array — runs ONCE on mount, cleanup on unmount
	useEffect(() => {
		console.log('runs once');
		return () => console.log('cleanup on unmount');
	}, []);

	// 3. With dependencies — runs when dependencies change
	useEffect(() => {
		console.log('userId changed:', userId);
	}, [userId]);

	return (
		<div className="page">
			<h2>useEffect</h2>
			<p>
				useEffect runs after the component renders. It handles side effects:
				data fetching, subscriptions, manually updating the DOM, and
				synchronising with external systems. The dependency array controls when
				it runs.
			</p>
			<button onClick={() => setUserId(userId + 1)}>+1</button>
			<button onClick={() => setUserId(0)}>Reset</button>
		</div>
	);
}
