import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBook = (props) => {
    const [form] = Form.useForm();

    const {
        dataUpdate, setDataUpdate,
        isModalUpdateOpen, setIsModalUpdateOpen,
        loadBook
    } = props;


    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                category: dataUpdate.category,
                quantity: dataUpdate.quantity,
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate])

    const updateBook = async (newThumbnail, values) => {
        const { id, mainText, author, price, quantity, category } = values;
        const resBook = await updateBookAPI(
            id, newThumbnail, mainText, author, price, quantity, category
        );
        if (resBook.data) {
            resetAndCloseModal();
            await loadBook();
            notification.success({
                message: "Update book",
                description: "Book updated successfully."
            })
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(resBook.message)
            });
        }
    }
    const handleSubmitBnt = async (values) => {

        // khong co anh preview && khong co file => return
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error upload book",
                description: "Please upload image."
            })
            return;
        }
        let newThumbnail = "";
        // co anh preview va khong co file => khong upload file
        if (!selectedFile && preview) {
            newThumbnail = dataUpdate.thumbnail;
        }
        else {
            // cos anh preview va co file
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                // success
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                });
                return;
            }
        }
        await updateBook(newThumbnail, values);
    }

    const resetAndCloseModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setIsModalUpdateOpen(false);
        setDataUpdate(null)
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

    return (
        <Modal
            title="Update Book"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Update"}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitBnt}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Item
                        label="ID"
                        name="id">
                        <Input disabled />
                    </Form.Item>
                </div>
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
export default UpdateBook;