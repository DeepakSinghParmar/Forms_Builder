import React from "react";
import { withRouter } from "react-router-dom";
import { Input } from "antd";
import {  PlusOutlined } from "@ant-design/icons";

import FormItem from "./formItem";

import { formAction } from "../store/reducer/form";
import { useDispatch, useSelector } from "react-redux";

import { setTitle, setDescription, getAllForm } from "../store/action/form";

import AddFiled from "./addFiled";
import FormNav from "./formNav";

const EditForm = () => {
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const dispatch = useDispatch();

  const [Tfocused, setTFocused] = React.useState(false);
  const [Dfocused, setDFocused] = React.useState(false);

  const index = useSelector((state) =>
    state.form.form.findIndex((x) => x.formId === id)
  );
  const data = useSelector((state) => state.form.form);

  function check() {
    if (index === -1) return [];
    else {
      return data[index].formItems;
    }
  }

  const x = check();

  const [title, setTit] = React.useState("");
  const [dis, setDis] = React.useState("");

  const disEvent = () => {
    dispatch(formAction.show(true));
  };

  React.useEffect(() => {
    dispatch(getAllForm());
    dispatch(formAction.setTrue());

    if (Tfocused) {
      if (title.length > 0) {
        dispatch(
          setTitle({
            formId: id,
            title: title,
          })
        );
      }
    }

    if (Dfocused) {
      if (dis.length > 0) {
        dispatch(
          setDescription({
            formId: id,
            description: dis,
          })
        );
      }
    }
  }, [Tfocused, Dfocused]);

  return (
    <>
      <FormNav />
      <div className="initlayer">
   
          <form>
            <div className="initBox">
              <div className="formFiled ">
            <Input
              type="text"
              value={title}
              placeholder="Enter Title"
              onChange={(e) => setTit(e.target.value)}
              onFocus={() => setTFocused(false)}
              onBlur={() => setTFocused(true)}
            />
            </div>
            <hr />
            <div className="formFiled ">
            <Input.TextArea
              
              placeholder="Enter Description"
              style={{ height: 120 }}
              value={dis}
              onChange={(e) => setDis(e.target.value)}
              onFocus={() => setDFocused(false)}
              onBlur={() => setDFocused(true)}
            />
            </div>
            <br/>
            </div>
            <div style={{ height: 10 }}></div>
            {x.map((props) => (
              <FormItem props={props} />
            ))}
          </form>
        
      </div>
      <AddFiled />
      <div className="add">
        <PlusOutlined
          onClick={disEvent}
          style={{
            fontSize: 30,
            color: "white",
            position: "relative",
            top: 10,
            left: 10,
            cursor: "pointer",
          }}
        />
      </div>
    </>
  );
};

export default withRouter(EditForm);
