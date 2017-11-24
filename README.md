# web-push-api-with-MEAN
Web Push API with angular and nodejs as server. with the help of GMC

steps to run the application.

1. move inside the angular web application folder to build and run it. 
# cd website/push-app
# npm i
# npm start
! Now it will serve web app on http://localhost:4200 (wait for step 2 to be completed to get expected results.)




2. Now leave that terminal open and using another one move to the /server directory. Now execute following steps inside this directory
# npm i
# npm start
! Now It will start your nodejs server on port 3000. Goto http://localhost:3000 for our server hosted web page. (this page simply send your requested text message to our server, just like postman)






This project has 3 components.
1. Web App which will be used to subscribe for push notifications.
2. A basic web page for you to ask our server to send push message on above Web App.
3. Our own nodejs web server to which will send push messages with the help of GMC.

Done!! start playing with it
