Day 2
Today we will leak this information to the world! You will introduce yourself to web servers and RESTful API's by building a server that serves all the data you collected yesterday.
Core Tasks
Using Node's http module create a web server that responds with 'hello' when it receives a GET request on the path /api
Add a GET /api/northcoders endpoint that serves a JSON object of all the northcoders which shows their name, job details, image and username.
Add a GET /api/northcoders/:username parametric endpoint which serves the above information for one northcoder.
Add a GET /api/pets/:username parametric endpoint which serves a northcoders pets.
Add a GET /api/interests/:username parametric endpoint which serves a northcoders interests.
Add some error handling to your server. What should it respond with if you recieve a request for a username that doesn't exist? What status code should you respond with?

Advanced Tasks
Add a query paramter to your GET /api/northcoders endpoint that searches for northcoders with a specific job. e.g. all the block-leads or all the marketing team. How should the endpoint respond by default(i.e. when not provided the query parameter?) How should it behave when provided an invalid parameter? What status code should your server respond with?

    Add a GET /api/pets endpoint which accepts a query that serves all northcoders who have a living or dead pet
    Add a query parameter to your GET /api/pets endpoint that serves all northcoders who have a certain kind of pet (e.g. cat, alpaca, llama etc)
    ",

"instructions": "Hello again, Detecive. Save crypticString to a file to decrypt your tasks."
