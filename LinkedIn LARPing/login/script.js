const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

document.getElementById("forgot-pswd-prompt").addEventListener('click', async function() {
    const isValid = document.getElementById("email").reportValidity();
    document.getElementById("email").setAttribute('aria-invalid', !isValid);

    if (isValid){
        document.getElementById("securityq1").style.display = "block";
        await sleep(1);
        document.getElementById("securityq1").style.height = "3vh";

        document.getElementById("securityq1").addEventListener('input', async function(){
            document.getElementById("securityq2").style.display = "block";
            await sleep(1);
            document.getElementById("securityq2").style.height = "3vh";

            document.getElementById("securityq2").addEventListener('input', async function(){
                document.getElementById("securityq3").style.display = "block";
                await sleep(1);
                document.getElementById("securityq3").style.height = "3vh";

                document.getElementById("securityq3").addEventListener('input', async function(){
                    document.getElementById("securityq4").style.display = "block";
                    await sleep(1);
                    document.getElementById("securityq4").style.height = "3vh";

                    document.getElementById("securityq4").addEventListener('input', function(){
                        //pass
                    });
                });
            });
        });
    }
});