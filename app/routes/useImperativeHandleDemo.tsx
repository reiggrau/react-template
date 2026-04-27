import { useRef, useImperativeHandle, forwardRef } from 'react';

// Child exposes only what it wants the parent to access
const FancyInput = forwardRef(function FancyInput(
	props: React.InputHTMLAttributes<HTMLInputElement>,
	ref,
) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	useImperativeHandle(ref, () => ({
		// Only expose these methods — not the raw DOM node
		focus: () => inputRef.current?.focus(),
		clear: () => {
			if (inputRef.current) {
				inputRef.current.value = '';
			}
		},
		getValue: () => inputRef.current?.value,
	}));
	return <input ref={inputRef} {...props} />;
});

// Parent uses the exposed API
export default function UseImperativeHandleDemo() {
	const inputRef = useRef<{
		focus: () => void;
		clear: () => void;
		getValue: () => string | undefined;
	}>(null);

	const handleSubmit = () => {
		const value = inputRef.current?.getValue(); // exposed method
		console.log('Submitted:', value);
		inputRef.current?.clear(); // exposed method
	};

	return (
		<div className="page">
			<FancyInput ref={inputRef} placeholder="Type here" />
			<button onClick={handleSubmit}>Submit</button>
			<button onClick={() => inputRef.current?.focus()}>Focus</button>
		</div>
	);
}
