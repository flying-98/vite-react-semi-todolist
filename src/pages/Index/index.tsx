
import { useEffect, useState } from "react";
import { ToDoListItemType } from "@/type/index"
import { db } from "@/common/db"
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Tabs, TabPane } from "@douyinfe/semi-ui"
import ToDoList from "@/components/todo-list/index";

export default function Index() {
  const navigate = useNavigate()

  const [source, setSource] = useState<ToDoListItemType[]>([])

  const loadSource = () => {
    db.findAll("list").then(res => {
      setSource(res[0] || [])
    })
  }


  useEffect(() => {
    loadSource()
    // db.findByKey("list", 1).then((res) => {
    //   console.log(res);
    // })
    // db.findByIndex("list", "content", "Java").then((res) => {
    //   console.log("findByIndex", res);
    // })
  }, [])
  const handleChange = (item: ToDoListItemType) => {
    db.update("list", item).then(() => { loadSource() })
  }

  const handleAddOrEdit = () => {
    navigate("update")
  }
  const handleDelete = (key: any) => {
    db.deleteByKey("list", key).then(() => { loadSource() })
  }

  return (
    <Row>
      <Col span={15} offset={1}>
        <h1>TODOLIST</h1>
        <Button onClick={handleAddOrEdit}>
          NEW TODO
        </Button>
        <Tabs defaultActiveKey="active">
          <TabPane tab={<span>ACTIVE</span>} itemKey="active">
            <ToDoList data={source.filter(item => item.flag === "active" || item.flag === undefined)} onChange={handleChange} onDel={handleDelete} />
          </TabPane>
          <TabPane tab={<span>DONE</span>} itemKey="done">
            <ToDoList data={source.filter(item => item.flag === "done")} onChange={handleChange} onDel={handleDelete} />
          </TabPane>
        </Tabs>

      </Col>
    </Row>

  )
}

