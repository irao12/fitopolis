
Summary: Integration of Stripe (Express.js)
The server folder is completely independent of the other folders as of now.
https://www.youtube.com/watch?v=1r-F3FIONl8&ab_channel=WebDevSimplified

create server folder
npm init -y
npm i express stripe dotenv
npm i --save-dev nodemon

----

//server will run on port 3001
in order to link to client which is on port 3000, refer to timestamp 19:05 in the youtube video above.

//starts server
npm run devStart

note that the test key in .env is NOT to be shared and should be included in .gitignore


----

The script.js uses server.js to open stripe.
 When stripe transaction successful, opens success.html