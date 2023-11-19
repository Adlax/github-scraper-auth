import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	place-items: center;
	background-color: var(--clr-primary-10);
	text-align: center;
	h1 {
		font-size: 10rem;
	}
	h3 {
		color: var(--clr-primary-3);
		margin-bottom: 1.5rem;
	}
`;

const Error = () => {
	return (
		<Wrapper>
			<div>
				<h1>404</h1>
				<h3>Sorry, page can't be found</h3>
				<Link className="btn" to="/">
					Back home
				</Link>
			</div>
		</Wrapper>
	);
};

export default Error;
