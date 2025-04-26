import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CryptoCurrencyState {
  name: string;
  symbol: string;
  circulating_supply: number;
  currency: string;
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
}

const initialState: CryptoCurrencyState[] = [];

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCryptos: (_state, action: PayloadAction<CryptoCurrencyState[]>) => {
      return action.payload;
    },
    resetCryptos: () => {
      return [];
    },
  },
});

export const { setCryptos, resetCryptos } = cryptoSlice.actions;
export default cryptoSlice.reducer;
