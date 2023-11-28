import { useEffect, useState } from "react";

import { Space } from "antd";

import AppHeader from "./components/AppHeader";
import UserSelector from "./components/UserSelector";
import UserTasks from "./components/UserTasks";

import "./assets/stylesheets/reset.scss";
import "./assets/stylesheets/App.scss";

const apiLink = import.meta.env.VITE_API_LINK;

const App = () => {
  const [users, setUsers] = useState([]);
  const [userTasks, setUserTasks] = useState({});
  const [selectedUser, setSelectedUser] = useState();
  const [selectedUserTasks, setSelectedUserTasks] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(`${apiLink}/users`);
      const users = await res.json();
      setUsers(users);
    };
    if (users.length == 0) getUsers();

    const getUsersTasks = async () => {
      if (userTasks?.[`${selectedUser}`]) {
        setSelectedUserTasks(userTasks[`${selectedUser}`]);
      } else {
        const res = await fetch(`${apiLink}/users/${selectedUser}/todos`);
        const tasks = await res.json();

        setUserTasks((prev) => {
          prev[`${selectedUser}`] = tasks;
          return prev;
        });

        setSelectedUserTasks(tasks);
      }
    };
    if (selectedUser) {
      setSelectedUserTasks([]);
      getUsersTasks();
    }
  }, [selectedUser]);

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  const updateTasks = (user, task) => {
    let newUserTasks = userTasks;
    newUserTasks[`${user}`].forEach((_task) => {
      if (_task.id == task.id) {
        _task.completed = true;
      }
    });
    setUserTasks(newUserTasks);
  };

  return (
    <>
      <AppHeader />
      <section className="app">
        <div className="app__container">
          <UserSelector users={users} selectHandler={selectUser} />
          <UserTasks
            user={selectedUser}
            initialTasks={selectedUserTasks}
            handleUpdateTasks={updateTasks}
          />
        </div>
      </section>
    </>
  );
};

export default App;
