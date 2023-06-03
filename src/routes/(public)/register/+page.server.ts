import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/$server/db';
import { hashPassword, signToken } from '$lib/$server/auth/utils';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

export const load = async () => {
	// Server API:
	const form = await superValidate(schema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated data
		const email = form.data.email;
		const isEmailInUse = await prisma.user.findUnique({
			where: {
				email
			}
		});
		if (isEmailInUse) {
			return fail(400, { form });
		}
		const password = form.data.password;
		const hashedPassword = await hashPassword(password);
		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword
			}
		});
		const token = await signToken({ id: newUser.id });
		// set it as a cookie
		cookies.set('token', token, {
			path: '/'
		});
		throw redirect(307, '/dashboard');

		// Yep, return { form } here too
		return message(form, 'User created successfully');
	}
};
