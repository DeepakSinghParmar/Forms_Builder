const mongoose = require("mongoose");

const formModel = mongoose.Schema({
  formId: { type: String },
  title: { type: String },
  description: { type: String },
  formItems: [
    {
      itemId: { type: String },
      ques: { type: String },
      type: { type: String },
      value: { type: String },
      options: { type: String },
    },
  ],
  formSubmit: [
    [
      {
        ques: { type: String },
        ans: { type: String },
      },
    ],
  ],
  formStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Forms", formModel);
