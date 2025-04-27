import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom to create the movie links
import MovieCard from "../components/MovieCard"; // Import the MovieCard component for displaying individual movies
import NavBar from "../components/NavBar";

function Home() {
  const [movies, setMovies] = useState([]); // State to hold the list of movies
  const [loading, setLoading] = useState(true); // State to track if movies are still loading

  // Fetch movie data when the component mounts
  useEffect(() => {
    // Replace with your actual API or data source
    fetch("http://localhost:4000/movies")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          console.error("Expected an array of movies, but got:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []); // Empty dependency array means it only runs once when the component mounts

  return (
    <>
      <header>
        <h1>Home Page</h1> {/* Page title */}
        <NavBar />
      </header>

      <main>
        {loading ? (
          <p>Loading movies...</p> // Display loading text while fetching movies
        ) : (
            <div className="movie-list">
              {/* Render the list of movies using MovieCard */}
              {movies
                .filter((movie) => movie && movie.title) // Ensure movie has a title
                .map((movie) => (
                  <div key={movie.id} className="movie-card">
                    <h2>{movie.title}</h2> {/* Movie title in an <h2 /> */}
                    {/* Link to the movie details page */}
                    <Link to={`/movie/${movie.id}`}>View Info</Link>
                  </div>
                ))}
            </div>
        )}
      </main>
    </>
  );
}

export default Home;
