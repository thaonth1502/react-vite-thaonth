import { Input, Form, InputNumber, Modal, Select, notification } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBook = (props) => {
    const {
        isCreateOpen, setIsCreateOpen, loadBook
    } = props;

    const [form] = Form.useForm();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const resetAndCloseModal = () => {
        form.resetFields();
        setPreview(null);
        setSelectedFile(null);
        setIsCreateOpen(false);
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleSubmitBnt = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Please upload thumbnail."
            })
            return;
        }
        // Step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            // success
            const newThumbnail = resUpload.data.fileUploaded;
            const { mainText, author, price, quantity, category } = values;
            // step 2: create book
            const resBook = await createBookAPI(
                newThumbnail, mainText, author, price, quantity, category
            );
            if (resBook.data) {
                resetAndCloseModal();
                console.log(">>> check data", resBook.data);

                await loadBook();
                notification.success({
                    message: "Create book",
                    description: "Book created successfully."
                })
            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook.message)
                })
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }
    return (
        <Modal
            title="Create Book"
            open={isCreateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Create"}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitBnt}
            >
                <div style={{ display: "flex", flexDirection: "column" }}><Form.Item
                    label="Book Title"
                    name="mainText"
                    rules={[{ required: true, message: 'Please input book title.' }]}>
                    <Input placeholder="Input book title" />
                </Form.Item></div>
                <div><Form.Item
                    label="Author"
                    name="author"
                    rules={[{
                        required: true,
                        message: 'Please input author of book.'
                    }]}>
                    <Input placeholder="Input author" />
                </Form.Item></div>

                <div><Form.Item
                    label="Price"
                    name="price"
                    rules={[{
                        required: true,
                        message: 'Please input price of book.'
                    }]}>
                    <InputNumber placeholder="Input price" style={{ width: "100%" }} addonAfter={' đ'} />
                </Form.Item></div>
                <div> <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[{
                        required: true,
                        message: "Please input quantity of book"
                    }]}>
                    <InputNumber placeholder="Input quantity" style={{ width: "100%" }} />
                </Form.Item></div>
                <div><Form.Item
                    label="Category"
                    name="category"
                    rules={[{
                        required: true,
                        message: "Please input category of book"
                    }]}>
                    <Select options={[{ value: 'Arts', label: 'Arts' },
                    { value: 'Business', label: 'Business' },
                    { value: 'Comics', label: 'Comics' },

                    { value: 'Cooking', label: 'Cooking' },
                    { value: 'Entertainment', label: 'Entertainment' },
                    { value: 'History', label: 'History' },

                    { value: 'Music', label: 'Music' },
                    { value: 'Sports', label: 'Sports' },
                    { value: 'Teen', label: 'Teen' },
                    { value: 'Travel', label: 'Travel' },
                    ]} />
                </Form.Item></div>
                <div>
                    <div>Image Thumbnail</div>
                    <div>
                        <label htmlFor="btnUpload" style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>Upload</label>
                        <input type="file" hidden id='btnUpload'
                            onChange={(event) => handleOnChangeFile(event)}
                            onClick={(event) => event.target.value = null}
                            style={{ display: "none" }} />
                    </div>
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                height: "100px", width: "150px"
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                        </>
                    }
                </div>
            </Form >

        </Modal>
    )
}

export default CreateBook;