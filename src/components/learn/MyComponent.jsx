// () => {}
// component = html + css + js
import './style.css'

const MyComponent = () => {
    return (
        <>
            <div> Rosemary & Huong Thao </div>
            <div className="child"
                style={{ borderRadius: "10px" }}> Child </div>
        </>
    );
}
export default MyComponent;