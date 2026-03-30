import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookControl = (props) => {
    const {
        isCreateOpen, setIsCreateOpen, loadBook
    } = props;
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmitBnt = async () => {
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
            // step 2: create book
            const resBook = await createBookAPI(
                newThumbnail, mainText, author, price, quantity, category
            );
            if (resBook.data) {
                resetAndCloseModal();
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

    const resetAndCloseModal = () => {
        setAuthor("");
        setCategory("");
        setMainText("");
        setPrice("");
        setQuantity("");
        setSelectedFile(null);
        setPreview(null);
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

    return (
        <Modal
            title="Create User"
            open={isCreateOpen}
            onOk={() => handleSubmitBnt()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Create"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Book Title</span>
                    <Input
                        value={mainText}
                        onChange={(event) => { setMainText(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Author</span>
                    <Input
                        value={author}
                        onChange={(event) => { setAuthor(event.target.value) }}
                    />
                </div>
                <div>
                    <div>Price</div>
                    <InputNumber
                        style={{ width: "100%" }}
                        addonAfter={' đ'}
                        value={price}
                        onChange={(event) => {
                            setPrice(event)
                        }}
                    />
                </div>
                <div>
                    <div>Quantity</div>
                    <InputNumber
                        style={{ width: "100%" }}
                        value={quantity}
                        onChange={(event) => {
                            setQuantity(event)

                        }}
                    />
                </div>
                <div>
                    <div>Category</div>
                    <Select
                        style={{ width: "100%" }}
                        value={category}
                        onChange={(event) => {
                            setCategory(event)
                        }}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },

                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },

                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' },
                        ]}
                    />
                </div>
                <div>
                    <div>Thumbnail</div>
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
                            onClick={(event) => event.target.value = null} />
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
            </div>
        </Modal>

    )
}

export default CreateBookControl;