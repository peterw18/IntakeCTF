<?php

function giveFlag(){
    echo "Congratulations! The flag is Intake24{maxwellNeedsToLearnAboutPrivacySettings}";
}

$email = htmlspecialchars($_POST['email']);
$password = htmlspecialchars($_POST['password']);
$sq1Ans = strtolower(htmlspecialchars($_POST['sq1']));
$sq2Ans = strtolower(htmlspecialchars($_POST['sq2']));
$sq3Ans = strtolower(htmlspecialchars($_POST['sq3']));
$sq4Ans = strtolower(htmlspecialchars($_POST['sq4']));
$otp = htmlspecialchars($_POST['otp']);


if ($email == "mmitchell@kuphal.co.uk"){
    if ($password == 'Z0$b6Wq6O7D!' && $otp == 266466){
        giveFlag();
    } elseif ($sq1Ans == "aubert"){
        if ($sq2Ans == "smithdon" || $sq2Ans == "smithdon high school"){
            if ($sq3Ans == "puff"){
                if ($sq4Ans == "junior"){
                    if ($otp == 266466){
                        giveFlag();
                    } else {
                        echo "Sorry, OTP is incorrect...";
                    }
                } else {
                    echo "Sorry, security question 4 was incorrect...";
                }
            } else {
                echo "Sorry, security question 3 was incorrect...";
            }
        } else {
            echo "Sorry, security question 2 was incorrect...";
        }
    } else {
        echo "Sorry, security question 1 was incorrect...";
    }
} else {
    echo "Sorry, we could not recover your password.";
}

// I want to make it a little easier for them, just so they can be sure when they've got the formatting correct haha!



?>