document.addEventListener("DOMContentLoaded", () => {
    const formRegister = document.getElementById('registerForm')
    
    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault()
      
        const formData = new FormData(formRegister) //Dado un HTML lo transforma en un objeto iterator
        
        const userData = Object.fromEntries(formData) //Dado un objeto iterator lo transforma en un objeto simple
    
        try {
            console.log(userData);
            
            const response = await fetch('http://localhost:8080/api/sessions/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
                credentials: "include" 

            })
           
            const data = await response.json()
            
            if (data?.message == "Usuario creado correctamente") {
                window.location.href = "http://localhost:8080/api/sessions/viewlogin"
            } else {
                console.log(data);
            }
        } catch (e) {
            console.log(e);
        }
    })
})
