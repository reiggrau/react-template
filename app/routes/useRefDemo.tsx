import { useRef, useState, useEffect } from 'react';

// Tracks the value from the previous render.
// useEffect runs *after* render, so ref.current is still the old value
// when the component renders — then gets updated for next time.
function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>(undefined);
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export default function UseRefDemo() {
	// Use 1 — DOM access
	const inputRef = useRef<HTMLInputElement>(null);

	const focusInput = () => {
		if (inputRef.current) inputRef.current.focus(); // direct DOM access
	};

	const clearInput = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
			inputRef.current.focus();
		}
	};

	// Use 2 — mutable values that do not trigger re-renders
	const [timer, setTimer] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null); // storing the interval ID

	const start = () => {
		setIsRunning(true);
		intervalRef.current = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);
	};

	const stop = () => {
		setIsRunning(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current); // access the stored ID
			intervalRef.current = null;
		}
	};

	const previousTimer = usePrevious(timer);

	return (
		<div className="page">
			<h2>useRef</h2>
			<p>
				useRef returns a mutable object with a .current property. It has two
				main uses: accessing DOM elements directly, and storing mutable values
				that persist across renders without triggering re-renders.
			</p>
			<h3>DOM access example</h3>
			<input ref={inputRef} type="text" />
			<div className="flex gap-4">
				<button onClick={focusInput}>Focus</button>
				<button onClick={clearInput}>Clear</button>
			</div>
			<h3>Mutable value example</h3>
			<p>Timer: {timer}</p>
			<div className="flex gap-4">
				<button onClick={start} disabled={isRunning}>
					Start
				</button>
				<button onClick={stop} disabled={!isRunning}>
					Stop
				</button>
			</div>
			<h3>usePrevious example</h3>
			<p>
				Current: {timer} — Previous: {previousTimer ?? '–'}
			</p>
		</div>
	);
}

// Tracking previous value — removed from bottom, moved to top
