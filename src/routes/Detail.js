import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState("");
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h2>Movie Title: '{detail.title}'</h2>
          <h2>Movie Year: {detail.year}.</h2>
          <h2>Movie Rating: ★ {detail.rating}</h2>
          <h2>Movie runtime: {detail.runtime} minutes</h2>
        </div>
      )}
    </div>
  );
}

export default Detail;
