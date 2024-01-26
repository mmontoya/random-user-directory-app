# Random Me User Directory
This project uses the [Random User API](https://random.me) to build a people directory. The user is able to browse a list of people. When an item in the list is clicked, the user is taken to a details page where he can view addtional details.

# SSR (Server Side Rendering)
This appliction uses Server Side Rendering to serve React page that are pre-rendered on the server.

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

`NEXT_BASE_URL`=<THE_SERVER_URL> (typically http://localhost:3000)

### Running & Installation

#### `npm install`

To install the project dependencies

Once all the dependencies have been successfully downloaded, type:

#### `npm run dev` - for live coding using HMR (Hot Module Replacement)

Alternatively, to build the application bundle:

#### `npm run build`

Then

#### `npm run start`

The project will run on localhost:3000

## Bonus

### Offline Mode
I implemented an offline browsing mode by serving a cached version of the live query that I have saved in a JSON file. To make it obvious that we are working in an "offline" context, I included a generic image instead of the one that is associated with the online version. Please note that in order to test this feature, you will need to be running the app in a local environment. You will then be able to verify that it continues to serve data by disabling your internet connection and _refreshing_ the page.

## Thank You!

Thank you for reviewing my submission! I had a lot of fun putting this together!
