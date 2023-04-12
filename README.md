## This project is part of the course IT2810 at NTNU

# 🇳🇴KommuneAdvisor with Vue 3

KommuneAdvisor is a web application that lets you find information about and review the Norwegian municipalities, also known as kommuner. A user can search for a given kommune and filter kommuner on county. Kommuner can also be sorted by area, population and ratings, both ascending and descending. From the search results, the user can click on a kommune to view a details page with more information and ratings about this kommune.

In this project we have refactored the client of [project 3](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-22/project-3) by changing the JavaScript framework from React to Vue 3. The components are created with the [Vue Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#why-composition-api). The primary advantage of Composition API is that it enables clean, efficient logic reuse in the form of [Composable functions](https://vuejs.org/guide/reusability/composables.html). In order to achieve a UI similar to the previous website, we have used the component library [Naive UI](https://www.naiveui.com/en-US/os-theme). 

## 💻Project setup

### Frontend

In the project directory, you can run:

- `cd frontend` to navigate to the frontend directory
- `npm install` to install dependencies 
- `npm run dev` to run the project in development mode
- `npm run build` to build the app for production to the `build` folder
- `npx run lint` to run prettier and eslint checks

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Backend

In order to access the database, you must be connected to [NTNU VPN](https://i.ntnu.no/wiki/-/wiki/Norsk/Installere+VPN). 

In the project directory, you can run:

- `cd backend` to navigate to the backend directory
- `npm install` to install dependencies
- `npm run dev` to run server using nodemon, automatically restarting server on file changes
- `npx run lint` to run prettier and eslint checks

The backend runs on [http://localhost:8000](http://localhost:8000).


## 🌍Global state management

The main purpose of global state is to share a state among multiple components in order to avoid prop drilling. In this application we have implemented global state management using [Pinia](https://pinia.vuejs.org) for the search field, dropdown menus and current page. A user can search for and filter kommuner, click on a kommune to view the details page, then go back to the search results and see that the values for search field, filter and page have persisted. We have chosen Pinia as a store because it is intuitive, simple, very light and has built-in TypeScript support. It has also been been recognized as the official state management solution for Vue apps, and is therefore included when initializing a new Vue 3 project. 


## 🔎Search

With the search field, the user can search for a kommune. Suggested kommuner based on the user inputs will be displayed on the main page.
When the user types, the input is sent to the backend which returns kommuner that match the input. The kommuner that match the input are then displayed, sorted after whatever sorting the user has applied (alphabetically if no sorting is applied). The search is also compatible with filtering on counties, which means that when the user filters on a county and enters a search term, the kommuner that match the search term and are in the selected county will be displayed.

### Sorting and filtering

The user has the option sort kommuner by area, population and ratings, both ascending and descending. The user can also filter kommuner on county. If no sorting is applied, kommuner will be sorted alphabetically. The three last letters of the Norwegian alphabet are not sorted as most Norwegians are used to, as Å comes before Ø. This is because these letters are not used in the English alpahbet, and therefore not sorted correctly by default.

### Pagination

The kommune cards are paginated, displaying 24 kommuner at a time. We chose this number since it is divisible by both 4, 3 and 2, making it compatible with the grid. The query for fetching kommuner is paginated, such that one can specify the number of elements per page and get the current page. This is implemented frontend by storing the current page in a global state, and setting the current page to 1 when the user updates the input fields.

### Detail view

From the search results, a user can click into the details page of a kommune. This does a new query to fetch information about the given kommune based on id. The id is also displayed in the url for the details page `/kommune/:id`.


## 💾Backend

The backend is buildt with Node Express.

### MongoDB

MongoDB is a document database. To implemenet mongoDB on the Express backend we have used [mongoose](https://mongoosejs.com/).
The database consists of three collections:
- county
- kommune
- kommuneRating

### GraphQL

To query data from the backend we have buildt a GraphQL interface. Here are the GraphQL endpoints:

#### kommuner

Endpoint to query all kommunes

**Parameters**

_sortBy_ - What to sort by (ex: name / population)

_sortDirection_ - Which way to sort the reults (ex: ascending / descending)

_search_ - Search for kommues (ex: Molde / Trondheim)

_county_ - Filter by county (ex: Møre og Romsdal / Viken)

**Fields**

_\_id_ - Unique identifier, this is set as the national kommune number

_name_ - Name of the kommune

_population_ - The kommunes Population

_areaInSquareKm_ - Size of the kommune in Km2.

_landAreaInSquareKm_ - Size of the kommune in squareKm, excluding water.

_populationByArea_ - Average population pr squareKm

_mapUrl_ - Link to the map image

_snlLink_ - Link to the SNL page

_logoUrl_ - Link to the logo image

_writtenLanguage_ - What written language the kommune uses

_averageRating_ - The average of all kommuneRatings for the kommune

_county_ - The county the kommune belongs to

_kommuneRating_ - All the KommuneRatings for that kommune

#### kommunerCount

Endpoint to query count of all kommuner

**Parameters**

_search_ - Search for kommues (ex: Molde / Trondheim)

_county_ - Filter by county (ex: Møre og Romsdal / Viken)

**Fields**

_kommunerCount_ - Count of how many kommuner matched the filter.

#### county

Endpoint to query all countys

**Parameters**

No parameters

**Fields**

_\_id_ - Unique identifyer, this is set as the national county number

_name_ - Name of the county


## 📚Kommuner data

The kommune weapons and map images are scraped from [Wikipedia](https://no.wikipedia.org/wiki/Norges_kommuner). The numbers and statistics used in the application are gathered from [Statistisk Sentralbyrå (SSB)](https://www.ssb.no/kommunefakta). 

### Average rating

The average rating is calculated by taking the sum of all ratings and dividing it by the number of ratings. This is done in the backend, and the average rating is stored in the database. This is done to avoid having to calculate the average rating for each kommune every time the user visits the details page. The average rating is also updated when a new review is created.

### Timestamp

We have chosen to store the date as a timestamp in the backend. This way it is easy to convert to other date formats and time zones later.


## 🚀Git guidelines and code quality

We have used the formatting tool Prettier and linter ESLint to ensure a common coding style and good code quality.

All development tasks are documented in a issue with appropriate labels. After assigning yourself to an issue, the issue should be solved in its own branch. We have disabled pushing to main branch, such that the only way to add code is though merge requests. When merging with main branch, the commits should be squashed.

### Semantic Commit Messages

We have used a simple version of the [conventional commits guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

Format: `<type>: <subject>`

#### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)
