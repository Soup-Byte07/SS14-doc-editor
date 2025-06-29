import { createSlice } from '@reduxjs/toolkit'

export const templateListSlice = createSlice({
  name: "templateList",
  initialState: {
    templates: [
      {
        title: "Sample",
        contents: "I feel like [color=red][bold]im 4 different people[/bold][/color] at once",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: 1
      }
    ],
    selectedTemplate: null,
    error: null
  },
  reducers: {
    loadTemplates: (state) => {
      const storedTemplates = localStorage.getItem("list-templates")
      if (storedTemplates) {
        state.templates = JSON.parse(storedTemplates)
      } else {
        localStorage.setItem("list-templates", JSON.stringify(state.templates))
      }
    },
    addToTemplate: (state, action) => {
      const newTemplate = action.payload
      state.templates.push(newTemplate)
      localStorage.setItem("list-templates", JSON.stringify(state.templates))
    },
    updateTemplate: (state, action) => {
      const selectedTemplate = state.selectedTemplate
      if (selectedTemplate) {
        const updatedTemplate = {
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
        state.templates[state.templates.findIndex(a => a.id == selectedTemplate.id)] = updatedTemplate
        localStorage.setItem("list-templates", JSON.stringify(state.templates))
      } else {
        state.error = "No template selected for update."
      }
    },
    removeTemplate: (state, action) => {
      if(action.payload == state.selectedTemplate?.id) state.selectedTemplate = null

      const templateId = action.payload
      state.templates = state.templates.filter(template => template.id !== templateId)
      localStorage.setItem("list-templates", JSON.stringify(state.templates))
    },
    unselectTemplate: (state) => void(state.selectedTemplate = null),
    selectTemplate: (state, action) => {
      const selectedTemplate = action.payload
      state.selectedTemplate = state.templates[selectedTemplate]
    },
    getTemplates: (state) => {
      return state.templates
    }
  }
})

export const { loadTemplates, addToTemplate, updateTemplate, removeTemplate, unselectTemplate, selectTemplate, getTemplates } = templateListSlice.actions
export default templateListSlice.reducer
