import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type Country = {
  picture: string;
  code: string;
};

export type PlayerData = {
  rank: number;
  points: number;
  weight: number;
  height: number;
  age: number;
  last: number[];
};

export type Player = {
  id: number;
  firstname: string;
  lastname: string;
  shortname: string;
  sex: string;
  country: Country;
  picture: string;
  data: PlayerData;
};

type PlayerState = {
  loading: boolean;
  players: Player[];
  error: string;
};
const initialState: PlayerState = {
  loading: false,
  players: [],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchPlayers = createAsyncThunk('player/fetchPlayers', () => {
  return axios.get('/api/players').then((response) => response.data);
});

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlayers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchPlayers.fulfilled,
      (state, action: PayloadAction<Player[]>) => {
        state.loading = false;
        state.players = action.payload;
        state.error = '';
      },
    );
    builder.addCase(fetchPlayers.rejected, (state, action) => {
      state.loading = false;
      state.players = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default playerSlice.reducer;
