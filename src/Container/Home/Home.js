import './Home.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';


const Home = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModal, setisEditModal] = useState(false);
    const [getId, setId] = useState("");

    useEffect(() => {
        getData();
    }, [])
    const showModal = () => {
        setIsModalOpen(true);
        setisEditModal(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    let [dataSource, setDatasource] = useState([]);



    const getData = () => {
        axios.get("http://localhost:3030/users").then((res) => {
            console.log("getdata", setDatasource(res.data));
        }).catch((err) => {
            console.log("error", err);
        })
    }

    const onFinish = (values) => {
        if (isEditModal) {
            console.log(values);

            axios.put(`http://localhost:3030/users/${getId}`, values)
                .then((res) => {
                    console.log(res);
                    getData();
                    setIsModalOpen(false);
                    form.resetFields();
                })
                .catch((err) => {
                    console.log("err", err);
                });
        } else {
            console.log("not edit");
            axios.post("http://localhost:3030/users", values)
                .then((res) => {
                    console.log(res);
                    getData();
                    setIsModalOpen(false);
                    form.resetFields();
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    };

    // const onFinish = (values) => {
    //     if (isEditModal) {
    //         console.log(values);
    //         axios.put("http://localhost:3030/users", values).then((res) => {
    //             console.log(res);
    //             getData();
    //             setIsModalOpen(false);
    //             form.resetFields();
    //         }).catch((err) => {
    //             console.log("err", err);
    //         })
    //     } else {
    //         console.log("not editt");
    //         axios.post("http://localhost:3030/users", values).then((res) => {
    //             console.log(res);
    //             getData();
    //             setIsModalOpen(false);
    //             form.resetFields();
    //         }).catch((err) => {
    //             console.log("err", err);
    //         })
    //     }


    // };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    const getByTestId = (id) => {
        setId(id);
        axios.get(`http://localhost:3030/users/${id}`)
            .then((res) => {
                console.log("get by id ", res.data);
                form.setFieldsValue({
                    name: res.data.name,
                    role: res.data.role,
                    city: res.data.city,
                });
                setIsModalOpen(true);
                setisEditModal(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const getDelete = (id) => {
        axios.delete("http://localhost:3030/users/" + id).then((res) => {
            console.log(res.data);
            getData();
        }).catch((err) => {
            console.log(err);
        })
    }


    const columns = [
        {
            key: '1',
            align: "center",
            title: 'ID',
            dataIndex: 'id'
        },
        {
            key: '2',
            align: "center",
            title: 'Name',
            dataIndex: 'name'
        },
        {
            key: '3',
            align: "center",
            title: 'Role',
            dataIndex: 'role'
        },
        {
            key: '4',
            align: "center",
            title: 'City',
            dataIndex: 'city'
        },
        {
            key: '5',
            title: 'Actions',
            render: (record) => {
                return <>
                    <EditOutlined onClick={() => { getByTestId(record.id); setIsModalOpen(true); setisEditModal(true); }} style={{ marginLeft: 10, color: 'green', fontSize: 20, cursor: 'pointer' }} />
                    <DeleteOutlined onClick={() => getDelete(record.id)} style={{ marginLeft: 10, color: 'red', fontSize: 20, cursor: 'pointer' }} />
                </>
            },
            align: "center"
        }
    ]
    return (
        <>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <div>
                    UserList
                </div>
                <div>
                    <Button type="primary" onClick={showModal}>+ Add Data</Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
            >
            </Table>
            <Modal style={{ textAlign: "center" }} title={isEditModal ? "Edit Data" : "Add Data"} open={isModalOpen} onCancel={handleCancel}
                footer={[
                    // <Button key="submit" type="primary" onClick={handleOk}>
                    //     Submit
                    // </Button>
                ]}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Name"
                        name={"name"}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Role!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your City!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form >
            </Modal >
        </>
    )
}
export default Home;