import ReactDOM from "react-dom";
import {useRef, useState} from "react";

export function Modal({openModal, appendUser}) {

    const [gender, setGender] = useState("");

    const firstName = useRef('');
    const lastName = useRef('');
    const imgURL = useRef('');
    const age = useRef(0);
    const formData = useRef();
    const saveData = (e) => {
        e.preventDefault();
        let data = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            imgURL: imgURL.current.value,
            age: age.current.value,
            gender: gender
        };
        // console.log(data)
        appendUser(data)
        formData.current.reset()
        openModal()
    }
    return ReactDOM.createPortal((<div className="modal" onClick={openModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form ref={formData} onSubmit={saveData}>
                <label>
                    <span>Last name</span>
                    <input required ref={lastName} type="text"/>
                </label>
                <label>
                    <span>First name</span>
                    <input required ref={firstName} type="text"/>
                </label>


                <label>
                    <span>Img URL</span>
                    <input required ref={imgURL} type="text"/>
                </label>

                <label>
                    <span>Age</span>
                    <input required ref={age} type="number"/>
                </label>

                <p style={{color: "black", textAlign: "center"}}>Gender</p>
                <div style={{display: "grid", gridTemplateColumns: '1fr 1fr', marginTop: "10px"}}>
                    <label for="male">
                        male
                        <input required onClick={() => setGender("male")} type="radio" name="gender" id="male"/>
                    </label>
                    <label for="female">
                        famale
                        <input required onClick={() => setGender("female")} type="radio" name="gender" id="female"/>
                    </label>
                </div>
                <button style={{width: "100%", marginTop: "30px"}}>Save</button>
            </form>
        </div>
    </div>), document.body)
}