import { useEffect } from 'react';

export default function Child({ onClick }: { onClick: () => void }) {
	useEffect(() => {
		console.log('onClick changed!');
	}, [onClick]);

	return (
		<button
			className="px-4 py-2 rounded bg-brand hover:bg-brand-dark"
			onClick={onClick}
		>
			Child Button
		</button>
	);
}
