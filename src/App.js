import React from "react";
import { Space, Typography, Select, Col, Row, Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { isEqual } from "lodash";
import Adfilter from "./test/adfilter.js";
import Dshow from "./test/dataShow.js";

const { Text } = Typography;

const App = () => {
  const [adList, setAdList] = useState([]);
  const adChange = (value) => {
    const filteredValue = value.filter((option) => option !== "selectAll");

    //제거하지 말것 selectAll 삭제 후 setAdList에 추가할 때 무한 루프에 들어감.
    if (!isEqual(filteredValue, adList)) {
      setAdList(filteredValue);
    }
  };
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
              <Adfilter onValueChange={adChange} />
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
      <div>
        <h2>선택한 분석 대상</h2>
        <div style={{ border: "1px solid", padding: "16px" }}>
          {adList.length <= 5 ? (
            <p>{adList.join(", ")}</p>
          ) : (
            <>
              <p>{`${adList.slice(0, 5).join(", ")} 외 ${
                adList.length - 5
              }개`}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
