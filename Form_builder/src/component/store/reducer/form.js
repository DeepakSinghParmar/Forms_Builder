import { createSlice } from "@reduxjs/toolkit";

import {
  setForm,
  setFormItems,
  deleteFormItems,
  setDescription,
  setTitle,
  deleteForm,
  getAllForm,
  getForm,
  getFormData,
  formEnable,
  formDisable,
  getFormVisual,
} from "../action/form";

const Form = createSlice({
  name: "form",
  initialState: {
    form: [],
    formFieldData: [],
    pending: true,
    show: false,
    visible: false,
    data: [],
    DrawerTitle: "Untitled",
    NoForm: false,
    editForm: false,
    chartview: false,
    visual: [],
    visualLoad: false,
  },
  reducers: {
    setChartviewTrue(state) {
      state.chartview = true;
    },
    setChartviewFalse(state) {
      state.chartview = false;
    },
    setDrawerVisibleTure(state) {
      state.visible = true;
    },
    setDrawerVisibleFalse(state) {
      state.visible = false;
    },
    setDrawerTitle(state, action) {
      state.DrawerTitle = action.payload.title;
    },
    setDrawerData(state, action) {
      state.data = action.payload.data;
    },

    setFieldData(state, action) {
      const ques = action.payload.data.ques;
      const index = state.formFieldData.findIndex((x) => x.ques === ques);
      if (index === -1) {
        state.formFieldData.push(action.payload.data);
      } else {
        state.formFieldData[index].ans = action.payload.data.ans;
      }
    },
    setTrue(state) {
      state.pending = true;
    },
    setFalse(state) {
      state.pending = false;
    },
    show(state, action) {
      state.show = action.payload;
    },
    // setNoFormTrue(state){
    //   state.NoForm = true
    // },
    // setNoFormFalse(state){
    //   state.NoForm = false
    // }
  },
  extraReducers: {
    [setForm.fulfilled]: (state, action) => {
      state.form.push({
        title: "Untiteld",
        description: "No description",
        formId: action.payload.data.formId,
        formItems: [],
      });
      state.pending = false;
    },
    [setForm.pending]: (state) => {
      state.pending = true;
    },
    [setFormItems.fulfilled]: (state, action) => {
      state.pending = true;
      const id = action.payload.data.formId;
      const index = state.form.findIndex((x) => x.formId === id);
      state.form[index].formItems = action.payload.data.data;
    },
    [setFormItems.pending]: (state) => {
      state.pending = true;
    },
    [deleteFormItems.fulfilled]: (state, action) => {
      state.pending = true;
      const id = action.payload.data.formId;
      const index = state.form.findIndex((x) => x.formId === id);
      state.form[index].formItems = action.payload.data.data;
    },
    [deleteFormItems.pending]: (state) => {
      state.pending = true;
    },
    [setTitle.fulfilled]: (state, action) => {
      const id = action.payload.data.formId;
      const index = state.form.findIndex((x) => x.formId === id);
      state.form[index].title = action.payload.data.title;
    },
    [setDescription.fulfilled]: (state, action) => {
      const id = action.payload.data.formId;
      const index = state.form.findIndex((x) => x.formId === id);
      state.form[index].description = action.payload.data.description;
    },
    [deleteForm.fulfilled]: (state, action) => {
      const id = action.payload.data.formId;
      const index = state.form.findIndex((x) => x.formId === id);
      state.form.splice(index, 1);
    },
    [getAllForm.fulfilled]: (state, action) => {
      state.editForm = false;
      state.form = action.payload.data.data;
    },
    [getAllForm.pending]: (state) => {
      state.editForm = true;
    },
    [getForm.fulfilled]: (state, action) => {
      state.pending = false;
      state.form = action.payload.data.data;
      state.NoForm = action.payload.data.data.formStatus;
    },
    [getForm.rejected]: (state) => {
      state.NoForm = true;
    },
    [getForm.pending]: (state) => {
      state.pending = true;
    },
    [getFormData.fulfilled]: (state, action) => {
      state.data = action.payload.data.data;
    },
    [formEnable.fulfilled]: (state, action) => {
      const id = action.payload.data.formId;
      const status = action.payload.data.data;
      const index = state.form.findIndex((x) => x.formId === id);
      state.form[index].formStatus = status;
    },
    [formDisable.fulfilled]: (state, action) => {
      const id = action.payload.data.formId;
      const status = action.payload.data.data;
      const index = state.form.findIndex((x) => x.formId === id);
      state.form[index].formStatus = status;
    },
    [getFormVisual.fulfilled]: (state, action) => {
      state.visualLoad = false;
      state.visual = action.payload.data.data;
    },
    [getFormVisual.pending]: (state) => {
      state.visualLoad = true;
    },
  },
});

export const formAction = Form.actions;
export default Form.reducer;
