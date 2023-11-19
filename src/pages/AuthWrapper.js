import styled from "styled-components";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import loadingImg from "../images/preloader.gif";

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	place-items: center;
	img {
		width: 150px;
	}
`;

const AuthWrapper = ({ children }) => {
	const { isLoading, error } = useAuth0();

	if (isLoading) {
		return (
			<Wrapper>
				<img src={loadingImg} alt="spinner" />
			</Wrapper>
		);
	}

	if (error) {
		return (
			<Wrapper>
				<h1>{error.message}</h1>
			</Wrapper>
		);
	}

	return <>{children}</>;
};

export default AuthWrapper;
