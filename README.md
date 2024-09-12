# Movie Recommendation System

This is a simple **Movie Recommendation System** built with **Node.js** and **Express.js**. The application fetches movie data from The Movie Database (TMDb) API and provides movie recommendations based on user preferences.

## Features

- Search for movies by genre, keyword, or top-rated.
- Display movie details including title, release date, overview, rating, and poster image.
- Allow users to rate movies and get recommendations based on their preferences.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (version 14 or higher)
- NPM (Node Package Manager)
- Git

### TMDb API Key

You will need an API key from TMDb to access the movie data. Sign up for an API key at [TMDb API](https://www.themoviedb.org/documentation/api).

### Project Setup

1. **Clone the repository**

   Run the following commands in your terminal:

    ```bash
    git clone git@github.com:aidoni-ab/movie-recommender-js.git
    cd movie-recommender-js
    ```

2. **Configure the API key**

   Create a file named `.env` in the root directory of your project and add your TMDb API key:

    ```bash
    TMDB_API_KEY=YOUR_API_KEY_HERE
    ```

3. **Install dependencies**

   Run the following command to install the necessary packages:

    ```bash
    npm install
    ```

4. **Run the application**

   Start the **Node.js** application with **nodemon** (or **node**):

    ```bash
    npm run dev
    ```

   The application will start on `http://localhost:3000`.

### Endpoints

#### Search Movies

- **Endpoint:** `/movies/search`
- **Method:** GET
- **Parameters:** `query` (String) - The search query
- **Example:** <http://localhost:3000/movies/search?query=Inception>

#### Get Recommendations

- **Endpoint:** `/movies/recommendations`
- **Method:** GET
- **Description:** This endpoint will provide movie recommendations based on user ratings and preferences.

### Running Tests

To run the tests, use the following command:

   ```bash
   npm test
   ```

### Project Structure

```css
src/api
├── movie
│   └── movieController.js
│   └── movieService.js
│   └── movieRouter.js
│   └── movieModel.js
└── app.js
``````

### Future Enhancements

- Implement user authentication and authorization.
- Enhance the recommendation logic to provide more personalized recommendations.
- Add more endpoints for different types of searches (e.g., by genre, actor).
- Improve the user interface for a better user experience.

### Contributing

We welcome contributions to enhance the functionality and features of this project. If you have any suggestions or improvements, please create an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgements

- [TMDb API](https://www.themoviedb.org/documentation/api) for providing the movie data.
