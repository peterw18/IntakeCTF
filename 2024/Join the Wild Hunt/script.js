function editLeaderboard(){

    var elements = document.getElementsByTagName("td");
    var contents = [];
    for (var i = 0; i < elements.length; i++){
        if (i % 3 != 0){
            contents.push(elements[i]);
        }
    }

    for (var i = 0; i < contents.length; i++){
        contents[i].innerHTML = '<input type="text" value="'+contents[i].innerText+'" size="10" />';
    }

    document.getElementById("saveBtn").style.visibility = 'visible';

}

function finishEditing(){
    var elements = document.getElementsByTagName("td");
    var contents = [];
    for (var i = 0; i < elements.length; i++){
        if (i % 3 != 0){
            contents.push(elements[i]);
        }
    }

    for (var i = 0; i < contents.length; i++){
        contents[i].innerHTML = contents[i].children[0].value;
    }

    document.getElementById("saveBtn").style.visibility = 'hidden';

    flagReq();
}

function flagReq(){

    let postObj = {
        name1: document.getElementsByClassName("leaderboardName")[0].innerText, 
        name2: document.getElementsByClassName("leaderboardName")[1].innerText,
        name3: document.getElementsByClassName("leaderboardName")[2].innerText,
        name4: document.getElementsByClassName("leaderboardName")[3].innerText,
        name5: document.getElementsByClassName("leaderboardName")[4].innerText,
        jwt: getCookie("auth_token")
    };
    
    let post = JSON.stringify(postObj);
    const url = "https://peterw18.infinityfreeapp.com/jtwh/flagRequest.php";

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(post);

    xhr.onload = function () {
        document.getElementById("responseText").innerHTML = xhr.response;
        document.getElementById("responseModal").style.display = "block";
        if (xhr.response.includes("Sorry, only admins are permitted to edit the leaderboard...")){
            document.getElementById("scores").innerHTML = `
            <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        <tr>
          <td>1</td>
          <td class="leaderboardName">Tessa</td>
          <td>134890</td>
        </tr>
        <tr>
          <td>2</td>
          <td class="leaderboardName">Nellie</td>
          <td>126770</td>
        </tr>
        <tr>
          <td>3</td>
          <td class="leaderboardName">Keith</td>
          <td>124490</td>
        </tr>
        <tr>
          <td>4</td>
          <td class="leaderboardName">Jay</td>
          <td>108320</td>
        </tr>
        <tr>
          <td>5</td>
          <td class="leaderboardName">Ellis</td>
          <td>102800</td>
        </tr>`;
        }
    }
}

function jwtReq(){

    const url = "https://peterw18.infinityfreeapp.com/jtwh/jwtRequest.php";

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        document.cookie = "auth_token=" + xhr.response;
    } else {
        console.log(`Error: ${xhr.status}`);
    }
    };

}
jwtReq();

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

document.getElementById("responseClose").onclick = function() {
    document.getElementById("responseModal").style.display = "none";
}

document.getElementById("alertClose").onclick = function() {
    document.getElementById("alert-modal-content").style.display = "none";
}

window.onclick = function(event) {
  if (event.target == document.getElementById("responseModal")) {
    document.getElementById("responseModal").style.display = "none";
  }
} 