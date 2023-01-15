import React from "react";
import { Button, Modal, Row, Col, Select, Spin } from "antd";
import { formAction } from "../store/reducer/form";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getFormVisual } from "../store/action/form";

const Chartmodal = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.form.chartview);
  const [type, setType] = React.useState("line");
  const visual = useSelector((state) => state.form.visual);
  const loader = useSelector((state) => state.form.visualLoad);

  const handleSelect = (value) => {
    setType(value);
  };

  const refresh = () => {
    dispatch(getFormVisual());
  };

  const categorie = (arr) => {
    let ans = [];
    arr.map((item) => {
      ans.push(item.date);
    });
    return ans;
  };

  const created = (arr) => {
    let ans = [];
    arr.map((item) => {
      ans.push(item.created);
    });
    return ans;
  };

  const deleted = (arr) => {
    let ans = [];
    arr.map((item) => {
      ans.push(item.deleted);
    });
    return ans;
  };

  const submitForm = (arr) => {
    let ans = [];
    arr.map((item) => {
      ans.push(item.submitForm);
    });
    return ans;
  };
  React.useEffect(() => {
    dispatch(getFormVisual());
  }, []);

  return (
    <>
      <Modal
        title="Data Visualization"
        centered
        visible={visible}
        footer={
          <>
            <Button type="primary" onClick={refresh}>
              Refresh
            </Button>
          </>
        }
        onCancel={() => {
          dispatch(formAction.setChartviewFalse());
        }}
        width={1350}
      >
        <Row style={{ width: "100%", height: "100%" }}>
          <Col span={12} style={{ height: 470 }}>
            {loader ? (
              <div
                style={{
                  position: "absolute",
                  top: 230,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: type,
                      zoomType: "xy",
                    },
                    credits: {
                      enabled: false,
                    },
                    title: {
                      text: "Total Form Created",
                    },
                    xAxis: {
                      categories: categorie(visual),
                    },
                    yAxis: {
                      title: {
                        text: "Total numbers ",
                      },
                    },
                    series: [
                      {
                        name: "Created",
                        color: "green",
                        data: created(visual),
                      },
                      {
                        name: "Deleted",
                        color: "red",
                        data: deleted(visual),
                      },
                    ],
                  }}
                />
              </>
            )}

            <br />
            <label>
              <b>Type : </b>
            </label>
            <Select
              defaultValue="line"
              style={{ width: 150 }}
              onChange={handleSelect}
            >
              <Option value="line">line</Option>
              {/* <Option value="pie">pie</Option> */}
              <Option value="column">column</Option>
              <Option value="spline">spline</Option>
              <Option value="area">area</Option>
              <Option value="areaspline">areaspline</Option>
              <Option value="bar">bar</Option>
              <Option value="scatter">scatter</Option>
            </Select>
          </Col>
          <Col className="col2" span={12} style={{ height: 470 }}>
            {loader ? (
              <div
                style={{
                  position: "absolute",
                  top: 230,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: type,
                      zoomType: "xy",
                    },
                    credits: {
                      enabled: false,
                    },
                    title: {
                      text: "Total Form Submitted",
                    },
                    xAxis: {
                      categories: categorie(visual),
                    },
                    yAxis: {
                      title: {
                        text: "Total numbers",
                      },
                    },
                    series: [
                      {
                        name: "Submitted",
                        data: submitForm(visual),
                      },
                    ],
                  }}
                />
              </>
            )}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Chartmodal;
