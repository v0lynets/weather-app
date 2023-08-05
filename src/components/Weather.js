import Day from "./Day";
export default function Weather({ weather }) {
  return (
    <>
      <h2>
        Weather {weather.name} {weather.flag}
      </h2>
      <div className="weather">
        {weather.time.map((date, i) => (
          <Day
            icon={weather.icons.at(i)}
            day={weather.time.at(i)}
            min={weather.temperature_2m_min.at(i).toFixed(0)}
            max={weather.temperature_2m_max.at(i).toFixed(0)}
            key={i}
          />
        ))}
      </div>
    </>
  );
}
