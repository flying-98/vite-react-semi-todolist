import { List, Row, Col, ButtonGroup, Button } from "@douyinfe/semi-ui"

import { ToDoListItemType } from "@/type/index";

interface ToDoListPropsType {
    data: ToDoListItemType[],
    onChange: (item: ToDoListItemType) => void
    onDel: (key: any) => void
}

export default function ToDoList(props: ToDoListPropsType) {


    const renderItemOption = (item: ToDoListItemType) => {
        if (item.flag !== "done") {
            return (
                <ButtonGroup theme="borderless">
                    <Button onClick={() => { item.flag = "done"; props.onChange(item) }}> DONE</Button >
                    <Button type="tertiary">EDIT</Button>
                </ButtonGroup >
            )
        }

        if (item.flag === "done") {
            return (
                <ButtonGroup theme="borderless">
                    <Button type="tertiary" onClick={() => { item.flag = "active"; props.onChange(item) }}>CANCEL</Button>
                    <Button type="danger" onClick={() => props.onDel(item.id)}>DELETE</Button>
                </ButtonGroup>
            )
        }
    }


    const renderItem = (item: ToDoListItemType) => (<List.Item extra={renderItemOption(item)}>
        <div style={{ flex: 1 }}>
            <Row type="flex" align="middle">
                <Col span={23}>
                    <div style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.content}</div>
                    <Row gutter={2}>
                        <Col span={12}>
                            <span>START TIME: {item.startTime?.toLocaleString()}</span>
                        </Col>
                        <Col span={12}>
                            <span>END TIME: {item.endTime?.toLocaleString()}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    </List.Item>)
    return (
        <List dataSource={props.data} renderItem={renderItem}></List>
    )
}
