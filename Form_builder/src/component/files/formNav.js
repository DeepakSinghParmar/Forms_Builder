import React from "react";
import { Modal, Input, Button } from "antd";
import { SendOutlined, HolderOutlined, EyeOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FormNav = () => {
  const [visible, setVisible] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleOk = () => {
    console.log("ok");
  };
  const cancel = () => {
    setCopied(false);
    setVisible(false);
  };
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const index = useSelector((state) =>
    state.form.form.findIndex((x) => x.formId === id)
  );
  const data = useSelector((state) => state.form.form);
  function check() {
    if (index === -1) return {};
    return data[index];
  }

  const x = check();

  return (
    <>
      <nav
        class="navbar  navbar-light bg-light"
        style={{ boxShadow: "0px 0px 5px black" }}
      >
        <div
          style={{
            position: "relative",
            left: 10,
            fontSize: 25,
          }}
        >
          {x.title}
        </div>

        <div className="icon">
          <div>
            <SendOutlined
              onClick={() => setVisible(true)}
              className="iconSize"
            />
            <Link target="_blank" to={`/form/view/${id}`}>
              <EyeOutlined className="iconSize" />
            </Link>
            <HolderOutlined className="iconSize" />
          </div>
        </div>
      </nav>
      <Modal
        title="FORM URL"
        visible={visible}
        onOk={handleOk}
        onCancel={cancel}
        footer={
          <CopyToClipboard
            text={`http://localhost:3000/form/view/${id}`}
            onCopy={() => setCopied(true)}
          >
            <Button>{copied ? "Copied!" : "Copy link"}</Button>
          </CopyToClipboard>
        }
      >
        <Input.TextArea
          value={`http://localhost:3000/form/view/${id}`}
          readOnly
        />
      </Modal>
    </>
  );
};

export default FormNav;
