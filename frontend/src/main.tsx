import "./styles.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<App />);
}
