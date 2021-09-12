import "./collection-page.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import notify from "../../components/ReactToastify";
import Loader from "../../components/Loader";

const CollectionPage = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  // const [redirect, setRedirect] = useState(0);

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
    notify("Favorite deleted", "green-toastify");
    setRefresh(refresh + 1);
  };

  const history = useHistory();

  return token ? (
    isLoading ? (
      <Loader />
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
    )
  ) : (
    <Redirect to="/" />
  );
};

export default CollectionPage;
