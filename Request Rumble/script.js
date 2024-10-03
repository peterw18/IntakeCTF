document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (password.length >= 12){
        alert("JS: Password must be less than 12 characters!");
        // check client side so only have to check once in the backend
        // classified as JS so can debug
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "login.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText.includes("Intake24")) {
                    document.getElementById('flagContainer').style.display = 'block';
                    document.getElementById('loginForm').style.display = 'none';
                    document.getElementById('flag').innerText = xhr.responseText;
                } else {
                    alert('PHP: Password must be at least 12 characters!');
                    // returned from php, so checked backend
                    // classified as PHP so can debug
                }
            }
        };
        xhr.send("username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
    }

    
});
