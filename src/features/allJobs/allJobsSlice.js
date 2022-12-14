import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getAllJobThunk, showStatsThunk } from '../allJobs/allJobsThunk'

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export const getAllJobs = createAsyncThunk(
  'allJobs/getAllJobs',
  async (_, thunkAPI) => {
    return getAllJobThunk('/jobs', thunkAPI)
  }
)

export const showStats = createAsyncThunk(
  'allJobs/showStats',
  async (_, thunkAPI) => {
    return showStatsThunk('/jobs/stats', thunkAPI)
  }
)

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.jobs = payload.jobs
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [showStats.pending]: (state) => {
      state.isLoading = true
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.stats = payload.defaultStats
      state.monthlyApplications = payload.monthlyApplications
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})
export const { showLoading, hideLoading } = allJobsSlice.actions
export default allJobsSlice.reducer
