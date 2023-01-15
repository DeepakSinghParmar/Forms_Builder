import React from "react";
import { Card } from "antd";

const Box = (props) => {
  return (
    <div
      style={{
        display: "flex",
        margin: 10,
        borderBottom: "1px solid black",
        borderRadius: 5,
      }}
    >
      {props.data.map((d) => {
        return (
          <Card
            title={d.ques}
            bordered={false}
            className="text-truncate"
            style={{ width: 200, margin: 5, boxShadow: "0px 0px 4px black" }}
          >
            {d.ans}
          </Card>
        );
      })}
    </div>
  );
};

export default Box;
