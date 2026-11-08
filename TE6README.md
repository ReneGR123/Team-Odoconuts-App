How to run/check for TE6.

Running:
In packages/Frontend and packages/Backend run:
npm i

Open a terminal and cd into ../packages/Backend and run:
npm start

Open a new terminal and cd into ../packages/Frontend and run:
npm run dev

You should be all set
To whomever this concerns/grades, you (may?) need an env file to run this. If this is the case, let any odoconut member know and we will provide it to you 

Requirement 1: On the FE, handle the token received in the response by storing it on the client-side

Look at packages/Frontend/src/services/authService.js &&
packages/Frontend/src/services/authContexts.js 

Note the logIn function in authService.js. It sends a requests to the backend to verify the user has the right credentials, and if so, the backend will return with a token and the session set for the Frontend. We use Supabase thats where the token comes from. 
Note in authContexts.js, this is used to see what state the user is in in the Frontend.

Requirement 2: Implement token passing from FE to BE in HTTP calls to endpoints that require authentication.

Look at packages/Frontend/src/services/api.js &&
packages/Frontend/src/services/questService.js	
Note that in api.js, the api request will send (optionally) send the token if the user has one. 
Also Note that in questService.js, the api call goes through api.js which goes to the backend

Requirement 3: BE handles successful requests and failure requests due to unauthorized users.

Look at packages/Backend/src/middleware/requireAuth.js &&
packages/Backend/src/routes/quests.js

Note that in requireAuth.js is a function that checks if the user has a token that matches supabases. If the tokens don't match or no token exists, it prevents the https requests from completings it goal. This function is only used for actions that we require the user to be logged in for (Only signed in users can create quests, but anyone can view quests)

Note that in packages/Backend/src/routes/quests.js, lines 23 - 59 (the POST for creating a quests), you'll see that one of the params is the requireAuth function. Since we want users to be signed in to create a quest, we check that thier signed in first, if so, the function proceeds, if not, then no quests is created

Requirement 4: Implement also a sign-in endpoint to make your BE authenticate an existing user based on a hashed pwd, followed by token generation.

Look at packages/Frontend/src/services/authService.js &&
packages/Backend/src/routes/auth.js

Note in the Frontend, the logIn function sends a POST to the backend with the email and password, allowing the backend to verify it
Note in the Backend, the auth function checks the password and email with supabase, and if they don't match then no log in session is set for the user. Supabase does the hashing for us which is neat.

