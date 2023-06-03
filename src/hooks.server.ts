import { verifyToken } from '$lib/$server/auth/utils';
import { prisma } from '$lib/$server/db';
import { redirect } from '@sveltejs/kit';
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const protectedRoutes = ['/dashboard', '/settings'];
	if (protectedRoutes.includes(event.url.pathname)) {
		const token = event.cookies.get('token');
		if (!token) {
			throw redirect(300, '/login');
		}

		const decryptedToken = await verifyToken(token);
		const user = await prisma.user.findUnique({
			where: {
				id: decryptedToken.id
			}
		});
		if (!user) {
			throw redirect(300, '/login');
		}

		event.locals.user = user;

		const response = await resolve(event);
		return response;
	}

	const response = await resolve(event);
	return response;
}
