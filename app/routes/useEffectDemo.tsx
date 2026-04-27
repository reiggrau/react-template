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

	// Data fetching pattern
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let cancelled = false; // prevent state update on unmounted component
		async function fetchUser() {
			try {
				setLoading(true);
				const res = await fetch(`/api/users/${userId}`);
				const data = await res.json();
				if (!cancelled) setUser(data);
			} catch (err: any) {
				if (!cancelled) setError(err.message);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		fetchUser();
		return () => {
			cancelled = true;
		}; // cleanup
	}, [userId]); // re-fetch when userId changes

	// Cleanup — subscriptions and event listeners
	useEffect(() => {
		// Subscribe to an event
		const handleResize = () => console.log(window.innerWidth);
		window.addEventListener('resize', handleResize);
		// Cleanup: remove listener when component unmounts
		// or before effect runs again
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []); // empty array: subscribe once, unsubscribe on unmount

	// Timer example
	const [count, setCount] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prev) => prev + 1);
		}, 1000);
		return () => clearInterval(interval); // ALWAYS clear timers
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="page">
			<h2>useEffect</h2>
			<p>
				useEffect runs after the component renders. It handles side effects:
				data fetching, subscriptions, manually updating the DOM, and
				synchronising with external systems. The dependency array controls when
				it runs.
			</p>
			<p>userId: {userId}</p>
			<button onClick={() => setUserId(userId + 1)}>+1</button>
			<button onClick={() => setUserId(0)}>Reset</button>
			<h2>useEffect fetch</h2>
			<p>Fetched user data will be displayed below:</p>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<h2>useEffect event listeners</h2>
			<p>Resize the window to see the current width in the console.</p>
			<h2>useEffect timers</h2>
			<p>Count: {count}</p>
		</div>
	);
}
