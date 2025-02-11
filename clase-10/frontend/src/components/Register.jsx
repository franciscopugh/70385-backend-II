import { useRef } from "react";

const Register = () => {

    const formRef = useRef()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData(formRef.current) //Me transofrma un form HTML en un objeto iterable
            const userData = Object.fromEntries(formData) //Me transforma un objeto iterable en un objeto simple
            const response = await fetch("/api/sessions/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userData)
            })
            if(response.status == 201) {
                console.log("Usuario correctamente")
                e.target.reset() //Reseteo el formulario
            }  else {
                console.log(response);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" name="first_name" required/>
                <input type="text" placeholder="Last Name" name="last_name" required/>
                <input type="number" placeholder="Age" name="age" required/>
                <input type="email" placeholder="Email" name="email" required/>
                <input type="password" placeholder="Password" name="password" required/>
                <button type="submit">Registrar Usuario</button>
            </form>
        </div>
    );
};

export default Register;