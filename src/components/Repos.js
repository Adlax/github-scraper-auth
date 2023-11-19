import React, { useContext } from "react";
import styled from "styled-components";
import { ExampleChart, Column3D, Bar3D, Pie3D, Doughnut2D } from "./Charts";
import { GithubContext } from "../context/context";

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media screen and (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}
	@media screen and (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}
	div {
		width: 100% !important;
	}
	.fusioncharts-container {
		width: 100% !important;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`;

const Repos = () => {
	const { githubRepos } = useContext(GithubContext);
	// console.log(githubRepos);
	let languages = githubRepos.reduce((total, item) => {
		const { language, stargazers_count } = item;
		// console.log(language);
		if (!language) {
			return total;
		}
		if (!total[language]) {
			total[language] = { label: language, value: 1, stars: stargazers_count };
		} else {
			total[language] = { ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count };
		}
		return total;
	}, {});

	// console.log(languages);

	// transform into array of objects:
	let mostUsed = Object.values(languages);
	// console.log(languages);

	// sort accoring to values :
	mostUsed = mostUsed.sort((a, b) => b.value - a.value);
	// console.log(languages);

	// slice the 5 biggest scores :
	mostUsed = mostUsed.slice(0, 5);
	// console.log(mostUsed);

	// mostStared :
	let mostStared = Object.values(languages);
	// console.log(mostStared);

	// sort according to stars number :
	mostStared = mostStared.sort((a, b) => b.stars - a.stars);
	// console.log(mostStared);

	// put the stars value inside the value prop :
	mostStared = mostStared.map((item) => {
		return { ...item, value: item.stars };
	});

	// slide the 5 firsts :
	mostStared = mostStared.slice(0, 5);
	// console.log(mostStared);

	// other data setup for other graphic:
	let { stars, forks } = githubRepos.reduce(
		(total, item) => {
			const { stargazers_count, name, forks } = item;
			total.stars[stargazers_count] = { label: name, value: stargazers_count };
			total.forks[forks] = { label: name, value: forks };

			return total;
		},
		{ stars: {}, forks: {} }
	);
	// console.log(stars, forks);

	stars = Object.values(stars).slice(-5).reverse();
	forks = Object.values(forks).slice(-5).reverse();
	// console.log(stars, forks);

	return (
		<section className="section">
			<Wrapper className="section-center">
				<Pie3D data={mostUsed} />
				<Column3D data={stars} />
				<Doughnut2D data={mostStared} />
				<Bar3D data={forks} />
			</Wrapper>
		</section>
	);
};

export default Repos;
