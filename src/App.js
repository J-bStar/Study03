import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState();
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <h1>
        💌 The Coin Tracker (Coins: {loading ? "0" : `<${coins.length}>`}) 💌
      </h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          $
          <input
            type="number"
            value={value}
            onChange={onChange}
            placeholder="Put USD here"
          />
          <span>----▶</span>
          <select>
            {coins.map((coin) => (
              <option>
                {coin.name} (${coin.symbol} :
                {value ? value / coin.quotes["USD"].price : 0} {coin.symbol})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default App;
