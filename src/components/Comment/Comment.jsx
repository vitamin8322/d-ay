import React, { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { DishDataContext } from "../../App";
import "./Comment.css";
import { useParams } from "react-router-dom";
import StarRating from "../StarRating/StarRating";

function Comment() {
  const { id } = useParams();
  const { data, setData, setCurrentId } = useContext(DishDataContext);

  const [commentText, setCommentText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [editingCommentIndex, setEditingCommentIndex] = useState(-1);

  const handleCommentChange = useCallback((event) => {
    setCommentText(event.target.value);
  }, []);

  const handleImageChange = useCallback((event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const newComment = image
        ? {
            ...data[id],
            comment: [
              ...data[id].comment,
              { text: commentText, image: URL.createObjectURL(image) },
            ],
          }
        : {
            ...data[id],
            comment: [...data[id].comment, { text: commentText, image: "" }],
          };
      if (editingCommentIndex > -1) {
        const newCommentEdit = {
          ...data[id],
        };
        newCommentEdit.comment[editingCommentIndex] = {
          ...newCommentEdit.comment[editingCommentIndex],
          text: commentText,
        };
        if (image) {
          newCommentEdit.comment[editingCommentIndex].image =
            URL.createObjectURL(image);
        } else if (newCommentEdit.comment[editingCommentIndex].image) {
          newCommentEdit.comment[editingCommentIndex].image = "";
        }
        const newData = [...data];
        newData[id] = newCommentEdit;
        setData(newData);
        setEditingCommentIndex(-1);
      } else {
        const newData = [...data];
        newData[id] = newComment;
        setData(newData);
      }
      setCommentText("");
      setImagePreview(null);
      setImage(null);
    },
    [commentText, data, editingCommentIndex, id, image, setData]
  );

  const handleEdit = useCallback(
    (index) => {
      setEditingCommentIndex(index);
      const commentToEdit = data[id].comment[index];
      setCommentText(commentToEdit.text);
      setImagePreview(commentToEdit.image);
    },
    [data, id]
  );

  const handleCancel = useCallback(() => {
    setEditingCommentIndex(-1);
    setCommentText("");
    setImagePreview(null);
    setImage(null);
  }, []);

  const handleDelete = useCallback(
    (index) => {
      const newComments1 = data[id].comment;
      newComments1.splice(index, 1);
      const newComment = {
        ...data[id],
        comment: newComments1,
      };
      const newData = [...data];
      newData[id] = newComment;
      setData(newData);
    },
    [data, id, setData]
  );
  const comments = useMemo(() => data[id]?.comment, [data, id]);
  return (
    <div>
      <StarRating />
      <div>
        <form className="comment-form" onSubmit={handleSubmit}>
          <label htmlFor="comment-text">Comment:</label>
          <textarea
            type="text"
            id="comment-text"
            value={commentText}
            onChange={handleCommentChange}
          ></textarea>
          <label htmlFor="image-upload">Image:</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && <img src={imagePreview} alt="Selected Image" />}
          <div className="btn-group">
            <button type="submit">
              {editingCommentIndex > -1 ? "Save" : "Submit"}
            </button>
            {editingCommentIndex > -1 && (
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {comments &&
          comments.map((comment, index) => (
            <div key={index}>
              <p>{comment.text}</p>
              {comment.image !== "" && (
                <img src={comment.image} alt="comment" />
              )}
              <button type="button" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comment;
