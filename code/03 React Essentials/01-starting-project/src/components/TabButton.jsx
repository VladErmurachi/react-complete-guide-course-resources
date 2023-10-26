
const TabButton = (props) => {
    const handleClick = () => {
        console.log("Hello World");
    }

    return <li>
        <button onClick={handleClick}>
            {props.children}
        </button>

    </li>
}
export default TabButton;