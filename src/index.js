import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

// dev-xrumr0vk2njmvwqu.us.auth0.com
// 1LUUgYi3mm0OjyEz57Hp1FuUwAm3kyx4

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Auth0Provider domain="dev-xrumr0vk2njmvwqu.us.auth0.com" clientId="1LUUgYi3mm0OjyEz57Hp1FuUwAm3kyx4" redirectUri={window.location.origin} cacheLocation="localstorage">
		<GithubProvider>
			<App />
		</GithubProvider>
	</Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
