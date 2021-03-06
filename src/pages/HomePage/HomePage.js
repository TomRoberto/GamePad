import "./home-page.scss";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/logo.png";

import Loader from "../../components/Loader";

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

  const history = useHistory();

  const ref = useRef();

  // For loading data
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

  //For closing type, platform and ordering on click outside
  useEffect(() => {
    const checkIfClickOutside = (event) => {
      if (showType && ref.current && !ref.current.contains(event.target)) {
        setShowType(false);
      }
      if (showPlatforms && ref.current && !ref.current.contains(event.target)) {
        setShowPlatforms(false);
      }
      if (showOrdering && ref.current && !ref.current.contains(event.target)) {
        setShowOrdering(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside);
    };
  }, [showType, showPlatforms, showOrdering]);

  //For scrolling to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const orderingTab = [
    "Name",
    "Released",
    "Added",
    "Created",
    "Updated",
    "Rating",
    "Metacritic",
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
    <Loader />
  ) : (
    <div className="home-page">
      <div className="home-page-container">
        <div
          onClick={() => {
            history.push("/");
          }}
        >
          <img src={logo} alt="" />
          <p>GamePad</p>
        </div>
        <div>
          <div className="input-container">
            <input
              placeholder="Search for a game..."
              type="text"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <FontAwesomeIcon icon="search" />
          </div>

          <p>Search {data.count} games</p>
        </div>
        <div>
          <div>
            {showType ? (
              <ul
                ref={showType ? ref : null}
                // onBlur={() => {
                //   setShowType(false);
                // }}
              >
                <li
                  onClick={() => {
                    setGenres("");
                    setShowType(false);
                  }}
                >
                  All
                </li>
                {genresData.results.map((elem, index) => {
                  return (
                    <>
                      <li
                        key={index}
                        onClick={() => {
                          handleGenreChange(elem);
                        }}
                      >
                        {elem.name}
                        {elem.id === genres.id && (
                          <FontAwesomeIcon icon="check" />
                        )}
                      </li>
                    </>
                  );
                })}
              </ul>
            ) : (
              <p
                onClick={() => {
                  setShowType(true);
                }}
              >
                {genres ? (
                  <div>
                    <p>Type :</p> <span> {genres.name}</span>
                  </div>
                ) : (
                  <div>
                    <p>Type :</p> <span>All</span>
                  </div>
                )}
                <FontAwesomeIcon icon="chevron-down" />
              </p>
            )}
          </div>
          <div>
            {showPlatforms ? (
              <ul ref={showPlatforms ? ref : null}>
                <li
                  onClick={() => {
                    setPlatforms("");
                    setShowPlatforms(false);
                  }}
                >
                  All
                </li>
                {platformData.results.map((elem, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        handlePlatformChange(elem);
                      }}
                    >
                      {elem.name}
                      {elem.id === platforms.id && (
                        <FontAwesomeIcon icon="check" />
                      )}
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
                {platforms ? (
                  <div>
                    <p>Platform :</p> <span>{platforms.name}</span>
                  </div>
                ) : (
                  <div>
                    <p>Platform :</p> <span>All</span>
                  </div>
                )}
                <FontAwesomeIcon icon="chevron-down" />
              </p>
            )}
          </div>
          <div ref={showOrdering ? ref : null}>
            {showOrdering ? (
              <>
                <p
                  className="order"
                  onClick={() => {
                    setOrdering("");
                    setShowOrdering(false);
                  }}
                >
                  Relevance
                </p>
                {orderingTab.map((elem, index) => {
                  return (
                    <p
                      className="order"
                      key={index}
                      onClick={() => {
                        if (ordering === elem.toLowerCase()) {
                          setOrdering("");
                        } else {
                          setOrdering(elem.toLowerCase());
                        }
                        setShowOrdering(false);
                      }}
                    >
                      {elem}
                      {elem.toLowerCase() === ordering ? (
                        <FontAwesomeIcon icon="check" />
                      ) : null}
                    </p>
                  );
                })}
              </>
            ) : (
              <p
                onClick={() => {
                  setShowOrdering(true);
                }}
              >
                {ordering ? (
                  <div>
                    <p>Sort by :</p> <span>{ordering}</span>
                  </div>
                ) : (
                  <div>
                    <p>Sort by :</p> <span> Relevance</span>{" "}
                  </div>
                )}
                <FontAwesomeIcon icon="chevron-down" />
              </p>
            )}
          </div>
        </div>

        <div>
          {data.results.map((elem, index) => {
            console.log(elem.background_image);
            return (
              <div
                className="game"
                key={index}
                onClick={() => {
                  history.push(`/game/${elem.slug}`);
                }}
              >
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
    </div>
  );
};

export default HomePage;
