import { Drawer } from "antd";


const ViewUserDetail = (props) => {

    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

    return (
        <Drawer title="User Detail"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? <>
                <p>ID: {dataDetail._id}</p><br />
                <p>Full Name: {dataDetail.fullName}</p><br />
                <p>Email: {dataDetail.email}</p><br />
                <p>Phone Number: {dataDetail.phone}</p><br />

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