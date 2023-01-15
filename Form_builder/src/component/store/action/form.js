import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const setForm = createAsyncThunk("Form/setForm", async (formId) => {
  const res = await axios.post(`${BASE_URL}/setForm`, { formId: formId });
  return res;
});

export const setFormItems = createAsyncThunk(
  "Form/setFormItems",
  async ({ formId, data }) => {
    const res = await axios.post(`${BASE_URL}/setFormItems`, {
      formId: formId,
      data: data,
    });
    return res;
  }
);

export const deleteFormItems = createAsyncThunk(
  "Form/deleteFormItems",
  async ({ formId, itemId }) => {
    const res = await axios.post(`${BASE_URL}/deleteFormItems`, {
      formId: formId,
      itemId: itemId,
    });
    return res;
  }
);

export const setTitle = createAsyncThunk(
  "Form/setTitle",
  async ({ formId, title }) => {
    const res = await axios.post(`${BASE_URL}/setTitle`, {
      formId: formId,
      title: title,
    });
    return res;
  }
);

export const setDescription = createAsyncThunk(
  "Form/setDescription",
  async ({ formId, description }) => {
    const res = await axios.post(`${BASE_URL}/setDescription`, {
      formId: formId,
      description: description,
    });
    return res;
  }
);

export const deleteForm = createAsyncThunk(
  "Form/deleteForm",
  async ({ formId }) => {
    const res = await axios.post(`${BASE_URL}/deleteForm`, {
      formId: formId,
    });
    return res;
  }
);

export const getAllForm = createAsyncThunk("Form/getAllForm", async () => {
  const res = await axios.get(`${BASE_URL}/getAllForm`);
  return res;
});

export const getForm = createAsyncThunk("Form/getForm", async ({ formId }) => {
  // console.log(store.getState())
  const res = await axios.post(`${BASE_URL}/getForm`, { formId: formId });
  return res;
});

export const setFormData = createAsyncThunk(
  "Form/setFormData",
  async ({ formId, data }) => {
    const res = await axios.post(`${BASE_URL}/setFormData`, {
      formId: formId,
      data: data,
    });
    return res;
  }
);

export const getFormData = createAsyncThunk(
  "Form/getFormData",
  async ({ formId }) => {
    const res = await axios.post(`${BASE_URL}/getFormData`, {
      formId: formId,
    });
    return res;
  }
);

export const formEnable = createAsyncThunk(
  "Form/formEnable",
  async ({ formId }) => {
    const res = await axios.post(`${BASE_URL}/setformEnable`, {
      formId: formId,
    });
    return res;
  }
);

export const formDisable = createAsyncThunk(
  "Form/formDisable",
  async ({ formId }) => {
    const res = await axios.post(`${BASE_URL}/setformDisable`, {
      formId: formId,
    });
    return res;
  }
);

export const createFormVisual = createAsyncThunk(
  "Form/createFormVisual",
  async ({ date }) => {
    const res = await axios.post(`${BASE_URL}/createFormVisual`, {
      date: date,
    });
    return res;
  }
);

export const deleteFormVisual = createAsyncThunk(
  "Form/deleteFormVisual",
  async ({ date }) => {
    const res = await axios.post(`${BASE_URL}/deleteFormVisual`, {
      date: date,
    });
    return res;
  }
);

export const submitFormVisual = createAsyncThunk(
  "Form/submitFormVisual",
  async ({ date }) => {
    const res = await axios.post(`${BASE_URL}/submitFormVisual`, {
      date: date,
    });
    return res;
  }
);

export const getFormVisual = createAsyncThunk(
  "Form/getFormVisual",
  async () => {
    const res = await axios.get(`${BASE_URL}/getFormVisual`);
    return res;
  }
);
