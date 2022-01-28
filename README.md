# **API to display marvel characters and its related comics**

### This application will be used to fetch data from the marvel api. It will take user input and return the given character and comics that the character is present in.

 <br>

# Getting Started

<br>

### You will first need to to get an API key from the [marvel developer site](https://developer.marvel.com/). Create an account there. Navigate to my developer account tab and you should see your public key (api key) and your private key.

<br>

# ENV file

<br>

### Create an env file in the root directory of the project

<br>

```
apiKey="Your API KEY"
privateKey="Your Private Key"
```

<br>

## Create a ignore file in root directory and add the following

```
node_modules/*
.env
```

# Install dependencies

```
npm install
```

# Run the application

```
# run server
npm run start

# run nodemon
npm run watch

(Go to localhost:3000)
```

<br>

## Overview of the application

<br>

# Empty State

<img src="img/empty%20state.png" width="600">

# Search for a character

<img src="img/character%20search.png" width="600">

# Comics for the character

<img src="img/comics.png" width="600">

# Character is not found

<img src="img/character%20not%20found.png" width="600">

<br>

## Learning takeaways

- How to set up a node js server
- Connecting the server to heroku
- Fetching data from client and sending response back
- Parsing json response and displaying it to user
