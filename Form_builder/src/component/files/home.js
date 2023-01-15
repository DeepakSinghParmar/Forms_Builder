import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Button } from "antd";

const Home = () => {
  return (
    <>
      <Row style={{ top: 100, position: "relative" }}>
        <Col className="col1" span={12}>
          <div className="con1">
            <span className="t1"> Get started now</span>
            <br />
            <span className="t2">
              Ready to build your first survey? It’s free and easy with <br />
              Forms Builder.
            </span>
            <br />
            <br />
            <Link to="/dashboard">
              <Button type="primary" size={30}>
                Go to Form Builder
              </Button>
            </Link>
          </div>
        </Col>
        <Col className="col2" span={12}>
          <img
            src="https://startbootstrap.com/assets/img/freepik/forms-pana.svg"
            width="100%"
            height="100%"
          />
        </Col>
      </Row>
    </>
  );
};

export default withRouter(Home);
