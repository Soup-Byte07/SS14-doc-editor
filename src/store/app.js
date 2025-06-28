import { configureStore } from '@reduxjs/toolkit'
import templateList from './features/templateListStore.js'

export default configureStore({
  reducer: {
    templateList
  }
})
