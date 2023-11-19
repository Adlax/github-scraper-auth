import React, { useContext } from "react";
import { UserInfo, Repos, User, Search, Navbar } from "../components";
import { GithubContext } from "../context/context";
import loadingImage from "../images/preloader.gif";

const Dashboard = () => {
	const { isLoading } = useContext(GithubContext);
	if (isLoading) {
		return (
			<main>
				<Navbar />
				<Search />
				<img src={loadingImage} alt="loading" className="loading-img" />
			</main>
		);
	}
	return (
		<main>
			<Navbar></Navbar>
			<Search />
			<UserInfo />
			<User />
			<Repos />
		</main>
	);
};

export default Dashboard;
