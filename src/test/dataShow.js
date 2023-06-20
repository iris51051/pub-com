import React from "react";
import "../index.css";
import { Select, Space } from "antd";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const Dshow = () => (
  <Space wrap>
    <Select
      defaultValue="1"
      style={{
        width: 210,
      }}
      onChange={handleChange}
      options={[
        {
          value: "1",
          label: "스크립트 전환 데이터 보기",
        },
        {
          value: "2",
          label: "매체 전환 데이터 보기",
        },
      ]}
    />
  </Space>
);
export default Dshow;
