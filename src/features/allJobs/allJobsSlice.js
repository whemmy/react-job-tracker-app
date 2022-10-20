import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getAllJobThunk } from '../allJobs/allJobsThunk'
import customFetch from '../../utils/axios'
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
    try {
      const response = await customFetch.get(`/jobs/showStats`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
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
  },
})
export const { showLoading, hideLoading } = allJobsSlice.actions
export default allJobsSlice.reducer