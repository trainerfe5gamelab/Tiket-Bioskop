import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Image } from "react-bootstrap";
import useIsAdmin from "../../../services/isAdmin";
import { imageBest } from "../../../utils/utils";

const EditMovie = () => {
  const [nameFilm, setNameFilm] = useState("");
  const [pictureMovie, setPictureMovie] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [durasi, setDurasi] = useState("");
  const [sutradara, setSutradara] = useState("");
  const [rateAge, setRateAge] = useState("");
  const [broadcastDate, setBroadcastDate] = useState("");
  const [endOfShow, setEndOfShow] = useState("");
  const [archived, setArchived] = useState(false);
  const [idGenre, setIdGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useIsAdmin();

  useEffect(() => {
    getMovieById();
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/genre");
      setGenres(response.data.gendre); // assuming correct response structure
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movie/${id}`);
      const movie = response.data.movies.movie;
      setNameFilm(movie.name_film);
      setPicturePreview(imageBest(movie.picture)); // Display the old picture
      setTrailer(movie.trailer);
      setDeskripsi(movie.deskripsi);
      setDurasi(movie.durasi);
      setSutradara(movie.sutradara);
      setRateAge(movie.rate_age);
      setBroadcastDate(formatDate(movie.broadcast_date));
      setEndOfShow(formatDate(movie.end_of_show));
      setIdGenre(movie.id_genre);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPictureMovie(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result); // Set the new picture preview
      };
      reader.readAsDataURL(file);
    }
  };

  const updateMovie = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_film", nameFilm);
    if (pictureMovie) {
      formData.append("picture", pictureMovie);
    }
    formData.append("trailer", trailer);
    formData.append("deskripsi", deskripsi);
    formData.append("durasi", durasi);
    formData.append("sutradara", sutradara);
    formData.append("rate_age", rateAge);
    formData.append("broadcast_date", broadcastDate);
    formData.append("end_of_show", endOfShow);
    formData.append("id_genre", idGenre);
    formData.append("picture_lama", picturePreview); // Send the old picture URL as reference

    const token = localStorage.getItem("token"); // Get token from local storage

    try {
      await axios.patch(
        `http://localhost:5000/api/movie/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard/movie");
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        console.log(error.response.data); // Log the error response data
        console.log(error.response.status); // Log the error status code
        // Display error message to the user
        alert(`Error: ${error.response.data.pesan}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        alert("Error: No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error", error.message);
        alert("Error: Failed to send request");
      }
    }
  };

  const closeForm = () => {
    navigate("/dashboard/movie"); // Navigate to movies dashboard when close icon is clicked
  };

  return (
    <div className="d-flex justify-content-center mt-5 text-dark">
      <Card style={{ width: "100%" }}>
        <Card.Header>
          <Card.Title>Edit Movie</Card.Title>
          <Button
            variant="secondary"
            onClick={closeForm}
            style={{ float: "right" }}>
            Close
          </Button>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={updateMovie}>
            <Form.Group className="mb-3" controlId="nameFilm">
              <Form.Label>Name Film</Form.Label>
              <Form.Control
                type="text"
                value={nameFilm}
                onChange={(e) => setNameFilm(e.target.value)}
                placeholder="Enter name of the film"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="pictureMovie">
              <Form.Label>Picture Movie</Form.Label>
              <Form.Control type="file" onChange={handlePictureChange} />
              {picturePreview && (
                <Image
                  src={picturePreview}
                  alt="Picture Preview"
                  thumbnail
                  className="mt-3"
                  style={{ width: "200px" }}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="trailer">
              <Form.Label>Trailer</Form.Label>
              <Form.Control
                type="text"
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
                placeholder="Enter URL of the movie trailer"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="deskripsi">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Enter description of the film"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="durasi">
              <Form.Label>Durasi</Form.Label>
              <Form.Control
                type="text"
                value={durasi}
                onChange={(e) => setDurasi(e.target.value)}
                placeholder="Enter duration of the film"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="sutradara">
              <Form.Label>Sutradara</Form.Label>
              <Form.Control
                type="text"
                value={sutradara}
                onChange={(e) => setSutradara(e.target.value)}
                placeholder="Enter director of the film"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="rateAge">
              <Form.Label>Rate Age</Form.Label>
              <Form.Control
                type="text"
                value={rateAge}
                onChange={(e) => setRateAge(e.target.value)}
                placeholder="Enter rate age of the film"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="broadcastDate">
              <Form.Label>Broadcast Date</Form.Label>
              <Form.Control
                type="date"
                value={broadcastDate}
                onChange={(e) => setBroadcastDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endOfShow">
              <Form.Label>End of Show</Form.Label>
              <Form.Control
                type="date"
                value={endOfShow}
                onChange={(e) => setEndOfShow(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="idGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                value={idGenre}
                onChange={(e) => setIdGenre(e.target.value)}>
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id_genre} value={genre.id_genre}>
                    {genre.name_genre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditMovie;
