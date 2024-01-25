# Random Me User Directory
This project uses the [Random User API](https://random.me) to build a people directory where the user can browse the list of user and get additional details on another page when the user is clicked.

For added flexibility, it is built with NextJS running inside an Express server. This allows us to take advantage of rending the React components on the server (SSR) while still allowing usto write our own custom route handlers to extend its functionality.

## Versioning

This Node.JS application has been tested to run on:

#### `Node v20.11.0 LTS` 

#### `NPM v10.2.4`

## Running & Installation

This project has been tested agains Node  20.11.0 LTS and is therefore the recommended version. 

Type the following commands at the terminal to check the version of Node installed on your system, as the project may not run properly with versions other than the one recommended.

Using a terminal type the following commands at the prompt to check your running version.

`node -v` - (should return `v20.11.0`)

`npm -v` - (should return `10.2.4`)

nvm (Node Version Manager) is recommended to manage the version of `Node` on your machine.

You can download NVM for your operating system at:
[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).

Once installed, you can easily manage and install new versions.
A benefit is that it automatically pairs the compatible version of NPM to be used with Node.

```console
$ nvm ls available
(shows a list of all available versions)
$ nvm ls
(shows versions available on your system)
$ nvm install 20.11.0
(installs 20.11.0 to your system)
$ nvm use 20.11.0
Now using node v20.11.0 (npm v10.2.4)
$ node -v
v16.20.2
```
### Evironment Variables

The application relies on the following variables to be set in an `.env` file in the root of the project:

`NEXT_PUBLIC_API_URL`=https://randomuser.me/api
`NEXT_PUBLIC_RANDOM_SEED`=<SEED_VALUE>

The seed can any string,and is used by the api to provide consistent results, which is necessary for the correct functioning of the app.

### Running & Installation

#### `npm install`

To install all the project dependencies

### Launching the Server

Once all the dependencies have been successfully downloaded, type:

#### `npm run start`

The project will run on localhost:3000

## Thank You!

Thank you for reviewing my submission! I had a lot of fun putting this together!
