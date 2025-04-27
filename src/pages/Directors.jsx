import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Directors() {
  const [directors, setDirectors] = useState([]); // State to hold directors' data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  // Fetch directors data when the component mounts
  useEffect(() => {
    // Replace with your API endpoint
    fetch("http://localhost:4000/directors") // Example API endpoint
      .then((response) => response.json())
      .then((data) => {
        setDirectors(data); // Set fetched data to state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching directors data:", error);
        setError("Failed to load directors data.");
        setLoading(false); // Stop loading even if an error occurs
      });
  }, []); // Only run once when the component mounts

  // Loading message while data is being fetched
  if (loading) {
    return <div>Loading directors...</div>;
  }

  // Error message if data fetching failed
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NavBar />
      <header>
        {/* Ensure you render 'Directors Page' here */}
        <h1>Directors Page</h1> {/* This matches the test */}
      </header>
      <main>
        {directors.length === 0 ? (
          <p>No directors available.</p> // Message when no directors are found
        ) : (
          directors.map((director) => (
            <article key={director.id}>
              {/* Each director's data */}
              <h2>{director.name}</h2> {/* Director's name */}
              <ul>
                {/* Render list of movies */}
                {director.movies && director.movies.length > 0 ? (
                  director.movies.map((movie, index) => (
                    <li key={index}>{movie}</li>
                  ))
                ) : (
                  <p>No movies listed for this director.</p>
                )}
              </ul>
            </article>
          ))
        )}
      </main>
    </>
  );
}

export default Directors;
