/* eslint-disable @typescript-eslint/ban-ts-comment */
export const load = async (event) => {
	//@ts-ignore
	const user = event.locals.user;
	return {
		user
	};
};
