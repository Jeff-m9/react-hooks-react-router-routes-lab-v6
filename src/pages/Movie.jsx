import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function Movie() {
  const { id } = useParams(); // Get the movie id from the URL
  const [movie, setMovie] = useState(null); // State to store movie data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch movie data when the component mounts or when the id changes
  useEffect(() => {
    // Replace with your actual API or data source
    fetch(`http://localhost:4000/movies/${id}`) // Example API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Movie not found"); // If response is not ok, throw an error
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data); // Set the fetched movie data to state
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        setError(error.message); // Set error state with the error message
        setLoading(false); // Stop loading even if there's an error
      });
  }, [id]); // Re-fetch whenever the movie id changes

  // Display loading state while data is being fetched
  if (loading) {
    return <div>Loading movie details...</div>;
  }

  // If there was an error, display an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If movie data is available, render the movie details
  if (!movie) {
    return <div>Movie not found</div>; // Graceful handling if movie data is null
  }

  // If movie data is available, render the movie details
  return (
    <>
      <NavBar />
      <header>
        <h1>{movie.title}</h1> {/* Display the movie title */}
      </header>
      <main>
        <p>
          <strong>Time:</strong> {movie.time}
        </p>{" "}
        {/* Display movie time */}
        <div>
          <strong>Genres: </strong>
          {movie.genres.length > 0 ? (
            movie.genres.map((genre, index) => (
              <span key={index} className="genre">
                {genre}
              </span> // Display each genre in a <span>
            ))
          ) : (
            <span>No genres available</span> // Fallback if no genres are found
          )}
        </div>
      </main>
    </>
  );
}

export default Movie;
