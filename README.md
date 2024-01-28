# Random Me User Directory
This project uses the [Random User API](https://random.me) to build a directory of random people. When a person in the list is clicked, the user is taken to a page where he or she can view addtional details about the selected person.

# SSR (Server Side Rendering)
This appliction uses Server Side Rendering (SSR) to serve a page that is pre-rendered on the server. This provides alternative benefits to one typically rendered on the client, including faster initial page load and improved SEO.

## Versioning

This Node.JS application has been tested to run on:

#### `Node v20.11.0 LTS` 

#### `NPM v10.2.4`

## Running & Installation

 Type the following commands at the terminal to check the version of Node installed on your system as the project may not run properly with versions other than the one recommended.

Using a terminal type the following commands at the prompt to check your running version.

`node -v` - (should return `v20.11.0`)

`npm -v` - (should return `10.2.4`)

NVM (Node Version Manager) is recommended to manage the version of `Node` on your system.

You can download NVM for your operating system at:
[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).

Once installed, you can easily manage and install new versions of Node. An added benefit is that it automatically pairs it with the latest compatible version of NPM.

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

`API_URL`=https://randomuser.me/api

`RANDOM_SEED`=<SEED_VALUE>

The seed can any string with alpha values and is used by the api to provide consistent result necessary for the correct functioning of the app. Modifying this value will initialize the app with a different set of users.

`NEXT_PUBLIC_BASE_URL`=<THE_SERVER_URL> (typically http://localhost:3000)

`NEXT_PUBLIC_USER_RECORDS_TOTAL`=<INTEGER> 
The total number of users to fetch from the Random.me API.

`NEXT_PUBLIC_PAGINATION_BUTTONS_DISPLAY`=<INTEGER>
This is for the Pagination UI. It sets how many buttons to display. I have found `5` to be optimal in testing for the given UI.

`NEXT_PUBLIC_PAGE_SIZE`=<INTEGER>
The number of user records that should be included in each page. The instructions specify `10`, so this is the defautl, but this can be set to any custom size. (Any 0 or negative value will be reset to `10`)

#### Dev Note: 

Remember that you must restart the server any time you change an environment value for the changes to take effect.

### Running & Installation

Type:

#### `npm install`

In a terminal inside the project directory to install its dependencies.

Once all the dependencies have been successfully downloaded to `node_modules` type:

#### `npm run dev`

This will launch an instance of the server on port `3000`. In this mode, any changes to the code will updated in real time via HMR (Hot Module Replacement)

Alternatively, to build the application bundle for production:

#### `npm run build`

Then

#### `npm run start`

The project will run on localhost:3000 but with the precompiled bundles for release.

## Bonus Features

### Offline Mode
I implemented an offline browsing mode by serving a cached version of the users that I have saved in a JSON file. To make it obvious that we are working in an `offline` context, I included a generic image of the profile pixture instead of the one that is associated with the online version. Please note that in order to test this feature, you will need to be running the app locally so that you can disable access to the internet. You will then be able verify that it continues to serve data when you _refresh_ the page.

### Internationalization (i18n)

I implemented internationalization capabilites, adding support for Spanish. To see it in action, simply append the locale for Spanish ("es") to the end of the URL (before any parameters). The title on the Header bar as well as the "back" button, should be translated to Spanish.

### Pagination

I have added pagination support that can accomodate an arbitrary size of total user records. Simply change the `.env` value for `NEXT_PUBLIC_USER_RECORDS_TOTAL` to the desired size in combination with `NEXT_PUBLIC_PAGE_SIZE` (the number of users per page). The paginator will dynamically adjust to these values.

## Thank You!

Thank you for taking the time to review my submission! I had a lot of fun putting this together. It was a thoroughly enjoyable challenge with many creative possibilities for enhacements. For example, I would love to attempt to put together an experimental UI that features a vintage Rolodex as the UI (see image below). The user would then be able to use the scroll wheel to flip through the cards. While perhaps not as efficient as the featured UI, it would have novelty appeal that could be fun an tactile with a whimsical nod at the real world technology is has replaced.

<img src="./assets/images/rolodex2.jpg" width="400" style= "border-radius: 20px; border: 40px solid white" >


