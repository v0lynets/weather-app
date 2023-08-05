import { useRef } from "react";
import { useWeather } from "../hooks/useWeather";
import { useKey } from "../hooks/useKey";
import { useLocalStorage } from "../hooks/useLocalStorage";

import Loader from "./Loader";
import Error from "./Error";
import Weather from "./Weather";
function App() {
  const [query, setQuery] = useLocalStorage([], "query");
  const { weather, isLoading, error } = useWeather(query);
  const inputEl = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <div className="app">
      <h1>Weather Forecast</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search from location"
        ref={inputEl}
      />
      {isLoading && <Loader />}
      {!error && !isLoading && Object.keys(weather).length ? (
        <Weather weather={weather} />
      ) : (
        ""
      )}
      {error && <Error error={error} />}
    </div>
  );
}

export default App;
