import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const onFinish = async (value) => {
        setLoading(true)
        const res = await loginAPI(value.email, value.password)
        if (res.data) {
            message.success("Đăng nhập thành công. ");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        } else {
            notification.error({
                message: "Error message",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
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
                    <legend>Đăng nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ margin: "10px" }}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email không đúng định dạng.',
                                },
                                {
                                    required: true,
                                    message: 'Email không được bỏ trống.'
                                }]}>
                            <Input placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Password không được bỏ trống.'
                                }
                            ]}>
                            <Input.Password placeholder="Nhập password" onKeyDown={(event) => {
                                if (event.key === 'Enter')
                                    form.submit();
                            }} />
                        </Form.Item>
                        <Form.Item>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",

                            }}>
                                <Button loading={loading} type="primary" onClick={() => form.submit()}>
                                    Login
                                </Button>
                                <Link to={"/"}>Go to homepage <ArrowRightOutlined /> </Link>
                            </div>
                        </Form.Item>
                    </Form >
                    <Divider />
                    <div style={{ textAlign: "center" }}>Chưa có tài khoản? <Link to={"/register"}> Đăng kí tại đây</Link>
                    </div>
                </fieldset>
            </Col>
        </Row >

    )
}

export default LoginPage;