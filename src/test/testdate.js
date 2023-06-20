import { useState } from "react";
import { Transition } from "@headlessui/react";

const MultiSelect = ({ options }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {selectedItems.length === 0 ? (
              <span>Select options</span>
            ) : (
              <span>{selectedItems.join(", ")}</span>
            )}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm3.293.293a1 1 0 010 1.414L8.414 12l.879.879a1 1 0 01-1.414 1.414L7 13.414l-.879.879a1 1 0 11-1.414-1.414L5.586 12l-.879-.879a1 1 0 010-1.414L6 9.586l-.879-.879a1 1 0 111.414-1.414L7 7.586l.879-.879a1 1 0 011.414 1.414L8.414 8l.879.879z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <Transition
          show={selectedItems.length > 0}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {(ref) => (
            <div
              ref={ref}
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                <div
                  className="px-4 py-2 text-sm text-gray-700 cursor-pointer"
                  role="menuitem"
                  tabIndex="-1"
                  id="options-menu-item-0"
                  onClick={() => setSelectedItems([])}
                >
                  Clear selection
                </div>
              </div>
              <div className="py-1" role="none">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`${
                      selectedItems.includes(option)
                        ? "bg-blue-500 text-white"
                        : "text-gray-700"
                    } px-4 py-2 text-sm cursor-pointer`}
                    role="menuitem"
                    tabIndex="-1"
                    id={`options-menu-item-${index + 1}`}
                    onClick={() => handleItemClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default MultiSelect;
