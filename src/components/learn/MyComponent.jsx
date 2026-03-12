// () => {}
// component = html + css + js
import './style.css'

const MyComponent = () => {
    // const name = "Rosemary"; //string
    const person = {
        name: "Rosemary",
        age: 37
    }
    return (
        <>
            <div> {JSON.stringify(person)} - Huong Thao </div>
            <div>{console.log("ROSEMARY")}</div>
            <div className="child"
                style={{ borderRadius: "10px" }}> Child </div>
        </>
    );
}
export default MyComponent;