import { createSlice } from '@reduxjs/toolkit'

export const templateListSlice = createSlice({
  name: "templateList",
  initialState: {
    templates: [
      {
        title: "Sample",
        contents: "I feel like [color=red][bold]im 4 different people[/bold][/color] at once",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    selectedTemplate: null,
    error: null
  },
  reducers: {
    loadTemplates: (state) => {
      const storedTemplates = localStorage.getItem("list-templates");
      if (storedTemplates) {
        state.templates = JSON.parse(storedTemplates);
      } else {
        localStorage.setItem("list-templates", JSON.stringify(state.templates));
      }
    },
    addToTemplate: (state, action) => {
      const newTemplate = action.payload;
      state.templates.push(newTemplate);
      localStorage.setItem("list-templates", JSON.stringify(state.templates));
    },
    selectTemplate: (state, action) => {
      console.log(state.selectedTemplate)
      const selectedTemplate = action.payload;
      state.selectedTemplate = state.templates[selectedTemplate];
    },
    getTemplates: (state) => {
      return state.templates
    }
  }
})

export const { loadTemplates, addToTemplate, selectTemplate, getTemplates } = templateListSlice.actions
export default templateListSlice.reducer
