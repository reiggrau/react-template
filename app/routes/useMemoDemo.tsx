import { useEffect, useMemo, useState } from 'react';

const PRODUCTS = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grape'];

const EXCLUDE = 'Cherry';

export default function UseMemoDemo() {
	const [count, setCount] = useState(0);

	// Without useMemo: filters the entire list on every render
	// even when filterText hasn't changed
	const filtered = PRODUCTS.filter((item) => {
		console.log('Filtering...');
		return !item.toLowerCase().includes(EXCLUDE.toLowerCase());
	});

	// With useMemo: only re-filters when exclude changes
	const filteredMemo = useMemo(
		() =>
			PRODUCTS.filter((item) => {
				console.log('Filtering with useMemo...');
				return !item.toLowerCase().includes(EXCLUDE.toLowerCase());
			}),
		[], // dependencies
	);

	useEffect(() => {
		console.log('Re-render...');
	});

	// Referential stability for objects and arrays
	// Without useMemo — new object on every render
	// This causes useEffect to run every time even if values are the same
	const config = { threshold: 0.5, maxResults: 10 };

	useEffect(() => {
		console.log(config);
	}, [config]); // runs every render

	// With useMemo — stable reference
	const configMemo = useMemo(
		() => ({
			threshold: 0.5,
			maxResults: 10,
		}),
		[],
	); // same object reference across renders

	useEffect(() => {
		console.log(configMemo);
	}, [configMemo]); // runs once

	return (
		<div className="page">
			<h2>useMemo</h2>
			<p>
				useMemo returns a memoised value that only recomputes if its
				dependencies change. It can be used to optimise expensive calculations
				or to memoise objects and arrays to prevent unnecessary re-renders of
				child components.
			</p>
			<p>
				Look at the console to see when filtering happens. With useMemo, the
				filtering only runs once, even if the component re-renders multiple
				times.
			</p>
			{filtered.length ? filtered.join(', ') : PRODUCTS.join(', ')}
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Trigger re-render</button>
		</div>
	);
}

// When should you NOT use useMemo?
// When the computation is cheap — the memoisation overhead may cost more
// than the computation itself. When dependencies change on every render —
// memoisation provides no benefit. When used prematurely — profile first and
// identify actual bottlenecks. The React team says: do not add useMemo
// everywhere. Add it when you measure a problem.
