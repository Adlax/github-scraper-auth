import { createContext, useEffect, useState } from "react";
import mockFollowers from "./mockData.js/mockFollowers";
import mockRepos from "./mockData.js/mockRepos";
import mockUser from "./mockData.js/mockUser";
import axios from "axios";

const rootURL = `https://api.github.com`;

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [githubRepos, setGithubRepos] = useState(mockRepos);
	const [githubFollowers, setGithubFollowers] = useState(mockFollowers);
	const [requests, setRequests] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({ show: false, msg: "" });

	const toggleError = (show = false, msg = "") => {
		setError({ show, msg });
	};

	const searchUser = async (user) => {
		toggleError();
		setIsLoading(true);
		const response = await axios.get(`${rootURL}/users/${user}`).catch((error) => console.log(error));
		if (response) {
			setGithubUser(response.data);
			const { login, followers_url } = response.data;
			await Promise.allSettled([axios.get(`${rootURL}/users/${login}/repos?per_page=100`), axios.get(`${followers_url}?per_page=100`)])
				.then((results) => {
					console.log(results);
					const [repos, followers] = results;
					const fulfilled = "fulfilled";
					if (repos.status === fulfilled) {
						setGithubRepos(repos.value.data);
					}
					if (followers.status === fulfilled) {
						setGithubFollowers(followers.value.data);
					}
				})
				.catch((error) => console.log(error));

			// .then((response) => setGithubRepos(response.data))
			// .catch((error) => console.log(error));

			// .then((response) => setGithubFollowers(response.data))
			// .catch((error) => console.log(error));
		} else {
			toggleError(true, "No user found");
		}
		checkRequests();
		setIsLoading(false);
		// try {
		// 	const response = await axios.get(`${rootURL}/users/${user}`);
		// 	console.log(response);
		// 	if (response) {
		// 		setGithubUser(response.data);
		// 	}
		// } catch (error) {
		// 	if (error.message.status === 404) {
		// 		toggleError(true, "No user found");
		// 		return;
		// 	}
		// 	console.log(error.response.status);
		// }
	};

	const checkRequests = async () => {
		try {
			const response = await axios.get(`${rootURL}/rate_limit`);
			let remaining = response.data.rate.remaining;
			// remaining = 0;
			setRequests(remaining);
			if (remaining === 0) {
				toggleError(true, "Sorry, you have exceeded the git api max connections. Try in an hour.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkRequests();
	}, []);

	const store = { githubUser, githubRepos, githubFollowers, requests, error, isLoading, searchUser };

	return <GithubContext.Provider value={store}>{children}</GithubContext.Provider>;
};

export { GithubProvider, GithubContext };
