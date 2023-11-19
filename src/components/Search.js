import React, { useContext, useState } from "react";
import { GithubContext } from "../context/context";
import { MdSearch } from "react-icons/md";
import styled from "styled-components";

const Wrapper = styled.div`
	position: relative;
	display: grid;
	gap: 1rem 1.75rem;
	@media screen and (min-width: 800px) {
		grid-template-columns: 1fr max-content;
		align-items: center;
		h3 {
			padding: 0 0.5rem;
		}
	}
	.form-control {
		background-color: var(--clr-white);
		display: grid;
		align-items: center;
		grid-template-columns: auto 1fr auto;
		column-gap: 0.5rem;
		border-radius: 5px;
		padding: 0.5rem;
		input {
			border-color: transparent;
			outline-color: var(--clr-grey-10);
			letter-spacing: var(--spacing);
			color: var(--clr-grey-3);
			padding: 0.25rem 0.5rem;
		}
		input::placeholder {
			color: var(--clr-grey-3);
			text-transform: capitalize;
			letter-spacing: var(--spacing);
		}
		button {
			border-radius: 5px;
			border-color: transparent;
			padding: 0.25rem 0.5rem;
			text-transform: capitalize;
			letter-spacing: var(--spacing);
			background: var(--clr-primary-5);
			color: var(--clr-white);
			transition: var(--transition);
			cursor: pointer;
			&:hover {
				background-color: var(--clr-primary-8);
				color: var(--clr-primary-1);
			}
		}
		svg {
			color: var(--clr-grey-5);
		}
		input,
		button,
		svg {
			font-size: 1.3rem;
		}
		@media screen and (max-width: 800px) {
			input,
			button,
			svg {
				font-size: 0.85rem;
			}
		}
	}
	h3 {
		margin-bottom: 0;
		color: var(--clr-grey-5);
		font-weight: 400;
	}
`;

const WrapperError = styled.article`
	position: absolute;
	width: 90vw;
	top: 0;
	left: 0;
	transform: translateY(-100%);
	text-transform: capitalize;
	p {
		color: red;
		letter-spacing: var(--spacing);
	}
`;

const Search = () => {
	const [user, setUser] = useState("");
	const { requests, error, searchUser, isLoading } = useContext(GithubContext);

	// console.log(requests);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		if (user) {
			searchUser(user);
		}
	};

	return (
		<section className="section">
			<Wrapper className="section-center">
				{error.show && (
					<WrapperError>
						<p>{error.msg}</p>
					</WrapperError>
				)}
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<MdSearch />
						<input type="text" placeholder="search for a user" value={user} onChange={(evt) => setUser(evt.target.value)} />
						{requests > 0 && !isLoading && <button type="submit">search</button>}
					</div>
				</form>
				<h3>Requests : {requests}/60</h3>
			</Wrapper>
		</section>
	);
};

export default Search;
