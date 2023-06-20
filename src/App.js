import React from "react";
import { Space, Typography, Select, Col, Row, Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Adfilter from "./test/adfilter.js";

import MultiSelect from "./test/testdate.js";
import MySelect from "./test/selectorcheck.js";
import Dshow from "./test/dataShow.js";

const { Text } = Typography;

const options = [];
const ops = ["Naver", "Next", "Google", "Facebook"];

for (let i = 0; i < ops.length; i++) {
  const value = ops[i];
  options.push({
    label: `${value}`,
    value,
  });
}

const App = () => {
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ border: "1px solid", padding: "16px" }}>
          <Row>
            <Col>
              {" "}
              {/* Adjusted column widths */}
              <Text strong level={4}>
                분석대상 선택
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </Text>
            </Col>
            <Col>
              <Adfilter />
            </Col>
            <Col></Col>
            <Dshow />
            <Text strong level={4}>
              기간 선택
              <FontAwesomeIcon icon={faCircleChevronRight} />
            </Text>
          </Row>
        </div>
      </Space>
    </>
  );
};

export default App;
