const formModel = require("../models/formModel");
const visualModel = require("../models/visualModel");
const dataVisualization = require("../models/visualModel");

// Set Form =>  api/setForm
exports.setForm = async (req, res) => {
  const formId = req.body.formId;

  await formModel.create({
    formId: formId,
    title: "Untiteld",
    description: "No description",
  });

  res.status(200).send({
    status: "success",
    formId: formId,
  });
};

// Set Form Items => api/setFormItems
exports.setFormItems = async (req, res) => {
  const formId = req.body.formId;
  const data = req.body.data;

  const form = await formModel.findOne({ formId: formId });
  form.formItems.push(data);
  form.save();

  res.status(200).send({
    status: "success",
    data: form.formItems,
    formId: formId,
  });
};

// Delete Form => api/deleteForm
exports.deleteForm = async (req, res) => {
  const formId = req.body.formId;
  await formModel.findOneAndDelete({ formId });

  res.status(200).send({
    status: "success",
    formId: formId,
  });
};

// Delete Form Items => api/deleteFormItems
exports.deleteFormItems = async (req, res) => {
  const formId = req.body.formId;
  const itemId = req.body.itemId;

  const form = await formModel.findOne({ formId: formId });
  const Itemindex = form.formItems.findIndex((x) => x.itemId === itemId);
  form.formItems.splice(Itemindex, 1);

  form.save();

  res.status(200).send({
    status: "success",
    data: form.formItems,
    formId: formId,
  });
};

// Set Title => api/setTitle
exports.setTitle = async (req, res) => {
  const formId = req.body.formId;
  const title = req.body.title;

  const form = await formModel.findOne({ formId: formId });
  form.title = title;
  form.save();

  res.status(200).send({
    status: "success",
    title: form.title,
    formId: formId,
  });
};

// Set Description => api/setDescription
exports.setDescription = async (req, res) => {
  const formId = req.body.formId;
  const description = req.body.description;

  const form = await formModel.findOne({ formId: formId });
  form.description = description;
  form.save();

  res.status(200).send({
    status: "success",
    description: form.description,
    formId: formId,
  });
};

// get Form => api/getForm
exports.getForm = async (req, res) => {
  const formId = req.body.formId;

  const form = await formModel.findOne({ formId: formId });

  if (!form) {
    return res.status(400).send({
      status: "false",
    });
  }

  res.status(200).send({
    status: "success",
    data: form,
  });
};

//get All Form => api/getAllForm
exports.getAllForm = async (req, res) => {
  const allForm = await formModel.find({});
  res.status(200).send({
    status: "success",
    data: allForm,
  });
};

//set Form Data => api/setFormData
exports.setFormData = async (req, res) => {
  const formId = req.body.formId;
  const data = req.body.data;

  const form = await formModel.findOne({ formId: formId });
  form.formSubmit.push(data);

  form.save();

  res.status(200).send({
    status: "success",
    data: form.formSubmit,
  });
};

//get Form data => api/getFormData
exports.getFormData = async (req, res) => {
  const formId = req.body.formId;

  const form = await formModel.findOne({ formId: formId });

  res.status(200).send({
    status: "success",
    data: form.formSubmit,
  });
};

// form Enable => api/setformEnable
exports.setformEnable = async (req, res) => {
  const formId = req.body.formId;

  const form = await formModel.findOne({ formId: formId });
  form.formStatus = true;

  form.save();

  res.status(200).send({
    status: "success",
    data: form.formStatus,
    formId: formId,
  });
};

// form Disable => api/setformDisable
exports.setformDisable = async (req, res) => {
  const formId = req.body.formId;

  const form = await formModel.findOne({ formId: formId });
  form.formStatus = false;

  form.save();

  res.status(200).send({
    status: "success",
    data: form.formStatus,
    formId: formId,
  });
};

// data visualization api => api/createFormVisual
exports.createFormVisual = async (req, res) => {
  const date = req.body.date;

  const data = await visualModel.findOne({ date: date });
  if (!data) {
    await visualModel.create({
      created: 1,
      deleted: 0,
      submitForm: 0,
      date: date,
    });
    return res.status(200).json({
      status: "success",
      data: data,
    });
  }

  data.created = data.created + 1;
  data.save();

  return res.status(200).json({
    status: "success",
    data: data,
  });
};
// data visualization api => api/deleteFormVisual
exports.deleteFormVisual = async (req, res) => {
  const date = req.body.date;
  const data = await visualModel.findOne({ date: date });

  data.deleted = data.deleted + 1;
  data.save();

  return res.status(200).json({
    status: "success",
    data: data,
  });
};

// data visualization api => api/submitFormVisual
exports.submitFormVisual = async (req, res) => {
  const date = req.body.date;

  const data = await visualModel.findOne({ date: date });

  data.submitForm = data.submitForm + 1;
  data.save();

  return res.status(200).json({
    status: "success",
    data: data,
  });
};

// data visualization api => api/getFormVisual
exports.getFormVisual = async (req, res) => {
  const data = await visualModel.find({});
  return res.status(200).json({
    status: "success",
    data: data,
  });
};
