import React from 'react';
import {useEffect, useState} from 'react';
import {Button, Col, Form, InputGroup, Modal, Row} from "react-bootstrap";

function StudentForm({show, setShow, studentData, setStudentData, formTitle}) {
    const [validated, setValidated] = useState(false); //表單驗證
    const [formInputs, setFormInputs] = useState({ //儲存表單輸入框的值
        "id": "",
        "name": "",
        "sex": "",
        "born": "",
        "email": "",
        "phone": "",
        "address": ""
    });

    //如果為編輯表單就設定輸入框預設值
    useEffect(() => {
        if (formTitle.title === "編輯資料") {
            for (let i = 0; i < studentData.length; i++) {
                if (studentData[i].id === formTitle.id) {
                    setFormInputs(studentData[i]);
                }
            }
        }
    }, [formTitle])

    //獲取輸入欄的輸入欄的資料
    const changeFormInputs = (event) => {
        setFormInputs({
            ...formInputs, [event.target.id]: event.target.value
        });
    }

    //關閉表單
    const formClose = () => {
        setShow(false);
        setValidated(false);
        clearInputs();
    }

    //清空輸入框
    const clearInputs = () => {
        setFormInputs({
            ...formInputs,
            id: "",
            name: "",
            sex: "",
            born: "",
            email: "",
            phone: "",
            address: "",
        });
    }

    //表單提交
    const studentDataSubmit = (event) => {

        const form = event.currentTarget;

        //如果驗證錯誤就停留，否則提交
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            setValidated(true);
        } else if (formTitle.title === "新增資料") {
            event.preventDefault();
            event.stopPropagation();

            //判斷是否有重複的學號
            for (let i = 0; i < studentData.length; i++) {
                if (studentData[i].id === formInputs.id) {
                    alert("學號重複")

                    //清除id輸入框
                    setFormInputs({
                        ...formInputs, id: ""
                    });

                    setValidated(true);

                    return;
                }
            }

            setStudentData((arr) => [...arr, formInputs]); //新增資料

            setValidated(false);
            setShow(false);
            alert("新增成功");
            clearInputs();
        } else {
            event.preventDefault();
            event.stopPropagation();

            //判斷是否有重複的學號
            for (let i = 0; i < studentData.length; i++) {
                if (studentData[i].id === formInputs.id && studentData[i].id !== formTitle.id) {
                    alert("學號重複")

                    //清除id輸入框
                    setFormInputs({
                        ...formInputs, id: ""
                    });

                    setValidated(true);

                    return;
                }
            }

            let newStudentData = studentData;

            for (let i = 0; i < newStudentData.length; i++) {
                if (newStudentData[i].id === formTitle.id) {
                    newStudentData[i] = formInputs;
                    setStudentData(newStudentData);
                }
            }

            alert("編輯成功");
            setValidated(false);
            setShow(false);
            clearInputs();
        }
    }

    return (
        <Modal
            show={show}
            onHide={formClose}
            backdrop="static"
            keyboard={false}
            size={"lg"}
        >
            <Modal.Header className={formTitle.color}>
                <Modal.Title>
                    {formTitle.title}
                </Modal.Title>
            </Modal.Header>
            <Form validated={validated} noValidate onSubmit={studentDataSubmit}>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="id">
                            <Form.Label>學號</Form.Label>
                            <Form.Control required type="text" value={formInputs.id} onChange={changeFormInputs}/>
                            <Form.Control.Feedback type={"invalid"}>
                                請輸入學號
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="name">
                            <Form.Label>姓名</Form.Label>
                            <Form.Control required type="text" value={formInputs.name} onChange={changeFormInputs}/>
                            <Form.Control.Feedback type={"invalid"}>
                                請輸入姓名
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="sex">
                            <Form.Label>
                                性別
                            </Form.Label>
                            <InputGroup hasValidation>
                                <Form.Select required onChange={changeFormInputs} value={formInputs.sex}>
                                    <option disabled value={""}>請選擇性別...</option>
                                    <option value="M">男</option>
                                    <option value="F">女</option>
                                </Form.Select>
                                <Form.Control.Feedback type={"invalid"}>
                                    請選擇性別
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="born">
                            <Form.Label>生日</Form.Label>
                            <Form.Control required type="date" value={formInputs.born} onChange={changeFormInputs}/>
                            <Form.Control.Feedback type={"invalid"}>
                                請輸入生日
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="phone">
                            <Form.Label>電話</Form.Label>
                            <Form.Control required type="text" value={formInputs.phone} onChange={changeFormInputs}/>
                            <Form.Control.Feedback type={"invalid"}>
                                請輸入電話
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" value={formInputs.email} onChange={changeFormInputs}/>
                            <Form.Control.Feedback type={"invalid"}>
                                請輸入正確Email
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="address">
                            <Form.Label>住址</Form.Label>
                            <Form.Control required type="text" value={formInputs.address} onChange={changeFormInputs}/>
                            <Form.Control.Feedback type={"invalid"}>
                                請輸入住址
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={formClose}>
                        返回
                    </Button>
                    <Button variant="primary" type={"submit"}>
                        送出
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default StudentForm;