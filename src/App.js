import React from "react";
import { Space, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { isEqual } from "lodash";
import Adfilter from "./test/adfilter.js";
import Dshow from "./test/dataShow.js";
import Calendar from "./test/calendar.js";
import FilterTagAdder from "./test/filterTagAdder.js";
const { Text } = Typography;

const App = () => {
  const dispop = 10;
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
      <div style={{ border: "1px solid #e8ecee", padding: "25px" }}>
        <Space size="large">
          <Text strong level={4}>
            분석대상 선택&nbsp;
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>

          <Adfilter onValueChange={adChange} />

          <Dshow />
          <Text strong level={4}>
            기간 선택&nbsp;
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>
          <Calendar />
        </Space>
      </div>
      <div>
        <br />
        <h4 className="selected-analysis-targer">선택한 분석 대상</h4>
        <div className="selected-analysis-targer-div">
          <span className="selected-analysis-targer-span">광고주 </span>
          {adList.length <= dispop ? (
            <p className="selected-analysis-targer-p">{adList.join(", ")}</p>
          ) : (
            <>
              <p>{`${adList.slice(0, dispop).join(", ")} 외 ${
                adList.length - dispop
              }개`}</p>
            </>
          )}
        </div>
        <div style={{ border: "1px solid", padding: "16px" }}>
          <FilterTagAdder />
        </div>
      </div>
    </>
  );
};

export default App;
