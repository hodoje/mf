import React, { useRef, useEffect } from "react";
import { mount } from "auth/AuthApp";
import { useHistory } from "react-router-dom";

function AuthApp() {
	const ref = useRef(null);
	// Browser History
	const history = useHistory();

	useEffect(() => {
		const { onParentNavigate } = mount(ref.current, {
			onNavigate: ({ pathname: nextPathname }) => {
				const { pathname } = history.location;

				// Prevent infinite loops between history objects
				if (pathname !== nextPathname) {
					history.push(nextPathname);
				}
			},
		});

		history.listen(onParentNavigate);
	}, []);

	return <div ref={ref}></div>;
}

export default AuthApp;