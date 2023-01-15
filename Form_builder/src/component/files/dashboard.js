import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
  PlusOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { v4 as uuuid4v } from "uuid";
import FormCard from "./formCard";
import {
  setForm,
  getAllForm,
  createFormVisual,
  getFormVisual,
} from "../store/action/form";
import { useDispatch, useSelector } from "react-redux";
import Chartmodal from "./chartModal";
import { formAction } from "../store/reducer/form";

const Dashboard = ({ history }) => {
  const [formId, setFormId] = React.useState(uuuid4v());
  const dispatch = useDispatch();
  const data = useSelector((state) => state.form.form);
  const pending = useSelector((state) => state.form.pending);
  const setID = () => {
    dispatch(setForm(formId));
    dispatch(createFormVisual({ date: new Date().toLocaleDateString() }));
  };

  React.useEffect(() => {
    dispatch(getAllForm());
    if (!pending) history.push(`/dashboard/form/edit/${formId}`);
  }, [pending]);

  const pieChart = () => {
    dispatch(formAction.setChartviewTrue());
    dispatch(getFormVisual());
  };

  return (
    <>
      <section className="myform ">
        <nav class="navbar  navbar-dark bg-dark">
          <div
            style={{
              position: "relative",
              left: 10,
              fontSize: 25,
              color: "white",
            }}
          >
            Form Builder
          </div>

          <div className="icon">
            <div>
              <PlusOutlined
                onClick={setID}
                style={{ color: "white" }}
                className="iconSize"
              />
              &nbsp;&nbsp;&nbsp;
              <PieChartOutlined
                style={{ color: "white" }}
                className="iconSize"
                onClick={pieChart}
              />
              &nbsp;&nbsp;&nbsp;
              <Link to="#" style={{ color: "white" }}>
                <UserOutlined className="iconSize" />
              </Link>
            </div>
            <div></div>
          </div>
        </nav>
        <div className="wrapper">
          {data.length > 0 ? (
            data.map((props) => (
              <FormCard
                props={props}
                image={
                  "https://image.shutterstock.com/image-illustration/standard-application-employment-form-job-600w-1717437511.jpg"
                }
              />
            ))
          ) : (
            <h4>Empty</h4>
          )}
        </div>
      </section>
      <Chartmodal />
    </>
  );
};

export default withRouter(Dashboard);
