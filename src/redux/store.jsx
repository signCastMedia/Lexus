import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './slices/projectSlice'
import authReducer from './slices/authSlice'
import floorplanReducer from './slices/floorSlice'
import themeReducer from './slices/themeSlice'
import unitReducer from './slices/unitSlice'
import accountReducer from './slices/accountsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project:projectReducer,
    themes:themeReducer,
    units:unitReducer,
    accountMain:accountReducer,
  },
})