import customFetch from '../../utils/axios'
import { logoutUser } from '../user/userSlice'
import { clearValues } from '../job/jobSlice'
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice'
import authHeader from '../../utils/authHeader'

// const authHeader = (thunkAPI) => {
//   return {
//     headers: {
//       authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//     },
//   }
// }

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const response = await customFetch.post('/jobs', job, authHeader(thunkAPI))
    thunkAPI.dispatch(clearValues())
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const response = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    thunkAPI.dispatch(getAllJobs())
    return response.data.msg
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const response = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    thunkAPI.dispatch(clearValues())
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
