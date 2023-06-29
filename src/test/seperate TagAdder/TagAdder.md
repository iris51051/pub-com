TagAdder와 TagDrawer 분리해서 불러올 때의 App.js

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
