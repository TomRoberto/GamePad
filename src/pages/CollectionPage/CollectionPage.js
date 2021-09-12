import "./collection-page.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CollectionPage = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/favorite/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [refresh, data]);

  const handleUnfav = async (game) => {
    const response = await axios.post(
      "http://localhost:4000/favorite/delete",
      {
        game: game,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRefresh(refresh + 1);
  };

  const history = useHistory();

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="collection-page">
      <div className="container">
        <header>
          <h1>My Collection</h1>
        </header>
        <>
          <div className="games">
            {data.favorite.map((elem, index) => {
              return (
                <div className="game" key={index}>
                  <img src={elem.gameData.background_image} alt="" />
                  <p
                    onClick={() => {
                      history.push(`/game/${elem.gameData.slug}`);
                    }}
                  >
                    {elem.gameData.name}
                  </p>
                  <FontAwesomeIcon
                    className="star"
                    icon="star"
                    onClick={() => {
                      handleUnfav(elem.gameData);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </>
      </div>
    </div>
  );
};

export default CollectionPage;
