import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile({ breakPoint = MOBILE_BREAKPOINT }: { breakPoint?: number }) {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${breakPoint - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < breakPoint);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < breakPoint);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	return !!isMobile;
}
