import { useRef } from "react";
const Login = () => {
    const formRef = useRef()
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const datUser = Object.fromEntries(new FormData(formRef.current))
            
            const response = await fetch("/api/sessions/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include", //Recibir cookies de mi backend
                body: JSON.stringify(datUser)
            })
        
            if(response.status  == 200) {
                console.log("Usuario logueado correctamente");
                //e.target.reset()
            } else {
                console.log(response)
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit}>
                <input type="email"  placeholder="Email" name="email" required/>
                <input type="password" placeholder="Password" name="password"  required/>
                <button type="submit">Loguearse</button>
            </form>
        </div>
    );
};

export default Login;