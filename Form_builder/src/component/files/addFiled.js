import React from "react";
import {
  Input,
  Modal,
  DatePicker,
  TimePicker,
  Radio,
  Button,
  Select,
  Rate,
  Slider
} from "antd";
import { useSelector, useDispatch } from "react-redux";

import { setFormItems } from "../store/action/form";

import { formAction } from "../store/reducer/form";
import { v4 as uuuid4v } from "uuid";
import { withRouter } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";


const AddFiled = () => {
  const show = useSelector((state) => state.form.show);
  const dispatch = useDispatch();
  const url = window.location.pathname;
  const [question, setQuestion] = React.useState("");
  const [error, setError] = React.useState("");
  const [Text, setText] = React.useState("");
  const [Droptext,setDroptext]=React.useState("");
  const [selectValue, setSelectValue] = React.useState("0");
  const [radioInput, setRadioInput] = React.useState([]);
  const [dropdown,setDropdown] = React.useState([]);
  const [multiText,setMultiText] = React.useState("");
  const [multiSelect,setmultiSelection] = React.useState([]);

  const { Option } = Select;
  const radioClick = () => {
    setRadioInput([...radioInput, Text]);
    setText("");
  };
  const dropdownClick = ()=>{
     setDropdown([...dropdown,Droptext]);
     setDroptext("");
  }
  const multiselection = () =>{
    setmultiSelection([...multiSelect,multiText]);
    setMultiText("");
  }
 

  React.useEffect(() => {
    if (question.length === 0) setError("field should not empty...");
    if (question.length > 0) setError("");
  });

  const cancel = ()=>{
    dispatch(formAction.show(false));
    setRadioInput([]);
    setDropdown([]);
    setQuestion("");
    setSelectValue("0");
  }

  const handleOk = () => {
    if (question.length === 0) return;

    if (selectValue === "0") {
      dispatch(
        setFormItems({
          data: {
            itemId: uuuid4v(),
            ques: question,
            type: "text",
            value: selectValue,
          },
          formId: url.substring(url.lastIndexOf("/") + 1),
        })
      );
    } else if (selectValue === "1") {
      dispatch(
        setFormItems({
          data: {
            itemID: uuuid4v(),
            ques: question,
            type: "TextArea",
            value: selectValue,
          },
          formId: url.substring(url.lastIndexOf("/") + 1),
        })
      );
    } else if (selectValue === "2") {
      let str = "";
      for (let i = 0; i < radioInput.length; i++) {
        str += radioInput[i];
        str += " ";
      }

      dispatch(
        setFormItems({
          data: {
            itemID: uuuid4v(),
            ques: question,
            type: "choices",
            value: selectValue,
            options: str.trim(),
          },
          formId: url.substring(url.lastIndexOf("/") + 1),
        })
      );
    } else if (selectValue === "3") {
      dispatch(
        setFormItems({
          data: {
            itemID: uuuid4v(),
            ques: question,
            type: "Date",
            value: selectValue,
          },
          formId: url.substring(url.lastIndexOf("/") + 1),
        })
      );
    } else if (selectValue === "4") {
      dispatch(
        setFormItems({
          data: {
            itemID: uuuid4v(),
            ques: question,
            type: "Time",
            value: selectValue,
          },
          formId: url.substring(url.lastIndexOf("/") + 1),
        })
      );
    }else if (selectValue === "5") {
      let str = "";
      for (let i = 0; i < dropdown.length; i++) {
        str += dropdown[i];
        str += " ";
      }
  
      dispatch(
        setFormItems({
          data: {
            itemID: uuuid4v(),
            ques: question,
            type: "Dropdown",
            value: selectValue,
            options: str.trim(),
          },
          formId: url.substring(url.lastIndexOf("/") + 1),
        })
      );
    }

    else if (selectValue === "6") {
      dispatch(
        setFormItems({
          data: {
            itemID: uuuid4v(),
            ques: question,
            type: "Rate",
            value: selectValue,
          },
          formId: url.substring(url.lastIndexOf("/") + 1),
        })
      );
    }  
    
    else if (selectValue === "7") {
      dispatch(
        setFormItems({
          data: {
            itemID: uuuid4v(),
            ques: question,
            type: "Slider",
            value: selectValue,
          },
          formId: url.substring(url.lastIndexOf("/") + 1),
        })
      );
    }  

    else if (selectValue === "8") {
      let str = "";
      for (let i = 0; i < multiSelect.length; i++) {
        str += multiSelect[i];
        str += " ";
      }
  
      dispatch(
        setFormItems({
          data: {
            itemID: uuuid4v(),
            ques: question,
            type: "multiSelection",
            value: selectValue,
            options: str.trim(),
          },
          formId: url.substring(url.lastIndexOf("/") + 1),
        })
      );
    }


    setRadioInput([]);
    setDropdown([]);
    setmultiSelection([]);
    setQuestion("");
    setSelectValue("0");
    dispatch(formAction.show(false));
  };

  const SelectItem = () => {
    if (selectValue === "0") {
      return <Input placeholder="Short Answers" disabled />;
    }
    if (selectValue === "1") {
      return <Input.TextArea placeholder="Long Answers" disabled />;
    }

    if (selectValue === "2") {
      return (
        <>
          {radioInput.map((i) => (
            <p>
              <Radio disabled>{i}</Radio>
            </p>
          ))}
        </>
      );
    }

    if (selectValue === "3") {
      return <DatePicker disabled />;
    }
    if (selectValue === "4") {
      return <TimePicker disabled />;
    }

    if(selectValue === "5"){
      return(
        <>
        {dropdown.map((i)=>(
          <p>
              <RightOutlined/>  {i}
          </p>
        ))}
        </>
      )
      
    }
    if(selectValue === "6"){
      return <Rate  disabled/>
    }
    if(selectValue === "7"){
      return <Slider disabled/>
    }
    if(selectValue === "8"){
      return (
        <>
        {multiSelect.map((i)=>(
          <p>
              <RightOutlined/>  {i}
          </p>
        ))}
        </>
      )
    }

    return null;
  };
  return (
    <>
      <Modal
        title="Form Itmes"
        visible={show}
        footer={
          <>
          <Button danger onClick={cancel}>Cancel</Button>
          <Button type="primary" onClick={handleOk} disabled={question.length > 0 ?false :true} >Ok</Button>
          </>
        }
        onCancel={ cancel}
      >
        <span style={{ color: "gray" }}>{error}</span>
        <div style={{ display: "flex" }}>
          <Input
            type="text"
            placeholder="Enter Question"
            style={{ width: 320 }}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          &nbsp;&nbsp;&nbsp;
          <Select
            defaultValue="0"
            style={{ width: 150 }}
            onChange={(value) => setSelectValue(value)}
          >
            <Option value="0">Short Answer</Option>
            <Option value="1">Paragraph</Option>
            <Option value="2">Choices</Option>
            <Option value="3">Date</Option>
            <Option value="4">Time</Option>
            <Option value="5">Dropdown</Option>
            <Option value="6">Rate</Option>
            <Option value="7">Slider</Option>
            <Option value="8">Multiple Selection</Option>
          </Select>
        </div>
        <br />
        <SelectItem />
        {selectValue === "2" ? (
          <>
            <Input
              type="text"
              placeholder="Enter options"
              style={{ width: 200 }}
              value={Text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={radioClick}>Add</Button>
          </>
        ) : null}

        {selectValue === "5" ? (
          <>
            <Input
              type="text"
              placeholder="Enter options"
              style={{ width: 200 }}
              value={Droptext}
              onChange={(e) => setDroptext(e.target.value)}
            />
            <Button onClick={dropdownClick}>Add</Button>
          </>
        ) : null}

        {selectValue === "8" ? (
          <>
            <Input
              type="text"
              placeholder="Enter options"
              style={{ width: 200 }}
              value={multiText}
              onChange={(e) => setMultiText(e.target.value)}
            />
            <Button onClick={multiselection}>Add</Button>
          </>
        ) : null}
      </Modal>
    </>
  );
};

export default withRouter(AddFiled);
