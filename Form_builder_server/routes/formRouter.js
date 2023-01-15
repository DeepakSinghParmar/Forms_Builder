const express = require("express");
const Router = express.Router();

const {
  setForm,
  setFormItems,
  deleteForm,
  deleteFormItems,
  setTitle,
  setDescription,
  getForm,
  getAllForm,
  setFormData,
  getFormData,
  setformEnable,
  setformDisable,
  createFormVisual,
  deleteFormVisual,
  submitFormVisual,
  getFormVisual,
} = require("../controllers/formController");

Router.route("/setForm").post(setForm);
Router.route("/setFormItems").post(setFormItems);
Router.route("/setTitle").post(setTitle);
Router.route("/setDescription").post(setDescription);
Router.route("/deleteForm").post(deleteForm);
Router.route("/deleteFormItems").post(deleteFormItems);
Router.route("/getForm").post(getForm);
Router.route("/setFormData").post(setFormData);
Router.route("/getFormData").post(getFormData);
Router.route("/getFormData").post(getFormData);
Router.route("/getAllForm").get(getAllForm);
Router.route("/setformEnable").post(setformEnable);
Router.route("/setformDisable").post(setformDisable);

Router.route("/createFormVisual").post(createFormVisual);
Router.route("/deleteFormVisual").post(deleteFormVisual);
Router.route("/submitFormVisual").post(submitFormVisual);
Router.route("/getFormVisual").get(getFormVisual);

module.exports = Router;
