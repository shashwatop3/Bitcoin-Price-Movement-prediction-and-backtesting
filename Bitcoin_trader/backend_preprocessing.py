#!/usr/bin/env python
# coding: utf-8


from sklearn.preprocessing import LabelBinarizer, LabelEncoder
import pandas as pd
import numpy as np
import pandas_ta as ta
import logging
logging.basicConfig(level=logging.INFO)

def dataPipeline(df):
    # logging.info(f"Input DataFrame: {df.head()}")
    #convert Open_time to datetime format
    if 'Open_time' not in df.columns:
        raise KeyError("The column 'Open_time' is missing from the DataFrame.")

    df['Open_time'] = pd.to_datetime(df['Open_time'])
    df.set_index('Open_time', inplace=True)
    # Select and preprocess required columns
    # Adjusted indicators for short-term predictions
    df.ta.sma(length=10, append=True)  # Short-term SMA
    df.ta.ema(length=10, append=True)  # Short-term EMA
    df.ta.wma(length=10, append=True)  # Short-term WMA
    df.ta.macd(fast=5, slow=8, append=True)  # Faster MACD signals
    df.ta.rsi(length=7, append=True)  # Shorter RSI for quicker overbought/oversold signals
    df.ta.bbands(length=10, append=True)  # Shorter Bollinger Bands for volatility
    df.ta.adx(length=7, append=True)  # Shorter ADX for quicker trend strength analysis
    df.ta.stoch(length=7, append=True)  # Shorter Stochastic Oscillator
    df.ta.willr(length=7, append=True)  # Shorter Williams %R
    df.ta.roc(length=5, append=True)  # Shorter ROC for quicker momentum analysis
    df.ta.cci(length=10, append=True)  # Shorter CCI for quicker overbought/oversold signals
    df.ta.atr(length=7, append=True)  # Shorter ATR for quicker volatility analysis

    # Additional indicators
    df.ta.tsi(length=10, append=True)       # Shorter True Strength Index
    df.ta.ichimoku(append=True)             # Ichimoku Cloud (default settings)
    df.ta.obv(append=True)                  # On-Balance Volume (no window size)
    df.ta.vwap(append=True)                 # Volume Weighted Average Price (no window size)
    df.ta.donchian(length=10, append=True)  # Shorter Donchian Channels
    df.ta.ema(length=5, append=True)        # Very short-term EMA



    df.drop(['Open', 'High', 'Low'], axis=1, inplace=True)
    df.dropna(inplace=True)
    df.reset_index(inplace=True)
    X = df
    return X



