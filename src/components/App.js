import React, { useEffect } from "react";
import "../styles/App.css";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./store";

const API_KEY = "068e2971b1d74bfc96fa703c112fc5be"; //Get your own api key from newsapi

const App = () => {
  const dispatch = useDispatch();
  const newsObj = useSelector((state) => state.hotNews);
  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
      .then((json) => json.json())
      .then((obj) => {
        dispatch(actions.set({ articles: obj.articles, num: 5 }));
      });
  }, []);

  const numChangeHandler = (e) => {
    dispatch(actions.setNum({ num: e.target.value }));
  };

  let articles = [...newsObj.articles];

  const filteredArticles = articles
    .sort(() => Math.random() - 0.5)
    .slice(0, newsObj.articlesNum);
  console.log(filteredArticles);

  return (
    <div id="main">
      <h2>Top News Articles</h2>
      <div>
        <label htmlFor="num">Enter Number of articles</label>
        <input
          type="number"
          id="num"
          onChange={numChangeHandler}
          min={1}
        ></input>
      </div>
      {newsObj.articlesNum !== 0 ? (
        <div>
          <h3>Top {newsObj.articlesNum} articles</h3>
          <ul id="articles">
            {filteredArticles.map((item) => {
              return (
                <li>
                  <div className="article">
                    Author: {item.author}
                    <h2>{item.title}</h2>
                    <img src={item.urlToImage}></img>
                    <p>
                      {item.content === null
                        ? "No Content for this article"
                        : item.content}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Please wait Loading...</p>
      )}
    </div>
  );
};

export default App;
