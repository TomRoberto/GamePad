import "./game-page.scss";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const GamePage = ({ token }) => {
  const [data, setData] = useState();
  const [otherGamesData, setOtherGamesData] = useState();
  const [favoriteData, setFavoriteData] = useState();

  const [refresh, setRefresh] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const history = useHistory();
  const { slug } = params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${slug}?key=fc2881ec57b14a3682ccfd3064e510d4`
        );
        const response2 = await axios.get(
          `https://api.rawg.io/api/games/${slug}/game-series?key=fc2881ec57b14a3682ccfd3064e510d4`
        );
        if (token) {
          const responseFavorites = await axios.get(
            "http://localhost:4000/favorite/get",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFavoriteData(responseFavorites.data);
        }

        setData(response.data);
        setOtherGamesData(response2.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [slug, refresh]);

  const checkIfFavorite = () => {
    if (favoriteData) {
      for (let i = 0; i < favoriteData.favorite.length; i++) {
        if (favoriteData.favorite[i].gameData.slug === slug) {
          return true;
        }
      }
    }
  };

  const handleFavorite = async () => {
    if (token) {
      if (!checkIfFavorite()) {
        const response = await axios.post(
          "http://localhost:4000/favorite/create",
          { game: data },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        const response = await axios.post(
          "http://localhost:4000/favorite/delete",
          { game: data },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setRefresh(refresh + 1);
    } else {
      history.push("/login");
    }
  };

  let platforms = "";
  let genres = "";
  let developers = "";
  let publishers = "";
  if (data) {
    for (let i = 0; i < data.platforms.length; i++) {
      if (platforms) {
        platforms += ", " + data.platforms[i].platform.name;
      } else {
        platforms += data.platforms[i].platform.name;
      }
    }
    for (let i = 0; i < data.genres.length; i++) {
      if (genres) {
        genres += ", " + data.genres[i].name;
      } else {
        genres += data.genres[i].name;
      }
    }
    for (let i = 0; i < data.developers.length; i++) {
      if (developers) {
        developers += ", " + data.developers[i].name;
      } else {
        developers += data.developers[i].name;
      }
    }
    for (let i = 0; i < data.publishers.length; i++) {
      if (publishers) {
        publishers += ", " + data.publishers[i].name;
      } else {
        publishers += data.publishers[i].name;
      }
    }
  }

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="game-page">
      <div className="game-container">
        <div className="title">
          <h1>{data.name}</h1>
        </div>
        <article>
          <div className="img-container">
            <img src={data.background_image} alt="" />
          </div>
          <div className="descriptions">
            <div>
              <button
                className={checkIfFavorite() ? "fav button" : "button"}
                onClick={() => {
                  handleFavorite();
                }}
              >
                {checkIfFavorite()
                  ? "Saved to collection"
                  : "Save to Collection"}
              </button>
              <button className="button">Add a review</button>
            </div>
            <div>
              <div>
                <h3>Platforms</h3>
                <p>{platforms}</p>
              </div>
              <div>
                <h3>Genre</h3>
                <p>{genres}</p>
              </div>
            </div>
            <div>
              <div>
                <h3>Released date</h3>
                <p>{data.released}</p>
              </div>
              <div>
                <h3>Developer</h3>
                <p>{developers}</p>
              </div>
            </div>
            <div>
              <div>
                <h3>Publisher</h3>
                <p>{publishers}</p>
              </div>
              <div>
                <h3>Age rating</h3>{" "}
                <p>{data.esrb_rating ? data.esrb_rating.name : "None"}</p>
              </div>
            </div>
            <div>
              <h3>About</h3>
              <p>{data.description.replace(/(<([^>]+)>)/gi, "")}</p>
            </div>
          </div>
        </article>
        <section className="othergames">
          <div>
            <h2>Games like {data.name}</h2>
          </div>
          <div className="games">
            {otherGamesData.results.map((elem, index) => {
              return (
                index < 5 && (
                  <div
                    className="game"
                    key={index}
                    onClick={() => {
                      history.push(`/game/${elem.slug}`);
                    }}
                  >
                    <img src={elem.background_image} alt="" />
                    <p>{elem.name}</p>
                  </div>
                )
              );
            })}
          </div>
        </section>
        <section>
          <h2>Reviews</h2>
          <p>Most relevant reviews</p>
        </section>
      </div>
    </div>
  );
};

export default GamePage;
