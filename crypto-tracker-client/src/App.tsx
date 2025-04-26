import axios from "axios";
import CryptoCurrency from "./components/CryptoCurrency";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setCryptos } from "./cryptoSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const cryptos = useAppSelector((state) => state.crypto);
  const SIZE = 5;

  const fetchCryptoListings = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/cryptocurrency/listings?limit=${SIZE}`
      );

      const mappedCryptos = response.data.data.map((item: any) => ({
        name: item.name,
        symbol: item.symbol,
        circulating_supply: item.circulating_supply,
        currency: "USD",
        price: item.quote.USD.price,
        volume_24h: item.quote.USD.volume_24h,
        volume_change_24h: item.quote.USD.volume_change_24h,
        percent_change_1h: item.quote.USD.percent_change_1h,
        percent_change_24h: item.quote.USD.percent_change_24h,
        percent_change_7d: item.quote.USD.percent_change_7d,
        market_cap: item.quote.USD.market_cap,
      }));
      dispatch(setCryptos(mappedCryptos));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (cryptos.length > 0) {
      interval = setInterval(() => {
        const updatedCryptos = cryptos.map((crypto) => {
          const randomFactor = 1 + (Math.random() - 0.5) * 0.02;
          const newPrice = crypto.price * randomFactor;
          const percentChange =
            ((newPrice - crypto.price) / crypto.price) * 100;

          return {
            ...crypto,
            price: newPrice,
            percent_change_1h: crypto.percent_change_1h + percentChange,
            percent_change_24h: crypto.percent_change_24h + percentChange * 5,
            percent_change_7d: crypto.percent_change_7d + percentChange * 10,
            volume_24h: crypto.volume_24h * (1 + (Math.random() - 0.5) * 0.05),
          };
        });

        dispatch(setCryptos(updatedCryptos));
      }, Math.random() * 1000 + 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cryptos, dispatch]);

  useEffect(() => {
    fetchCryptoListings();
  }, []);

  useEffect(() => {
    if (cryptos.length > 0) {
      setLoading(false);
    }
  }, [cryptos]);

  return (
    <section className='h-screen flex flex-col items-center justify-center space-y-5 p-4'>
      <h1 className='text-2xl font-bold'>Crypto Price Tracker</h1>
      {loading ? (
        <h1 className='text-2xl'>Loading...</h1>
      ) : (
        <CryptoCurrency cryptos={cryptos} />
      )}
    </section>
  );
}

export default App;
