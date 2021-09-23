import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";

function MarketingApp() {
	const ref = useRef(null);

	useEffect(() => {
		mount(ref.current);
	}, []);

	return <div ref={ref}></div>;
}

export default MarketingApp;
