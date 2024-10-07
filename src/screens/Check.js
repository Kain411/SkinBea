import { useRef, useState } from "react"

const Check = () => {

    const [email, setEmail] = useState('');
    const mail = useRef();


    return (
        <div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />

            <input value={mail} />
        </div>
    )
}