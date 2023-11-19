import React from "react";
import styled from "styled-components";
import Card from "./Card";
import Followers from "./Followers";

const Wrapper = styled.div`
	padding-top: 2rem;
	display: grid;
	gap: 3rem 2rem;
	@media screen and (min-width: 1000px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const User = () => {
	return (
		<section className="section">
			<Wrapper className="section-center">
				<Card />
				<Followers />
			</Wrapper>
		</section>
	);
};

export default User;
