import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { reviewPost, getById } from "../services/api";
import { getUser } from "../services/auth";

const ReviewForm = ({ show, handleClose, addReview }) => {
  const { id } = useParams(); // ID film dari URL
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const [movie, setMovie] = useState(null);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await getById(id);
        setMovie(moviesData);
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }
    };

    getMovies();
  }, [id]);

  useEffect(() => {
    if (movie && user) {
      const countVotes = (votes, userId) => {
        return votes.filter((vote) => vote.id_user === userId).length;
      };
      setVoteCount(countVotes(movie.votes, user.userid));
    }
  }, [movie, user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const loggedInUser = getUser(token);
      setUser(loggedInUser);
    }
  }, []);

  useEffect(() => {
    if (voteCount > 1) {
      handleClose();
    }
  }, [voteCount, handleClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Silakan login untuk memberikan ulasan.");
      return;
    }
    const reviewData = {
      rating,
      comment: content,
      id_user: user.userid,
      id_movie: id,
    };
    console.log(reviewData);
    const response = await reviewPost(reviewData);
    if (response) {
      alert("Terimakasih sudah memberikan review");
      addReview(reviewData);
      handleClose();
      navigate(0); // Reload the current page
    } else {
      alert("Gagal menambahkan review. Silakan coba lagi.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="text-dark text-center">
      <Modal.Header closeButton>
        <Modal.Title>Tambah Ulasan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <div className="rating text-center fs-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${rating >= star ? "selected" : ""}`}
                  onClick={() => setRating(star)}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5em",
                    color: rating >= star ? "gold" : "gray",
                  }}>
                  ★
                </span>
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Ulasan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis ulasan Anda di sini"
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!user}>
            Tambah
          </Button>
          {!user && (
            <div className="text-danger mt-2">
              Silakan login untuk memberikan ulasan.
            </div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewForm;
