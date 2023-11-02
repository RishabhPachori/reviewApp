import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useHistory, useParams } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>

        <Switch>
          <Route exact path="/new">
            <NewReview />
          </Route>
          <Route exact path="/:id">
            <EditReview />
          </Route>
          <Route exact path="/">
            <ReviewsList />
          </Route>
        </Switch>
    </Router>
  );
}

function ReviewsList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the API when the component mounts
    // You need to implement this API call
    fetch('http://localhost:8080/reviews')
      .then((response) => response.json())
      .then((data) => setReviews(data.data));
  }, []);

  return (
    <div>
      <h2>Reviews List View</h2>
      <button>
        <Link to="/new">Create New Review</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Date-time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review._id}>
              <td>{index + 1}</td>
              <td>{review.title}</td>
              <td>{review.content}</td>
              <td>{review.createdAt}</td>
              <td>
                <Link to={`/${review._id}`}>Edit</Link>
              </td>
              <td>
                <button onClick={() => deleteReview(review._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function deleteReview(id) {
    // Implement the API call to delete a review by ID
    fetch(`http://localhost:8080/reviews/delete/${id}`, { method: 'DELETE' })
    .then(() => {
      // After successful deletion, update the state to remove the deleted review
      setReviews(reviews.filter(review => review.id !== id));
    })
    .catch(error => {
      // Handle any error that might occur during the deletion
      console.error('Error deleting review:', error);
    });
  }
}



function NewReview() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  const saveReview = () => {
    // Implement the API call to create a new review
    fetch('http://localhost:8080/reviews/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then(() => {
        history.push('/');
      });
  };

  return (
    <div>
      <h2>New Review</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={saveReview}>Save</button>
      <button onClick={() => history.push('/')}>Cancel</button>
      <button onClick={() => {setTitle(''); setContent('');}}>Reset</button>
    </div>
  );
}

function EditReview() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch the review details from the API based on the ID
    fetch(`http://localhost:8080/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.data.title);
        setContent(data.data.content);
      });
  }, [id]);

  const deleteReview = () => {
    // Implement the API call to delete the review by ID
    fetch(`http://localhost:8080/reviews/delete/${id}`, { method: 'DELETE' })
      .then(() => {
        history.push('/');
      });
  };

  const saveReview = () => {
    // Implement the API call to update the review
    fetch('http://localhost:8080/reviews/edit', {
      method: 'PUT', // Use the appropriate HTTP method for updating
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, updateObject: { title, content } }),
    })
      .then(() => {
        history.push('/');
      });
  };

  return (
    <div>
      <h2>Edit Review</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={saveReview}>Save</button>
      <button onClick={() => history.push('/')}>Cancel</button>
      <button onClick={deleteReview}>Delete</button>
    </div>
  );
}

export default App;
