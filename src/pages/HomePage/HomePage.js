import "./home-page.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [pageStep, setPageStep] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(40);
  const [platforms, setPlatforms] = useState("");
  const [genres, setGenres] = useState("");
  const [ordering, setOrdering] = useState("");

  const [showType, setShowType] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [showOrdering, setShowOrdering] = useState(false);

  const [platformData, setplatformData] = useState();
  const [genresData, setgenresData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://api.rawg.io/api/games?key=fc2881ec57b14a3682ccfd3064e510d4&page=${page}&search=${search}&page_size=${pageSize}&ordering=${ordering}`;
      if (platforms) {
        url += `&platforms=${String(platforms.id)}`;
      }
      if (genres) {
        url += `&genres=${String(genres.id)}`;
      }
      try {
        const response = await axios.get(url);
        const responsePlatform = await axios.get(
          "https://api.rawg.io/api/platforms?key=fc2881ec57b14a3682ccfd3064e510d4"
        );
        const responseType = await axios.get(
          "https://api.rawg.io/api/genres?key=fc2881ec57b14a3682ccfd3064e510d4"
        );
        setData(response.data);
        setgenresData(responseType.data);
        setplatformData(responsePlatform.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, search, pageSize, platforms, genres, ordering]);

  const orderingTab = [
    "name",
    "released",
    "added",
    "created",
    "updated",
    "rating",
    "metacritic",
  ];

  const handleGenreChange = (genre) => {
    if (genres.id === genre.id) {
      setGenres("");
    } else {
      setGenres(genre);
    }
    setShowType(false);
  };

  const handlePlatformChange = (platform) => {
    if (platforms.id === platform.id) {
      setPlatforms("");
    } else {
      setPlatforms(platform);
    }
    setShowPlatforms(false);
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="home-page">
      <input
        type="text"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <p>search {data.count} games</p>
      <div>
        {showType ? (
          <ul>
            {genresData.results.map((elem, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handleGenreChange(elem);
                  }}
                >
                  {elem.name}
                </li>
              );
            })}
          </ul>
        ) : (
          <p
            onClick={() => {
              setShowType(true);
            }}
          >
            {genres ? genres.name : "Type"}
          </p>
        )}
      </div>
      <div>
        {showPlatforms ? (
          <ul>
            {platformData.results.map((elem, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handlePlatformChange(elem);
                  }}
                >
                  {elem.name}
                </li>
              );
            })}
          </ul>
        ) : (
          <p
            onClick={() => {
              setShowPlatforms(true);
            }}
          >
            {platforms ? platforms.name : "Platform"}
          </p>
        )}
      </div>
      <div>
        {showOrdering ? (
          orderingTab.map((elem, index) => {
            return (
              <p
                key={index}
                onClick={() => {
                  if (ordering === elem) {
                    setOrdering("");
                  } else {
                    setOrdering(elem);
                  }
                  setShowOrdering(false);
                }}
              >
                {elem}
              </p>
            );
          })
        ) : (
          <p
            onClick={() => {
              setShowOrdering(true);
            }}
          >
            Sort by {ordering ? ordering : "relevance"}
          </p>
        )}
      </div>
      <div>
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
      <div className="pages">
        {data.results.map((elem, index) => {
          return index + 1 >= page - 2 && index + 1 <= page + 2 ? (
            <button
              className={index + 1 === page && `page`}
              key={index}
              onClick={() => {
                setPage(index + 1);
              }}
            >
              <p>{index + 1}</p>
            </button>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default HomePage;
