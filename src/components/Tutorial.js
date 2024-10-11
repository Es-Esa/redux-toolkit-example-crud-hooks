import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateTutorial, deleteTutorial } from "../slices/tutorials";
import { createComment, retrieveComments } from "../slices/comments"; 
import TutorialDataService from "../services/TutorialService";

const Tutorial = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  const [newComment, setNewComment] = useState(""); // tämä on uusi tila kommentille joka lisätään tutoriaaliin

  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments || []); 
  console.log("Current comment in component:", comments); // Testataan tuleeko kommentit stateen


  // useEffect hook joka hakee tutoriaalin ja kommentit kun sivu latautuu
  useEffect(() => {
    const getTutorial = id => {
      TutorialDataService.get(id)
        .then(response => {
          setCurrentTutorial(response.data);
          console.log(" ID tutoriaaliin:", id); // debugausta
          dispatch(retrieveComments(id)); // hakee kommentit tutoriaalille kun tutoriaali on haettu
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    if (id) {
      getTutorial(id);
    }
  }, [id, dispatch]);
  

  // käsittelee input-kenttien muutokset ja päivittää currentTutorial tilan
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  // käsittelee kommentin input-kentän muutokset ja päivittää newComment tilan
  const handleCommentChange = event => {
    setNewComment(event.target.value); // päivittää newComment tilan input-kentän arvolla
  };

  // lisää kommentin tutoriaaliin kun painetaan Add Comment-nappia
  const addComment = () => {
    if (newComment.trim()) { // tarvitaa onko kommentti tyhjä, jos ei niin lisätään kommentti
      dispatch(createComment({ tutorialId: currentTutorial.id, text: newComment }))
        .unwrap()
        .then(() => {
          setNewComment(""); // tyhjentää input-kentän
          setMessage("Comment added successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const updateStatus = status => {
    const data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    dispatch(updateTutorial({ id: currentTutorial.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateTutorial({ id: currentTutorial.id, data: currentTutorial }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeTutorial = () => {
    dispatch(deleteTutorial({ id: currentTutorial.id }))
      .unwrap()
      .then(() => {
        navigate("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>

          <h4>Comments</h4>
          <ul>
            {comments.length > 0 ? (
              comments.map(comment => (
                <li key={comment.id}>{comment.text}</li>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </ul>

          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          />
          <button onClick={addComment} className="badge badge-success">
            Add Comment
          </button>

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
