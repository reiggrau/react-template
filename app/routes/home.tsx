import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'React Template App' },
		{ name: 'description', content: 'Learn React with examples!' },
	];
}

export default function Home() {
	return <Welcome />;
}
