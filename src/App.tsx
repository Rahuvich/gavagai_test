import React, { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { CallbackObject, Searchbar } from "./ui/Searchbar";
import { HomePage } from "./ui/pages/Home";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { WordPage } from "./ui/pages/WordPage";

function App() {
  const { data, isLoading } = useFetch({
    url: `https://api.gavagai.se/v3/languages?apiKey=${process.env.REACT_APP_API_KEY}`,
  });

  const [state, setState] = useState<CallbackObject>({});

  return (
    <Router>
      <div className="flex flex-col items-center h-screen w-screen">
        <div className="flex flex-row w-full justify-center items-center bg-pink-400 shadow-lg">
          <div className="flex flex-row w-full justify-between items-center max-w-screen-lg ">
            <Link
              className="uppercase text-white font-bold tracking-widest px-4 py-2"
              to={`/`}
            >
              Home
            </Link>
            <Searchbar
              languages={data}
              disabled={isLoading}
              onFetched={(data) => {
                setState(data);
              }}
            />
          </div>
        </div>
        <Switch>
          <Route path="/:lang/:word">
            <WordPage />
          </Route>
          <Route path="/">
            <HomePage
              isLoading={!state?.language && !state?.semanticallySimilarWords}
              language={state?.language}
              semanticallySimilarWords={state?.semanticallySimilarWords}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
