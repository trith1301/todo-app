import { Divider, Cascader } from "antd";

const UserSelector = ({ users, selectHandler }) => {
  const options = users.map((user) => {
    return { value: user.id, label: user.name };
  });

  const onChange = (value, selectedOptions) => {
    selectHandler(value[0]);
  };

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  return (
    <>
      <Divider orientation="left" orientationMargin={0}>
        User
      </Divider>
      <Cascader
        options={options}
        onChange={onChange}
        placeholder="Please select"
        showSearch={{
          filter,
        }}
      />
    </>
  );
};

export default UserSelector;
