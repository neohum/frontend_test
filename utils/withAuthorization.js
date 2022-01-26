
import { useRouter } from 'next/router';
import cookies from 'nookies';
import { Component } from 'react'

const isAuthenticated = context => {
	const { token } = cookies.get(context);

	return token;
};

const authenticate = context => {
	const { token } = cookies.get(context);

	cookies.set(
		context,
		'plannedRoute',
		JSON.stringify({ as: context.asPath, href: context.pathname }),
		{ path: '/' }
	);

	// Checking if cookie is present
	// if it is not present, redirect user to signin page
	if (context.req && !token) {
		context.res.writeHead(302, { Location: '/auth/login' });
		context.res.end();
		return;
	}

	if (!token) {
		useRouter.push('/auth/login');
	}

	return token;
};

const handleSignout = context => {
  cookies.destroy(null, 'token', { path: '/' })
  cookies.destroy(null, 'refresh_token', { path: '/' })
  cookies.destroy(null, 'uid', { path: '/' })
  cookies.destroy(null, 'gid', { path: '/' })
}

const withAuthorization = WrappedComponent => {
	return class extends Component {
		static async getInitialProps(context) {
			const token = authenticate(context);

			const componentProps =
				WrappedComponent.getInitialProps &&
				(await WrappedComponent.getInitialProps(context));

			return { ...componentProps, token };
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
};


export { isAuthenticated, withAuthorization, handleSignout };
