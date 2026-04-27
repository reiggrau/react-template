import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('useState', 'routes/useStateDemo.tsx'),
	route('useEffect', 'routes/useEffectDemo.tsx'),
] satisfies RouteConfig;
