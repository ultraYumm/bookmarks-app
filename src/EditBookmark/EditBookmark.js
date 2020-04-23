import React, { Component } from  'react';
import { withRouter } from 'react-router-dom';
import BookmarksContext from '../BookmarksContext';
import './EditBookmark.css';

const Required = () => (
  <span className='EditBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static contextType = BookmarksContext;

  state = {
    bookmark: null,
    error: null,
  };

  
  handleClickCancel = () => {
       this.props.history.push('/')
     };

componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId
    fetch(`http://localhost:8000/api/bookmarks/${bookmarkId}`, {
      method: 'GET'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
      .then(responseData => {
        this.setState({
          bookmark:  responseData
        })
      })
      .catch(error => this.setState({ error }))
  
  }
  )
  }


handleSubmit = e => {
    e.preventDefault()
      // validation not shown
     
      const { title, url, description, rating } = e.target
      const inputValues = {
      title: title.value,
      url_: url.value,
      desc_: description.value,
      rating: rating.value,
    }
    console.log(inputValues)

    this.setState({ error: null })

      fetch(`http://localhost:8000/api/bookmarks/${this.props.match.params.bookmarkId}`, {
        method: 'PATCH',
        body: JSON.stringify.inputValues
      
      })
      
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
        .then(responseData => {

                this.context.updateBookmark(responseData)
               })
    }
  


  render() {
    const { error } = this.state
    const { title, url_, desc_, rating } = this.state.bookmark || {}

    return (
      <section className='EditBookmark'>
        <h2>Edit bookmark</h2>
        <form
          className='EditBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder={title}
              required
              //value={title}
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder={url_}
              required
              //value={url_}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              placeholder={desc_}
              //value={desc_}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              //defaultValue='1'
              min='1'
              max='5'
              required
              value={rating}
                />
          </div>
          <div className='EditBookmark__buttons'>
          <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(EditBookmark);