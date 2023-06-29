import React from "react";
import { Checkbox, Dropdown, Input, Menu } from "antd";
import { useState } from "react";

const CheckboxGroup = Checkbox.Group;

const options = [
  { label: "다음", value: "다음" },
  { label: "네이버", value: "네이버" },
  { label: "구글", value: "구글" },
  { label: "페이스북", value: "페이스북" },
  { label: "인스타그램", value: "인스타그램" },
  { label: "트위터", value: "트위터" },
  { label: "너구리", value: "너구리" },
];

const Adfilter = ({ onValueChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let clickSel = "";
  const setSelect = (event) => {
    clickSel = event.target.value;
  };
  const handleCheckboxChange = (checkedValues) => {
    if (
      //모든 option이 선택 or selectAll 선택
      checkedValues.filter((option) => option !== "selectAll").length ===
      options.length
    ) {
      setSelectedOptions([...checkedValues, "selectAll"]);

      //모든 옵션이 선택되지 않았을 때(ex. 5개중에 4개만 선택됨)
    } else if (filteredOptions.length === options.length) {
      setSelectedOptions(
        checkedValues.filter((value) => value !== "selectAll")
      );

      // 간혹 selectAll이 안지워지는 경우가 생기기에 selectAll을 삭제.
      setSelectedOptions(
        checkedValues.filter((value) => value !== "selectAll")
      );
      //검색한 옵션들 중 하나라도 선택되지 않은 경우
    } else {
      if (selectedOptions.includes(clickSel))
        setSelectedOptions(
          selectedOptions.filter(
            (option) => option !== clickSel && option !== "selectAll"
          )
        );
      else {
        //모든 옵션이 선택된 상태
        if (selectedOptions.length === options.length - 1) {
          setSelectedOptions([...selectedOptions, clickSel, "selectAll"]);
        } else {
          setSelectedOptions([...selectedOptions, clickSel]);
        }
      }
    }
  };

  //검색값 작성시 변경
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
    if (!visible) {
      setSearchValue("");
    }
  };

  //체크박스 전체선택 및 해제
  const handleSelectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedOptions([
        ...options.map((option) => option.value),
        "selectAll",
      ]);
    } else {
      setSelectedOptions([]); //빈객체 저장
    }
  };

  //검색했을 때의 옵션 목록
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const menu = (
    <div style={{ maxHeight: 200, overflowY: "auto" }}>
      <Menu>
        <Menu.Item key="search">
          <Input
            className="adSearch"
            placeholder="광고주 검색"
            value={searchValue}
            onChange={handleSearchChange}
            style={{
              marginBottom: 3,
              marginLeft: -12,
              marginRight: -10,
              width: "120px",
            }}
          />
        </Menu.Item>
        {/* 검색값이 존재하지 않을 때에만 전체선택 코드 블록 실행 */}
        {!searchValue && (
          <Menu.Item key="selectAll">
            <Checkbox
              style={{
                marginLeft: -12,
              }}
              checked={selectedOptions.length === options.length + 1}
              indeterminate={
                selectedOptions.length > 0 &&
                selectedOptions.length < options.length + 1
              }
              onChange={handleSelectAll}
            >
              전체 선택
            </Checkbox>
          </Menu.Item>
        )}
        {/* Divider : 메뉴 수직분할선 */}
        <Menu.Divider style={{ marginTop: -4 }} />
        {filteredOptions.length === 0 ? (
          <div style={{ marginLeft: 10 }}>검색 결과 없음.</div>
        ) : (
          <CheckboxGroup
            style={{
              display: "flex",
              flexDirection: "column", //세로 방향 표시
            }}
            options={filteredOptions}
            value={selectedOptions.filter((value) => value !== "selectAll")}
            onChange={handleCheckboxChange}
            onClick={setSelect}
          />
        )}
      </Menu>
    </div>
  );
  onValueChange(selectedOptions);
  return (
    <Dropdown
      overlay={menu}
      open={dropdownVisible}
      onOpenChange={handleDropdownVisibleChange}
      trigger={["click"]}
    >
      <Input
        className="disp"
        style={{ width: "130px" }}
        size="small"
        value={`선택 광고주 (${
          selectedOptions.length > options.length
            ? selectedOptions.length - 1
            : selectedOptions.length
        }/${options.length})`} // => 선택된 광고주 수/ 전체 광고주 수
        onClick={() => setDropdownVisible(!dropdownVisible)}
        readOnly
      />
    </Dropdown>
  );
};

export default Adfilter;
