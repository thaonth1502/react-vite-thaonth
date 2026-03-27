import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";


const ViewUserDetail = (props) => {

    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen,
        loadUser
    } = props;

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

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
    const handleUpdateUserAvatar = async () => {
        //Step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            //success
            const newAvatar = resUpload.data.fileUploaded;
            // Step 2: update user
            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone
            );

            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();

                notification.success({
                    message: "Notification",
                    description: "Update avatar successfully."
                })
            } else {
                notification.error({
                    message: "Error message",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        } else {
            //failed
            notification.error({
                message: "Error Upload File",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    return (
        <Drawer
            width={"40vw"}
            title="User Detail"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? <>
                <p > ID: {dataDetail._id}</p ><br />
                <p>Full Name: {dataDetail.fullName}</p><br />
                <p>Email: {dataDetail.email}</p><br />
                <p>Phone Number: {dataDetail.phone}</p><br />
                <p>Avatar:</p>
                <div style={{
                    marginTop: "10px",
                    height: "100px", width: "150px",
                    border: "1px solid #CCC"
                }}>
                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                </div>
                <div>
                    <label htmlFor='btnUpload' style={{
                        display: "block",
                        width: "fit-content",
                        marginTop: "15px",
                        borderRadius: "5px",
                        padding: "10px",
                        background: "orange",
                        cursor: "pointer"

                    }}>Upload Avatar</label>
                    <input
                        type='file' hidden id='btnUpload'
                        onChange={(event) => handleOnChangeFile(event)}
                    />
                </div>
                {preview &&
                    <>
                        <div style={{
                            marginTop: "10px",
                            height: "100px", width: "150px",
                            marginBottom: "15px"
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview} />
                        </div>
                        <Button type="primary"
                            onClick={() => handleUpdateUserAvatar()}
                        >Save</Button>
                    </>
                }

            </>
                :
                <>
                    <p>No data</p>
                </>
            }
        </Drawer >
    )
}

export default ViewUserDetail;