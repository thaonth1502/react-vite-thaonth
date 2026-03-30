import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookControl = (props) => {
    const {
        dataUpdate, setDataUpdate,
        isModalUpdateOpen, setIsModalUpdateOpen,
        loadBook
    } = props;
    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setId(dataUpdate._id);
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setCategory(dataUpdate.category);
            setQuantity(dataUpdate.quantity);
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate])

    const updateBook = async (newThumbnail) => {
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
    const handleSubmitBnt = async () => {
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
        await updateBook(newThumbnail);
    }

    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
        setId("");
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
            onOk={() => handleSubmitBnt()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Update"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>ID</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
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
export default UpdateBookControl;