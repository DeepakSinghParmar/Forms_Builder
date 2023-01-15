import React, { useEffect } from "react";
import FormItem from "./formItem";
import { Input, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getForm,
  setFormData,
  submitFormVisual,
  getFormVisual,
} from "../store/action/form";
import { formAction } from "../store/reducer/form";

const ViewForm = () => {
  const dispatch = useDispatch();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const data = useSelector((state) => state.form.form);
  const pendding = useSelector((state) => state.form.pending);
  const Noform = useSelector((state) => state.form.NoForm);
  const formData = useSelector((state) => state.form.formFieldData);

  const sub = (e) => {
    dispatch(submitFormVisual({ date: new Date().toLocaleDateString() }));
    dispatch(
      setFormData({
        formId: id,
        data: formData,
      })
    );

    alert(" form data submited ....");
  };
  useEffect(() => dispatch(getForm({ formId: id })), []);
  return (
    <>
      {pendding ? (
        <div
          style={{
            position: "absolute",
            top: 300,
            width: "100%",
            textAlign: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          {!Noform ? (
            <div
              style={{
                position: "absolute",
                top: 300,
                width: "100%",
                textAlign: "center",
              }}
            >
              <Spin size="large" />
              <h1>Form Not Founded...</h1>
              <h1>Error - 404</h1>
            </div>
          ) : (
            <>
              <nav class="navbar  navbar-light " style={{}}>
                <div
                  style={{
                    position: "relative",
                    left: 10,
                    fontSize: 25,
                  }}
                >
                  Form Builder
                </div>
              </nav>
              <div className="initlayer">
                <form onSubmit={sub}>
                  <div className="initBox">
                    <div
                      className="formFiled "
                      style={{
                        background: "rgb(224, 218, 218)",
                        fontSize: 30,
                        fontWeight: "bold",
                      }}
                    >
                      {data.title}
                    </div>
                    <hr />
                    <div
                      className="formFiled "
                      style={{
                        background: "rgb(224, 218, 218)",
                        fontWeight: "bold",
                        whiteSpace: "pre-line",
                        wordBreak: "break-word",
                        borderRadius: 5,
                      }}
                    >
                      {data.description}
                    </div>
                    <br />
                  </div>
                  <div style={{ height: 10 }}></div>
                  {data.formItems.map((props) => (
                    <FormItem props={props} />
                  ))}
                  <Input
                    type="submit"
                    value="Submit"
                    style={{
                      marginTop: 10,
                      marginBottom: 20,
                      cursor: "pointer",
                      background: "blue",
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      borderRadius: 10,
                    }}
                  />
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ViewForm;
