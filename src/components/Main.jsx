import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dataJson from "../components/data.json";

const Card = styled.div`
  position: relative;
  background-color: beige;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 400px;
  margin: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Top = styled.div`
  height: 50%;
  width: 100%;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
    transition: width 0.2s, height 0.2s;
  }

  &:hover img {
    width: 110%;
    height: 110%;
  }
`;

const Bottom = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h3`
  font-size: 22px;
  margin: 0;
  color: #333;
`;

const Category = styled.p`
  font-size: 18px;
  margin: 5px 0;
  color: #888;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #007bff;
`;

const Filternav = styled.div`
  display: flex;
  background-color: #007bff;
  align-items: center;
  padding: 10px;
  color: white;
  justify-content: space-around;
  gap: 20px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;
const Pagebutton = styled.button`
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  color: #007bff;
  border: none;
  cursor: pointer;
`;
const FilterSelect = styled.select`
  padding: 10px;
  border-radius: 30px;
  background-color: white;
  color: #007bff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FilterOption = styled.option`
  background-color: white;
  color: #007bff;
  cursor: pointer;
border:none;
border-radius:20px;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const Pagination = styled.div`
  display: flex;
  gap: 5px;
  /* float: right; */
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Main = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setData(dataJson[0].products);
    setSortedData(dataJson[0].products);
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (type) => {
    const sorted = [...sortedData];
    if (type === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted.sort((a, b) => Math.random() - 0.4);
    }
    setSortedData(sorted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const category = [...dataJson[0].products];
  const datCat = category.map((item) => item.category);
  const distinctCategory = [...new Set(datCat)];
  const categorised = (value) => {
    const mainData = dataJson[0].products; // Store the original data
    const sorted = mainData.filter((p) => p.category.includes(value));
    setCurrentPage(1)
    setSortedData(sorted);
  };
  return (
    <div className="main">
      <Filternav>
        <div className="left">
          <Pagebutton
            style={{
              background: currentPage === 1 ? "grey" : "rgb(110 162 217)",
              color: currentPage === 1 ? "black" : "white",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
            onClick={
              currentPage === 1 ? null : () => setCurrentPage(currentPage - 1)
            }
          >
            Prev
          </Pagebutton>
        </div>
        <div className="center">
          <FilterSelect
            name="Filter"
            defaultValue="defaultNameFilter"
            onChange={(e) => handleSort(e.target.value)}
          >
            <FilterOption value="defaultNameFilter" disabled>
              Select a filter
            </FilterOption>
            <FilterOption value="randomFilter">Random</FilterOption>
            <FilterOption value="lowToHigh">Price Low to High</FilterOption>
            <FilterOption value="highToLow">Price High to Low</FilterOption>
          </FilterSelect>
        </div>
        <div className="RighCenter">
          <FilterSelect
            name="Category"
            defaultValue="defaultNameFilter"
            onChange={(e) => categorised(e.target.value)}
          >
            <FilterOption value="defaultNameFilter" disabled>
              Category
            </FilterOption>
            <FilterOption value="">All</FilterOption>
            {distinctCategory.map((item, index) => (
              <FilterOption key={index} value={item}>
                {item}
              </FilterOption>
            ))}
          </FilterSelect>
        </div>
        <div className="right">
          <Pagebutton
            style={{
              background:
                currentPage === totalPages ? "grey" : "crimson",
              color: currentPage === totalPages ? "black" : "white",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
            onClick={
              currentPage === totalPages
                ? null
                : () => setCurrentPage(currentPage + 1)
            }
          >
            Next
          </Pagebutton>
        </div>
      </Filternav>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {sortedData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item) => (
              <Card key={item.id}>
                <Top>
                  <img src={item.thumbnail} alt={item.title} />
                </Top>
                <Bottom>
                  <Title>{item.title}</Title>
                  <Category>{item.category}</Category>
                  <Price>{item.price * 75}₹({item.price}$)</Price>
                </Bottom>
              </Card>
            ))}
        </div>
        <Pagination style={{ display: "flex", gap: "5px" }}>
          <Pagebutton
            style={{
              background: currentPage === 1 ? "grey" : "rgb(110 162 217)",
              color: currentPage === 1 ? "black" : "white",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
            onClick={
              currentPage === 1 ? null : () => setCurrentPage(currentPage - 1)
            }
          >
            Prev
          </Pagebutton>
          {[...Array(totalPages).keys()].map((page) => (
            <Pagebutton
              style={{
                background: currentPage == page + 1 ? "#1a4062" : "white",
                color: currentPage == page + 1 ? "white" : " #007bff",
                fontSize: currentPage == page + 1 ? "21px" : "14px",
              }}
              key={page}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagebutton>
          ))}
          <Pagebutton
            style={{
              background:
                currentPage === totalPages ? "grey" : "rgb(110 162 217)",
              color: currentPage === totalPages ? "black" : "white",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
            onClick={
              currentPage === totalPages
                ? null
                : () => setCurrentPage(currentPage + 1)
            }
          >
            Next
          </Pagebutton>
        </Pagination>
      </div>
    </div>
  );
};

export default Main;
