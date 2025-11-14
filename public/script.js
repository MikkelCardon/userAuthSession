const button = document.getElementById("button")

button.addEventListener("click", async () => {
    console.log("Logging in!");
    
    const username = document.getElementById("username").value
    const password = document.getElementById("pass").value

    try{
        let res = await fetch("/login", {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
        })

        console.log(res);
        

        const data = await res.json()

        console.log("data: ", data);

        if(data.success){
            console.log("Redirecting to main page");
            
            window.location.href = "/";
        }
    } catch(error){
        console.error("Error: ", error)
    }
    
    
})