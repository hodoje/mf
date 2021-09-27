import React from "react";
import ReactDOM from "react-dom";
// 'react-router-dom' internaly uses 'history' library
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory }) => {
	// Either use browser history or memory history based on mode the app is running in
	const history = defaultHistory || createMemoryHistory();

	if (onNavigate) {
		history.listen(onNavigate);
	}

	ReactDOM.render(<App history={history} />, el);

	return {
		onParentNavigate: ({ pathname: nextPathname }) => {
			const { pathname } = history.location;

			if (pathname !== nextPathname) {
				history.push(nextPathname);
			}
		},
	};
};

// If we are in development and in isolation
// call mount immediately
if (process.env.NODE_ENV === "development") {
	const devRoot = document.querySelector("#_auth-dev-root");
	if (devRoot) {
		mount(devRoot, { defaultHistory: createBrowserHistory() });
	}
}

// If we are running through container
// we should export the mount function
export { mount };
