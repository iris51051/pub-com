import React from "react";
import { Space, Typography, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const { Text } = Typography;

const options = [];

const ops = ["네이버", "다음", "구글", "페이스북"];

for (let i = 0; i < ops.length; i++) {
  const value = ops[i];
  options.push({
    label: `${value}`,
    value,
  });
}

const Selector = ({ value, onChange }) => {
  const newPhol = onChange.setSeval;
  const onChange = onChange.setValue;
  const selectProps = {
    mode: "multiple",
    style: {
      paddingLeft: 20,
      width: "190px",
    },
    value,
    options,
    onChange,
    placeholder: `선택된 항목 수 (${value.length}/${options.length}) `,
    maxTagCount: "responsive",
  };
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Select {...selectProps} />
    </Space>
  );
};
const App = () => {
  const [value, setValue] = useState([]);
  const [seval, setSeval] = useState([]);
  console.log(seval);
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ border: "1px solid", padding: "16px" }}>
          <Text strong level={4}>
            분석대상 선택
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>
          <Selector value={value} onChange={[setValue, setSeval]} />
        </div>
      </Space>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <div>
            {value.map((item, index) => (
              <React.Fragment key={index}>
                {item}
                {index !== value.length - 1 && "/"}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Space>
    </>
  );
};

export default App;
