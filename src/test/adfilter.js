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
  const [filterSelect, setFilterSelect] = useState([]);
  let clickSel = "";
  const setSelect = (event) => {
    clickSel = event.target.value;
    console.log("setSelect함수의 clickSel=", clickSel);
  };
  const handleCheckboxChange = (checkedValues) => {
    console.log("1번");
    console.log("checkedValues", checkedValues);
    console.log("selectedOptions", selectedOptions);
    console.log("filteredOptions", filteredOptions);
    console.log("handleCheckboxChang함수의 clickSel=", clickSel);

    if (
      checkedValues.filter((option) => option !== "selectAll").length ===
      options.length
    ) {
      console.log("2번");
      setSelectedOptions([...checkedValues, "selectAll"]);
    } else if (filteredOptions.length === options.length) {
      console.log("3번");
      setSelectedOptions(
        checkedValues.filter((value) => value !== "selectAll")
      );
      if (
        checkedValues.every((item) => {
          return filteredOptions.some((filteredOptionsItem) => {
            return filteredOptionsItem.value === item;
          });
        })
      ) {
        console.log("4번");
        if (selectedOptions.includes(clickSel)) {
          checkedValues = checkedValues.filter((option) => option !== clickSel);
        }
        console.log("5번 진입");
        setSelectedOptions([...selectedOptions, ...checkedValues]);
        console.log("filterSelect", filterSelect);
        console.log("checkedValues", checkedValues);
        console.log("selectedOptions", selectedOptions);
        console.log("filteredOptions", filteredOptions);
      }
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
