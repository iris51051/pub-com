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
import FilterTagDrawer from "./test/filterTagDrawer.js";
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

  //filterTag 추가
  const [selectedValue, setSelectedValue] = useState([]);
  const [updateValue, setUpdateValue] = useState([]);
  const [DrawerVisible, setDrawerVisible] = useState(false);
  const tagChange = (data) => {
    if (Object.keys(data).length !== 0) {
      setSelectedValue(data);
    } else {
      setSelectedValue(data);
    }
  };
  const handleTagClick = (isVisible) => {
    setDrawerVisible(isVisible);
  };
  const handleDrawerClose = (isVisible) => {
    setDrawerVisible(isVisible);
  };
  const handleTagListChange = (updatedValue) => {
    setUpdateValue(updatedValue);
  };

  return (
    <>
      <div style={{ border: "1px solid", padding: "16px" }}>
        <Space size="large">
          <Text strong level={4}>
            분석대상 선택
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>

          <Adfilter onValueChange={adChange} />

          <Dshow />
          <Text strong level={4}>
            기간 선택
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>
          <Calendar />
        </Space>
      </div>
      <div>
        <h2>선택한 분석 대상</h2>
        <div style={{ border: "1px solid", padding: "16px" }}>
          {adList.length <= dispop ? (
            <p>{adList.join(", ")}</p>
          ) : (
            <>
              <p>{`${adList.slice(0, dispop).join(", ")} 외 ${
                adList.length - dispop
              }개`}</p>
            </>
          )}
        </div>
        <div style={{ border: "1px solid", padding: "16px" }}>
          <FilterTagAdder
            selectedValue={selectedValue}
            onValueChange={handleTagListChange}
            onTagClick={handleTagClick}
          />
          <FilterTagDrawer
            onValueChange={tagChange}
            DrawerVisible={DrawerVisible}
            onCloseDrawer={handleDrawerClose}
            updateValue={updateValue}
          />
        </div>
      </div>
    </>
  );
};

export default App;
