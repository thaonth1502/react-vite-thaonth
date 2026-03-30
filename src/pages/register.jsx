import { Button, Input, Form, notification, Row, Col, Divider } from "antd";
import { registerUserAPI } from "../services/api.service"
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        //call api
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone);
        if (res.data) {
            notification.success({
                message: "Notification",
                description: "Register user successfully."
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Error message",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <Row justify={"center"}
            style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <h2 style={{ textAlign: "center" }}>Đăng ký tài khoản</h2>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[{ required: true, message: 'Tên không được để trống' }]}>
                            <Input placeholder="Nhập tên" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Email không được để trống.'
                            }]}>
                            <Input placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Password không được để trống.'
                            }]}>
                            <Input.Password placeholder="Nhập password" />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[{
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Sai định dạng Phone Number. Hãy nhập số."
                            }
                            ]}>
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                        <Form.Item>
                            <div style={{
                                display: "flex",
                                alignItems: 'end'
                            }}>
                                <Button type="primary" onClick={() => form.submit()}>
                                    Register</Button>
                            </div>
                        </Form.Item>
                    </Form >
                    <Divider />
                    <div style={{ textAlign: "center" }}>Đã có tài khoản?
                        <Link to={"/login"}> Đăng nhập tại đây</Link>
                    </div>
                </fieldset>
            </Col >
        </Row >

    )
}

export default RegisterPage;