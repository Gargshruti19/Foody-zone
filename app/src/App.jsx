import { useEffect, useState } from "react";
import styled from "styled-components";

const BASE_URL = "http://localhost:9000/";

const App = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);



	useEffect(() => {
		fetchFoodData();
	}, []);



	const fetchFoodData = async () => {
		setLoading(true);
		try {
			const response = await fetch(BASE_URL);
			const json = await response.json();
			setData(json);
			setLoading(false);
		} catch (error) {
			setError("Unable to fetch data");
		}
	};
	if (error) return <div>{error}</div>;
	if (loading) return <div>Loading....</div>;


  
	return (
		<Container>
			<TopContainer>
				<div className="logo">
					<h2>
						F<span>oo</span>dy Z<span>o</span>ne
					</h2>
				</div>
				<div className="search">
					<input type="text" placeholder="Search Food..." />
				</div>
			</TopContainer>
			<FilterContainer>
				<Button>All</Button>
				<Button>Breakfast</Button>
				<Button>Lunch</Button>
				<Button>Dinner</Button>
			</FilterContainer>
			<FoodCardContainer>
				<FoodCards></FoodCards>
			</FoodCardContainer>
		</Container>
	);
};

export default App;

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

const TopContainer = styled.section`
	min-height: 140px;
	display: flex;
	justify-content: space-between;
	padding: 16px;
	align-items: center;
	.logo {
		h2 {
			font-size: 35px;
		}
		span {
			color: yellow;
			font-size: 30px;
		}
	}
	.search {
		input {
			background: transparent;
			border: 1px solid yellow;
			border-radius: 5px;
			color: white;
			height: 40px;
			font-size: 16px;
			padding: 0 10px;
		}
	}
`;
const FilterContainer = styled.section`
	display: flex;
	justify-content: center;
	gap: 12px;
	padding-bottom: 40px;
`;

const Button = styled.button`
	background-color: #bf8d0e;
	border-radius: 5px;
	padding: 6px 12px;
	border: 0;
	color: white;
`;

const FoodCardContainer = styled.section`
	height: calc(100vh - 210px);
	background-image: url("./bg.png");
	background-size: cover;
`;

const FoodCards = styled.div``;
