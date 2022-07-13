import React from 'react';
import {Alert, Button, Container, Table} from "react-bootstrap";
import {student} from "../../data/student.jsx";
import {useState} from "react";
import StudentForm from "./components/StudentForm.jsx";

function Home() {
    const [studentData, setStudentData] = useState(student); //設定學生資料
    const [show, setShow] = useState(false); //判斷是否顯示表單
    const [formTitle, setFormTitle] = useState({color: "", title: "", id: ""});

    //顯示新增表單
    const addFormShow = () => {
        setFormTitle({
            ...formTitle, "color": "alert-success", "title": "新增資料"
        });
        setShow(true);
    }

    //顯示編輯表單
    const editFormShow = (event) => {
        setFormTitle({
            ...formTitle, color: "alert-primary", title: "編輯資料", id: event.target.id
        });
        setShow(true);
    }

    //刪除資料
    const deleteStudentData = (event) => {
        if (window.confirm("請問是否要刪除")) {
            setStudentData((arr) => {
                return arr.filter((data) => data.id !== event.target.id)
            });
            alert("刪除成功");
        }
    }

    return (<Container className={"container text-center mt-3"}>
            <Alert variant={"success"}>
                <h1>學生資料管理系統</h1>
                <br/>
                <h2>目前資料筆數 : {studentData.length}</h2>
            </Alert>
            <Table className={"table-hover table-bordered table-striped"}>
                <thead>
                <tr>
                    <th>學號</th>
                    <th>姓名</th>
                    <th>性別</th>
                    <th>生日</th>
                    <th>電子郵件</th>
                    <th>電話</th>
                    <th>住址</th>
                    <th>功能</th>
                </tr>
                </thead>
                <tbody>
                {studentData.map(data => {
                    const {id, name, sex, born, email, phone, address} = data; //解構data物件
                    return (<tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{sex}</td>
                            <td>{born}</td>
                            <td>{email}</td>
                            <td>{phone}</td>
                            <td>{address}</td>
                            <td>
                                <Button
                                    variant={"primary"}
                                    className={"me-3"}
                                    id={id}
                                    onClick={editFormShow}
                                >修改
                                </Button>
                                <Button
                                    variant={"danger"}
                                    id={id}
                                    onClick={deleteStudentData}
                                >刪除
                                </Button>
                            </td>
                        </tr>);
                })}
                </tbody>
            </Table>
            <button className={"btn btn-success"} onClick={addFormShow}>新增</button>
            <StudentForm
                show={show}
                setShow={setShow}
                studentData={studentData}
                setStudentData={setStudentData}
                formTitle={formTitle}
            />
        </Container>);
}

export default Home;