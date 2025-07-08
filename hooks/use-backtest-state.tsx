import { create } from "zustand";

export type BacktestState = {
  days: number;
  stop_loss: number;
  take_profit: number;
  initial_capital: number;
  Quantity: number;
  transaction_fee_rate: number;
};

type BacktestStore = {
  state: BacktestState;
  setBacktestState: (newState: Partial<BacktestState>) => void;
};

export const useBacktestState = create<BacktestStore>((set) => ({
  state: {
    days: 365,
    stop_loss: 0.007,
    take_profit: 0.021,
    initial_capital: 100000,
    Quantity: 0.2,
    transaction_fee_rate: 0.005,
  },
  setBacktestState: (newState) =>
    set((store) => ({
      state: { ...store.state, ...newState }, // Merge new state with the existing state
    })),
}));
