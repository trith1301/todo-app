import { useEffect, useState, useMemo } from "react";

import { Divider, Typography, Spin, List, Button } from "antd";
import { MinusSquareOutlined, CheckCircleOutlined } from "@ant-design/icons";

import Task from "./Task";

import "../assets/stylesheets/UserTasks.scss";

const apiLink = import.meta.env.VITE_API_LINK;

const UserTasks = ({ user, initialTasks, handleUpdateTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(
    () => {
      const doneTasks = initialTasks.filter((task) => task.completed);
      const notDoneTasks = initialTasks.filter(
        (task) => !doneTasks.includes(task)
      );

      setTasks([...notDoneTasks, ...doneTasks]);
      setDoneTasks(doneTasks);
    },
    [JSON.stringify(initialTasks)],
    refresh
  );

  const markDoneTask = (task) => {
    handleUpdateTasks(user, task);
    setRefresh(!refresh);
  };

  return (
    <>
      <Divider orientation="left" orientationMargin={0}>
        Tasks
      </Divider>
      <div className="user-tasks__view">
        <List
          loading={user && tasks.length == 0 ? true : false}
          dataSource={tasks}
          renderItem={(item) => (
            <List.Item>
              <Task
                task={item}
                handleMarkDone={() => {
                  markDoneTask(item);
                }}
              />
            </List.Item>
          )}
        />
      </div>
      <Typography>
        Done {doneTasks.length}/{initialTasks.length} task(s)
      </Typography>
    </>
  );
};

export default UserTasks;
