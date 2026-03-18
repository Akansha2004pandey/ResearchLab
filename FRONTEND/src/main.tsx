import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<ThemeProvider
		attribute="class"
		defaultTheme="theme-aurora"
		themes={["theme-aurora", "dark"]}
		enableSystem={false}
		disableTransitionOnChange
	>
		<App />
	</ThemeProvider>
);
