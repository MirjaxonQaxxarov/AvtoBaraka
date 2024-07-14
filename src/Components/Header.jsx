
export default function Header({count}) {
        return (
            <div className="Header">
                <div>First App</div>
                <div>{count>0? `Total user count:${count}`:"User not Yet :("}</div>
            </div>
        )
}