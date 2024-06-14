import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Image } from "react-bootstrap";
import useIsAdmin from "../../../services/isAdmin";

const AddMovie = () => {
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
  const [idGenre, setIdGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  useIsAdmin();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/genre");
        setGenres(response.data.gendre);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenres();
  }, []);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPictureMovie(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPicturePreview(null);
    }
  };

  const saveMovie = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_film", nameFilm);
    formData.append("picture", pictureMovie);
    formData.append("trailer", trailer);
    formData.append("deskripsi", deskripsi);
    formData.append("durasi", durasi);
    formData.append("sutradara", sutradara);
    formData.append("rate_age", rateAge);
    formData.append("broadcast_date", broadcastDate);
    formData.append("end_of_show", endOfShow);
    formData.append("id_genre", idGenre);

    try {
      await axios.post("http://localhost:5000/api/movie/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard/movie");
    } catch (error) {
      console.log(error);
    }
  };

  const closeForm = () => {
    navigate("/dashboard/movie"); // Navigate to home or other route when close icon is clicked
  };

  return (
    <div className="d-flex justify-content-center mt-5 text-dark">
      <Card style={{ width: "100%" }}>
        <Card.Header>
          <Card.Title>Add Movie</Card.Title>
          <Button
            variant="secondary"
            onClick={closeForm}
            style={{ float: "right" }}>
            Close
          </Button>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={saveMovie}>
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
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddMovie;
