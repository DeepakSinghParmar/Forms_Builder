import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { formAction } from "../store/reducer/form";
import { getFormData } from "../store/action/form";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const ResponseModal = (props) => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.form.visible);
  const data = useSelector((state) => state.form.data);
  const title = useSelector((state) => state.form.DrawerTitle);

  const refresh = () => {
    dispatch(getFormData({ formId: props.formId }));
  };

  const close = () => {
    dispatch(formAction.setDrawerVisibleFalse());
  };

  React.useEffect(() => {
    dispatch(getFormData({ formId: props.formId }));
  }, []);

  return (
    <>
      <Drawer
        title={
          <>
            {title}

            <Button
              style={{ position: "absolute", right: 90, top: 11 }}
              type="primary"
              onClick={refresh}
            >
              Refresh
            </Button>
          </>
        }
        placement={"bottom"}
        closable={true}
        onClose={close}
        visible={visible}
        height={570}
      >
        <div
          className="ag-theme-alpine"
          style={{ height: "100%", width: "100%" }}
        >
          {data.length > 0 ? (
            <>
              <AgGridReact
                defaultColDef={{
                  sortable: true,
                  filter: true,
                }}
                pagination
                rowData={
                  data.length > 0
                    ? data.map((item) => {
                        let obj = {};
                        item.map((ele) => {
                          let que = ele.ques.replace(/ /g, "_");
                          let ans = ele.ans;
                          obj[que] = ans;
                        });
                        return obj;
                      })
                    : []
                }
              >
                {data[0].map((item) => (
                  <AgGridColumn
                    field={item.ques.replace(/ /g, "_")}
                  ></AgGridColumn>
                ))}
              </AgGridReact>
            </>
          ) : (
            "empty"
          )}
        </div>
      </Drawer>
    </>
  );
};

export default ResponseModal;
