import { Button, Drawer } from "antd";


const ViewUserDetail = (props) => {

    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

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
                <div>
                    <img height={150} width={200}
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
                    <input type='file' hidden id='btnUpload' />
                </div>

                {/* <Button type="primary"> Upload Avatar</Button> */}


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