import { CryptoCurrencyState } from "../cryptoSlice";
import { ArrowUp, ArrowDown } from "lucide-react"; // Optional: icons from lucide-react (very light-weight)

interface Props {
  cryptos: CryptoCurrencyState[];
}

const formatNumber = (num: number, decimals: number) =>
  num.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });

const formatShortNumber = (num: number) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
};

const CryptoCurrency = ({ cryptos }: Props) => {
  return (
    <div className='overflow-x-auto w-full'>
      <table className='h-[70vh] min-w-[1000px] border-x-2 border-t-2 border-slate-200 p-5 w-full'>
        <thead>
          <tr className='border-b-2 border-slate-200'>
            <td className='font-bold p-2 text-center'>#</td>
            <td className='font-bold p-2 text-left w-[200px]'>Name</td>
            <td className='font-bold p-2 text-center'>Price</td>
            <td className='font-bold p-2 text-center'>1h %</td>
            <td className='font-bold p-2 text-center'>24h %</td>
            <td className='font-bold p-2 text-center'>7d %</td>
            <td className='font-bold p-2 text-center'>Market Cap</td>
            <td className='font-bold p-2 text-center'>Volume (24h)</td>
            <td className='font-bold p-2 text-left w-[300px] lg:w-[180px]'>
              Circulating Supply
            </td>
            <td className='font-bold p-2 text-left w-[200px]'>
              Last 7 days
            </td>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => {
            const priceChangeColor =
              crypto.percent_change_24h > 0
                ? "text-green-500"
                : crypto.percent_change_24h < 0
                ? "text-red-500"
                : "text-black";
            const percentColor1h =
              crypto.percent_change_1h > 0 ? "text-green-500" : "text-red-500";
            const percentColor24h =
              crypto.percent_change_24h > 0 ? "text-green-500" : "text-red-500";
            const percentColor7d =
              crypto.percent_change_7d > 0 ? "text-green-500" : "text-red-500";

            return (
              <tr className='border-b-2 border-slate-200' key={index}>
                <td className='text-center p-2'>{index + 1}</td>
                <td className='h-20 p-2'>
                  <div className='flex items-center gap-2'>
                    <img
                      src={`/icons/${crypto.symbol.toLowerCase()}.png`}
                      className='size-6'
                      alt='logo'
                    />
                    <div>
                      <h1 className='font-semibold'>{crypto.name}</h1>
                      <h1 className='text-slate-400 text-xs'>
                        {crypto.symbol}
                      </h1>
                    </div>
                  </div>
                </td>
                <td className={`p-2 font-semibold ${priceChangeColor}`}>
                  ${formatNumber(crypto.price, 2)}
                </td>
                <td className={`p-2 font-semibold ${percentColor1h}`}>
                  <div className='flex items-center gap-1items-center gap-1'>
                    {crypto.percent_change_1h > 0 ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowDown size={12} />
                    )}
                    {crypto.percent_change_1h.toFixed(2)}%
                  </div>
                </td>
                <td className={`p-2 font-semibold ${percentColor24h}`}>
                  <div className='flex items-center gap-1items-center gap-1'>
                    {crypto.percent_change_24h > 0 ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowDown size={12} />
                    )}
                    {crypto.percent_change_24h.toFixed(2)}%
                  </div>
                </td>
                <td className={`p-2 font-semibold ${percentColor7d}`}>
                  <div className='flex items-center gap-1items-center gap-1'>
                    {crypto.percent_change_7d > 0 ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowDown size={12} />
                    )}
                    {crypto.percent_change_7d.toFixed(2)}%
                  </div>
                </td>
                <td className='p-2 font-semibold'>
                  ${formatNumber(crypto.market_cap, 0)}
                </td>
                <td className='p-2'>
                  <div className='flex flex-col items-end'>
                    <h1 className='font-semibold'>
                      ${formatNumber(crypto.volume_24h, 0)}
                    </h1>
                    <h1 className='text-slate-400 text-xs'>
                      {formatShortNumber(crypto.volume_24h / crypto.price)}{" "}
                      {crypto.symbol}
                    </h1>
                  </div>
                </td>
                <td className='p-2 font-semibold'>
                  {formatShortNumber(crypto.circulating_supply)} {crypto.symbol}
                </td>
                <td className='p-2'>
                  <img
                    src={`/charts/${crypto.symbol.toLowerCase()}.svg`}
                    alt='chart'
                    className='object-fill'
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoCurrency;
