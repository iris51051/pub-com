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
  const [inputValue, setInputValue] = useState("");
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
    } else if (filteredOptions.length === options.length) {
      //모든 옵션이 선택되지 않았을 때
      setSelectedOptions(
        checkedValues.filter((value) => value !== "selectAll")
      );
      if (
        //검색을 통해 목록 선택 진입 후 기존에 선택된 목록 중에 검색한 옵션의 목록이 있는가?
        checkedValues.every((item) => {
          return filteredOptions.some((filteredOptionsItem) => {
            return filteredOptionsItem.value === item;
          });
        })
      ) {
        //선택된 목록 중에 clicksel(검색 후 선택한 체크박스)의 값을 가지고 있는게 있는가?
        if (selectedOptions.includes(clickSel)) {
          //true==>clicksel을 off
          checkedValues = checkedValues.filter((option) => option !== clickSel);
        } //false==>clicksel을 on
        setSelectedOptions([...selectedOptions, ...checkedValues]);
      }
      //간혹 selectAll이 안지워지는 경우가 생기기에 selectAll을 삭제.
      setSelectedOptions(
        checkedValues.filter((value) => value !== "selectAll")
      );
    } else {
      if (selectedOptions.includes(clickSel))
        setSelectedOptions(
          selectedOptions.filter(
            (option) => option !== clickSel && option !== "selectAll"
          )
        );
      else {
        if (selectedOptions.length === options.length - 1) {
          setSelectedOptions([...selectedOptions, clickSel, "selectAll"]);
        } else {
          setSelectedOptions([...selectedOptions, clickSel]);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
    if (!visible) {
      setInputValue("");
      setSearchValue("");
    }
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedOptions([
        ...options.map((option) => option.value),
        "selectAll",
      ]);
    } else {
      setSelectedOptions([]);
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
        <Menu.Divider style={{ marginTop: -4 }} />
        {filteredOptions.length === 0 ? (
          <div style={{ marginLeft: 10 }}>검색 결과 없음.</div>
        ) : (
          <CheckboxGroup
            style={{
              display: "flex",
              flexDirection: "column",
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
        }/${options.length})`}
        onChange={handleInputChange}
        onClick={() => setDropdownVisible(!dropdownVisible)}
        readOnly
      />
    </Dropdown>
  );
};

export default Adfilter;
