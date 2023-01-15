import React from "react";
import { Card } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FolderViewOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteForm,
  formEnable,
  formDisable,
  deleteFormVisual,
  getFormData,
} from "../store/action/form";
import ResponseModal from "./responseModal";
import { formAction } from "../store/reducer/form";

const FormCard = (props) => {
  const dispatch = useDispatch();
  const { Meta } = Card;
  const { title, description, formId, formSubmit } = props.props;

  const index = useSelector((state) =>
    state.form.form.findIndex((x) => x.formId === formId)
  );
  const NoForm = useSelector((state) => state.form.form[index].formStatus);

  const response = () => {
    // dispatch(getFormData({ formId: props.formId })).then(() => {
    dispatch(formAction.setDrawerTitle({ title: title }));
    dispatch(formAction.setDrawerData({ data: formSubmit }));
    dispatch(formAction.setDrawerVisibleTure());
    // });
  };
  const formEn = () => {
    // dispatch(formAction.setNoFormTrue())
    dispatch(formEnable({ formId: formId }));
  };
  const formDis = () => {
    // dispatch(formAction.setNoFormFalse())
    dispatch(formDisable({ formId: formId }));
  };

  return (
    <>
      <Card
        className="cardD"
        hoverable
        style={{ width: 240, margin: 30 }}
        cover={<img src={props.image} />}
      >
        <Meta title={title} description={description} />
        <br />
        <Link to={`/dashboard/form/edit/${formId}`}>
          <EditOutlined />
        </Link>
        &nbsp;&nbsp;
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => {
            dispatch(
              deleteFormVisual({ date: new Date().toLocaleDateString() })
            );
            dispatch(deleteForm({ formId: formId }));
          }}
        />
        &nbsp;&nbsp;
        <FolderViewOutlined onClick={response} style={{ color: "green" }} />
        <div
          style={{
            position: "absolute",
            width: 30,
            fontSize: 24,
            color: "blue",
            cursor: "pointer",
            right: 7,
            bottom: 18,
          }}
        >
          {NoForm ? (
            <EyeOutlined onClick={formDis} />
          ) : (
            <EyeInvisibleOutlined onClick={formEn} />
          )}
        </div>
      </Card>
      <ResponseModal formId={formId} />
    </>
  );
};

export default FormCard;
