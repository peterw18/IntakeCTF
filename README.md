# Intake24 Write-Ups

## Request Rumble

### Introduction

This is a very basic Parameter Manipulation vulnerability.

According to the error messages, the JavaScript running on the client version of the website requires the password to be less than 12 characters.
However, if one enters a password less than 12 characters the PHP running server-side throws an error, requesting a password longer than 12 characters.

Therefore, the password must be changed post JS-processing, but before it reaches the backend (or we must send a request to the backend directly).

### Using Burp Suite
Burp Suite is software that, among other features, allows one to edit a HTTP request after it has been sent by the browser.

1. Ensure that the Burp Suite Proxy is correctly set up in browser, and enabled in-app.
2. Enter a password into the form that meets the JS requirements (i.e. less than 12 characters long)
3. When you click submit, the request appears in the **Proxy** window of Burp Suite, and you can view and edit it.
4. At this point, change the *password* variable to have a value longer than 12 characters (this can be found, usually, at the bottom of the request since it is POST data)
5. The PHP will return the flag since the password is longer than 12 characters

### Using Curl
Curl is a command line tool and library for transferring data with URLs. 

It is possible to directly issue a request to the *login.php* file using curl:
```
curl -X POST https://xxxxxxxx-request-rumble-web.chall.warwickcybersoc.com/login.php -d "username=admin&password=morethantwelve"
```
This directly bypasses the JS verification and so the password only needs to be longer than 12 characters to retrieve the flag.



## Join the Wild Hunt

### Introduction
My apologies (but not really!) to anyone playing the game with the volume up at an inappropriate time.

This is a JWT (JSON Web Token) tampering vulnerability.

You must edit the leaderboard, but when attempting to edit it using the button (or by editing the outgoing request), it will return an *unauthorised* message.

There is *auth_token* cookie available for viewing in the developer console which is a JWT with a *rank* parameter. This must be changed to *admin* to have the necessary authentication.

### Playing the game to achieve leader-board score
Impossible. My deepest apologies.
The difficulty scales too quickly and there's a cooldown for projectile launching.

### Cracking the JWT
It is possible to read the content of the header and payload of the JWT (for more information about JWTs, have a look at https://jwt.io/introduction).

To create an authorised JWT, you will need a valid signature - a hash of both the header and payload content, however, this will require the key used to sign the original JWT.

1. Copy the entire content of the JWT (*eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyYW5rIjoiY2xpZW50In0.UhhF7PAFjSVcqrkEaywF9BkR2RJRvvc4v39nUEm2Wic*) to a file.
2. Using hashcat, or a similar too such as John, run a wordlist attack against the JWT:
```
hashcat -a 0 -m 16500 jwt.txt /usr/share/wordlists/rockyou.txt

# -a 0: wordlist attack
# -m 16500: a JWT is the target
```
3. This should (if not, double check the JWT is identical and you've copied the entire token) successfully crack the key, with any decent wordlist, which you can then use to sign the JWT.
4. Edit the JWT (I use https://jwt.io, but other methods are available) to edit the *rank* to *admin* and sign the token with the cracked key.
5. Paste the new JWT into the *auth_token* cookie value and attempt to edit the leaderboard either using the button or by request editing.



## LinkedIn LARPing

### Introduction
An OSINT challenge involving collecting the information for several security questions from innocuous social media posts and a touch of social engineering! However, it is (although not viable in the time given) also possible to bruteforce the password for the website.

The given website has an *about-us* page, which identifies four members of staff. Using any search engine, only one tends to have hits: Maxwell Mitchell.

It should be possible to discover three different social media accounts for Maxwell, either through searching or by finding his Facebook and then viewing the linked accounts. All accounts contain arbitrary, irrelevant posts that contain no useful information and hidden among them: at least one relevant piece of data.

```
Facebook: https://www.facebook.com/profile.php?id=61564581215016
LinkedIn: https://www.linkedin.com/in/max-mitch/
X: https://x.com/MaxMitch68

# annoyingly, both LinkedIn and X require you to have an account to view the content 👎
```

### Solving the Security Questions
#### What is your mother's maiden name?
The answer to this is on the Facebook account, where Maxwell wishes his mother a happy birthday but includes her full name. In this, he uses the word "née" which is French for "born" - a way of specifying maiden names.

#### What high school did you attend?
This information is available on Facebook, in the life information panel when loading the page, or on the LinkedIn, in the education history. The website accepts either just the name or the name followed by "high school".

#### What is the name of your favourite pet?
This is available through X (formerly Twitter). Maxwell gets into an argument about age and memory with a random account and ends up posting both a photo and a retelling of his favourite memory with his pet dragon (?!)

#### What was your childhood best friend's nickname?
This information is available on LinkedIn, where Maxwell recounts fond memories of playing with his best friend "before computers were invented", and the importance of friends and people who can support you.

#### One-time Passcode
This is the tricky one! It says in one of the LinkedIn posts that Maxwell would only give away his MFA token to Barry Langton, his head of IT support, and only if he contacted him directly and could verify his identity.
The aim of this section was to contact Maxwell, either through Facebook Messenger, LinkedIn, or X and impersonate Barry to get Maxwell to give up his MFA token. This required stating who you were, fabricating a realistic context, and providing a fake id for Barry.

#### Logging In
You must then log in with all the information and the email given for Maxwell Mitchell on the website to receive the flag.
