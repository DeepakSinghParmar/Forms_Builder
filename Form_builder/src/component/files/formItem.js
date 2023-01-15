import React from "react";
import { Input, DatePicker, TimePicker, Radio, Space,Select, Rate ,Slider} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteFormItems } from "../store/action/form";
import { formAction } from "../store/reducer/form";

const FormItem = (props) => {
  const {Option} = Select

  const { itemId, ques, value, options } = props.props;
  const dispatch = useDispatch();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const check = url.split("/").reverse()[1];

  const [val, setVal] = React.useState({
    text: "",
    bigText: "",
    option: "",
    date: "",
    time: "",
    select:"",
    rate:"",
    slider:"",
    multiSelect:""
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setVal({
      ...val,
      [name]: value,
    });
  };

  const optionChange = (e) => {
    setVal({
      ...val,
      ["option"]: e.target.value,
    });
    dispatch(
      formAction.setFieldData({
        data: {
          ques: ques,
          ans: e.target.value,
        },
      })
    );
  };

  const selectChange = (value) => {
    setVal({
      ...val,
      ["select"]: value,
    });
    dispatch(
      formAction.setFieldData({
        data: {
          ques: ques,
          ans: value,
        },
      })
    );
  };
  

  const changeDate = (date, dateString) => {
    setVal({
      ...val,
      ["date"]: dateString,
    });
  };
  const changeTime = (time, timeString) => {
    setVal({
      ...val,
      ["time"]: timeString,
    });
  };

  const changeRate = (value) =>{
     setVal({
       ...val,
       ["rate"]:value
     })
     dispatch(
      formAction.setFieldData({
        data: {
          ques: ques,
          ans: value.toString(),
        },
      })
    );
  }

  const changeSlider = (value) =>{
    setVal({
      ...val,
      ["slider"]:value
    })
    dispatch(
     formAction.setFieldData({
       data: {
         ques: ques,
         ans: value.toString(),
       },
     })
   );
 }

 const multiChange = (value) =>{
  let str = "";
  for (let i = 0; i < value.length; i++) {
    str += value[i];
    str += " ";
  }
  setVal({...val,["multiSelect"]:str})
   console.log(value)
   dispatch(
    formAction.setFieldData({
      data: {
        ques: ques,
        ans: str.trim(),
      },
    })
  );
 }


  const deleteItem = () => {
    dispatch(
      deleteFormItems({
        formId: id,
        itemId: itemId,
      })
    );
  };

  return (
    <>
      <div className="formItem">
        <div className="formQues">Q. {ques}</div>
        <div className="formFiled">
          {value === "0" ? (
            <Input
              name="text"
              onBlur={() =>
                dispatch(
                  formAction.setFieldData({
                    data: {
                      ques: ques,
                      ans: val.text,
                    },
                  })
                )
              }
              onChange={changeHandler}
              disabled={check === "edit" ? true : false}
              required
            />
          ) : null}
          {value === "1" ? (
            <Input.TextArea
              name="bigText"
              onChange={changeHandler}
              onBlur={() =>
                dispatch(
                  formAction.setFieldData({
                    data: {
                      ques: ques,
                      ans: val.bigText,
                    },
                  })
                )
              }
              style={{ height: 150 }}
              disabled={check === "edit" ? true : false}
              required
            />
          ) : null}
          {value === "2" ? (
            <Radio.Group
              name="option"
              onChange={optionChange}
              value={val.option}
            >
              <Space direction="vertical">
                {options.split(" ").map((i) => (
                  <Radio value={i} disabled={check === "edit" ? true : false}>
                    {i}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          ) : null}
          {value === "3" ? (
            <DatePicker
              format={"DD-MM-YYYY"}
              onBlur={() =>
                dispatch(
                  formAction.setFieldData({
                    data: {
                      ques: ques,
                      ans: val.date,
                    },
                  })
                )
              }
              onChange={changeDate}
              disabled={check === "edit" ? true : false}
              required
            />
          ) : null}
          {value === "4" ? (
            <TimePicker
              onBlur={() =>
                dispatch(
                  formAction.setFieldData({
                    data: {
                      ques: ques,
                      ans: val.time,
                    },
                  })
                )
              }
              onChange={changeTime}
              disabled={check === "edit" ? true : false}
              required
            />
          ) : null}
          {value === "5" ? (
            <Select
              name="select"

              onChange={selectChange}
              placeholder="Please Select"
              value={val.select}
              disabled={check === "edit" ? true : false}
              style={{width:400}}
            >
                {options.split(" ").map((i) => (
                  <Option value={i} >
                    {i}
                  </Option>
                ))}
              
            </Select>
          ) : null}
          {value === "6" ? (
            <Rate 
            onChange={changeRate}
            style={{fontSize:40}}
            allowHalf
            disabled={check === "edit" ? true : false}
            />
          ) : null}
          {value === "7" ? (
            <Slider
            marks={{0:"0",20:"20",40:"40",60:"60",80:"80",100:"100"}}
            onChange={changeSlider}
            style={{fontSize:40}}
            disabled={check === "edit" ? true : false}
            />
          ) : null}

           {value === "8" ? (
            <Select
             mode="multiple"
             placeholder="Please select"
             onChange={multiChange}
             style={{ width: 400 }}
             disabled={check === "edit" ? true : false}
           >
             {options.split(" ").map((i) => (
                  <Option value={i} >
                    {i}
                  </Option>
                ))}
           </Select>
          ) : null}

        </div>

        <br />
        <div
          style={{
            background: "red",
            width: "100%",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={deleteItem}
        >
          {check === "edit" ? (
            <DeleteOutlined
              style={{ fontSize: 22, color: "white", margin: 3 }}
            />
          ) : null}
        </div>
      </div>
      <div style={{ height: 9 }}></div>
    </>
  );
};

export default FormItem;
