import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('useState', 'routes/useStateDemo.tsx'),
	route('useEffect', 'routes/useEffectDemo.tsx'),
	route('api/users/:userId', 'routes/api.users.$userId.ts'),
	route('useCallback', 'routes/useCallbackDemo.tsx'),
] satisfies RouteConfig;
