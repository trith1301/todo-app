import { useEffect, useState } from "react";

import { Divider, Typography, Spin, List, Button } from "antd";
import { MinusSquareOutlined, CheckCircleOutlined } from "@ant-design/icons";

import "../assets/stylesheets/Task.scss";

const apiLink = import.meta.env.VITE_API_LINK;

const Task = ({ task, handleMarkDone }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const executor = async () => {
      const body = {
        completed: true,
      };

      const res = await fetch(`${apiLink}/todos/${task.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setLoading(!loading);
      handleMarkDone();
    };
    if (loading) executor();
  }, [loading]);

  const markDone = () => {
    setLoading(!loading);
  };

  return (
    <div className="task">
      <div>
        {!task.completed ? (
          <MinusSquareOutlined style={{ color: "#e67e22" }} />
        ) : (
          <CheckCircleOutlined style={{ color: "#2ecc71" }} />
        )}
        <p style={{ marginLeft: "20px" }}>{task.title}</p>
      </div>
      {!task.completed && (
        <Button onClick={markDone} loading={loading}>
          Mark done
        </Button>
      )}
    </div>
  );
};

export default Task;
