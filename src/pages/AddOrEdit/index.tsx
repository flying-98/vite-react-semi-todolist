import { Form, Row, Col, Button } from '@douyinfe/semi-ui';
import { useNavigate } from "react-router-dom";
import { db } from "@/common/db"
import dayjs from "dayjs"
import { timeFormat } from "@/type/index";

export default function AddOrEdit() {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  const handleSubmit = (value: any) => {
    if (value.startTime) {
      value.startTime = dayjs(value.startTime).format(timeFormat.en)
    }
    if (value.endTime) {
      value.endTime = dayjs(value.endTime).format(timeFormat.en)
    }
    db.add("list", value)
    handleBack()
  }
  const Rules = {
    content: [
      {
        required: true
      }
    ]
  }
  return (
    <div style={{ paddingTop: "30px" }}>
      <Row>
        <Col span={10} offset={2}>
          <Form onSubmit={handleSubmit}>
            <Form.Section text={"NEW TODO"}>
              <Form.Input rules={Rules.content} field='content' label="TODO"></Form.Input>
              <Form.DatePicker format='yyyy-MM-dd HH:mm' type="dateTime" field='startTime' density="compact" label="START TIME"></Form.DatePicker>
              <Form.DatePicker format='yyyy-MM-dd HH:mm' type="dateTime" field='endTime' density="compact" label="END TIME"></Form.DatePicker>
            </Form.Section>
            <Button type="primary" htmlType="submit" style={{ marginRight: "20px" }}>ADD</Button>
            <Button onClick={handleBack}>BACK</Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
