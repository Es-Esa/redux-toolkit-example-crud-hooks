//lisäsin AddComments.js jotta voisin lisätä kommentteja tutorialeihin. Tämä on siis uusi komponentti, joka on luotu kommenttien lisäämistä varten.
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../slices/comments";

// tätä funkkaria käytetään kommenttien lisäämiseen tutorialeihin, se ottaa vastaan tutorialId:n ja luo uuden kommentin tutoriaaliin.
const AddComment = ({ tutorialId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  // tämä on handleSubmit funktio, joka käsittelee lomakkeen lähetyksen ja lähettää kommentin palvelimelle.
  // myös tyhjentää lomakkeen kun kommentti on lähetetty.
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ tutorialId, text: comment }));
    setComment("");
  };

  // palauttaa lomakkeen, jossa on input-kenttä ja submit-nappi.
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddComment;
