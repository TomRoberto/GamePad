import "./home-page.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.rawg.io/api/games?key=fc2881ec57b14a3682ccfd3064e510d4"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="home-page">
      <input type="text" />
      <p>search {data.count} games</p>
      <p>Most relevant games</p>
      {data.results.map((elem, index) => {
        console.log(elem.background_image);
        return (
          <div className="game" key={index}>
            <img src={elem.background_image} alt="Game" />
            <p>{elem.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
