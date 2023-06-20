import React, { useState } from "react";
import { Select, Input } from "antd";

const { Option } = Select;

const MySelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options.map((option) => option.value));
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const options = [
    { value: "1", label: "네이버" },
    { value: "2", label: "다음" },
    { value: "3", label: "구글" },
    { value: "4", label: "페이스북" },
    { value: "5", label: "Option 5" },
  ];

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isAllOptionsSelected = selectedOptions.length === options.length;

  return (
    <>
      <Select
        onChange={handleSelectChange}
        value={`광고주 선택 (${selectedOptions.length}/${options.length})`}
        optionLabelProp="label"
        size="small"
        style={{
          width: "200px",
        }}
        dropdownRender={(menu) => (
          <div>
            <div style={{ padding: "8px" }}>
              <Input
                placeholder="Search"
                value={searchValue}
                onChange={handleSearch}
                style={{ width: "100%" }}
              />
            </div>
            <div
              onClick={() => handleSelectAll()}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              <input type="checkbox" checked={isAllOptionsSelected} readOnly />
              Select All
            </div>
            <hr style={{ margin: "5px 0" }} />
            {menu}
          </div>
        )}
      >
        {filteredOptions.map((option) => (
          <Option key={option.value} value={option.value} label={option.label}>
            {option.label}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default MySelect;
