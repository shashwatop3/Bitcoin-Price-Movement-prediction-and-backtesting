"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  type: string;
  entry_price: number;
  quantity: number;
  entry_date: string;
  stoploss: number;
  takeprofit: number;
};

export const openPositionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value === "buy" ? "Buy" : "Sell";
    },
  },
  {
    accessorKey: "entry_price",
    header: "Entry Price",
  },
  {
    accessorKey: "entry_date",
    header: "Entry Date-time",
  },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "stoploss",
        header: "Stop Loss",
    },
    {
        accessorKey: "takeprofit",
        header: "Take Profit",
    },

];
