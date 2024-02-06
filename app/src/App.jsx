/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./Components/SearchResult";
export const BASE_URL = "http://localhost:9000";

const App = () => {
	const [data, setData] = useState([]);
	const [filteredData, setFilterData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [selectedBtn, setSelectedBtn] = useState("all");
	useEffect(() => {
		fetchFoodData();
	}, []);

	const fetchFoodData = async () => {
		setLoading(true);
		try {
			const response = await fetch(BASE_URL);
			const json = await response.json();
			setData(json);
			setFilterData(json);
			setLoading(false);
		} catch (error) {
			setError("Unable to fetch data");
		}
	};

	const searchFood = (e) => {
		const searchValue = e.target.value;

		if (searchValue === "") {
			setFilterData(null);
		}

		const filter = data?.filter((food) =>
			food.name.toLowerCase().includes(searchValue.toLowerCase())
		);
		setFilterData(filter);
	};

	const filterFood = (type) => {
		if (type === "all") {
			setFilterData(data);
			setSelectedBtn("all");
			return;
		}
		const filter = data?.filter((food) =>
			food.type.toLowerCase().includes(type.toLowerCase())
		);
		setFilterData(filter);
		setSelectedBtn(type);
	};

	const filterBtns = [
		{
			name: "All",
			type: "all",
		},
		{
			name: "Breakfast",
			type: "breakfast",
		},
		{
			name: "Lunch",
			type: "lunch",
		},
		{
			name: "Dinner",
			type: "dinner",
		},
	];
	if (error) return <div>{error}</div>;
	if (loading) return <div>Loading....</div>;

	return (
		<>
			<Container>
				<TopContainer>
					<div className="logo">
						<h2>
							F<span>oo</span>dy Z<span>o</span>ne
						</h2>
					</div>
					<div className="search">
						<input
							onChange={searchFood}
							type="text"
							placeholder="Search Food..."
						/>
					</div>
				</TopContainer>
				<FilterContainer>
					{filterBtns.map((btn) => (
						<Button
							isSelected={selectedBtn === btn.type}
							key={btn.name}
							onClick={() => filterFood(btn.type)}
						>
							{btn.name}
						</Button>
					))}
				</FilterContainer>
			</Container>
			<SearchResult data={filteredData} BASE_URL={BASE_URL} />
		</>
	);
};

export default App;

export const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

const TopContainer = styled.section`
	height: 140px;
	display: flex;
	justify-content: space-between;
	padding: 16px;
	align-items: center;
	.logo {
		h2 {
			font-size: 35px;
		}
		span {
			color: #d6a11c;
			font-size: 30px;
		}
	}
	.search {
		input {
			background: transparent;
			border: 1px solid #d6a11c;
			border-radius: 5px;
			color: white;
			height: 40px;
			font-size: 16px;
			padding: 0 10px;
			&::placeholder {
				color: white;
			}
		}
	}
	@media (0< width <600px) {
		flex-direction: column;
		height: 120px;
	}
`;
const FilterContainer = styled.section`
	display: flex;
	justify-content: center;
	gap: 12px;
	padding-bottom: 40px;
`;

export const Button = styled.button`
	background-color: ${({ isSelected }) => (isSelected ? "#a57909" : "#d6a11c")};
	outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#d6a11c")};
	border-radius: 5px;
	padding: 6px 12px;
	border: 0;
	color: white;
	cursor: pointer;
	&:hover {
		background-color: #a57909;
	}
`;
