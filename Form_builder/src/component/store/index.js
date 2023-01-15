import { configureStore } from "@reduxjs/toolkit";
import Form from "./reducer/form";

const store = configureStore({
  reducer: {
    form: Form,
  },
});

export default store;
