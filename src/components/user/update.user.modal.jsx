import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } = props;

    useEffect(() => {
        console.log(">>> check data update props", dataUpdate);
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])

    const handleSubmitBtn = async () => {

        const res = await createUserAPI(fullName, email, password, phone)

        if (res.data) {
            notification.success(
                {
                    message: "Information",
                    description: "Tạo mới user thành công."
                }
            )
            resetAndCloseModal()
            //  await loadUser();
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setId("");
        setPhone("");
        setDataUpdate(null)
    }



    return (
        <Modal
            title="Update User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <div>
                        <span>Id</span>
                        <Input
                            value={id}
                            disabled
                        />
                    </div>
                    <span>Full Name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
                    />
                </div>

                <div>
                    <span>Phone Number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }}
                    />
                </div>
            </div>
        </Modal>

    )
}
export default UpdateUserModal;