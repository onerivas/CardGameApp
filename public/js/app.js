class App extends React.Component {
  state = {
    posts: []
  }
  componentDidMount = () => {
    axios.get('/travel').then(
      (response) => {
        this.setState({
          posts: response.data
      })
    })
  }
  deletePost = (event) => {
    axios.delete('/travel/' + event.target.value).then(
      (response) => {
        this.setState({
          posts: response.data
      })
    })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    axios.post('/travel', this.state).then(
      (response) => {
      this.setState({
        posts: response.data
      })
    })
  }
  updatePost = (event) => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/travel/' + id, this.state).then(
      (response) => {
      this.setState({
        posts: response.data
      })
    })
  }
  createComment = (event) => {
    event.preventDefault();
    event.target.reset();
    let data =
      {
        commentName: this.state.commentName,
        comment: this.state.comment,
        postId: event.target.id
      }
    axios.post('/travel/comments', data).then(
      (response) => {
      let postIndex;
        for (let i = 0; i < this.state.posts.length; i++) {
          let post = this.state.posts[i]
          if(post._id === response.data._id){
            postIndex = i
          }
        }
        this.setState(
          (state) => {
            state.posts[postIndex] = response.data
            return state
        })
      }
    )
  }
  render = () => {
    return  <div>
              <div className="create">
              <details>
                <summary className="add-post">Add Post</summary>
                <form className="createForm" onSubmit={this.handleSubmit}>
                  <input type="text" id="name" onChange={this.handleChange} className="post-input" placeholder="name"/>
                  <br />
                  <input type="text" id="location" onChange={this.handleChange} className="post-input" placeholder="location"/>
                  <br />
                  <input type="text" id="img" onChange={this.handleChange} className="post-input" placeholder="image"/>
                  <br />
                  <textarea id="description" onChange={this.handleChange} className="post-input-description"
                  placeholder="description"/>
                  <br />
                  <input type="submit" value="Add Post" className="add"/>
                </form>
              </details>
              </div>
              <div className="posts-container">
              <ul className="posts-list">
                { this.state.posts.map((post => { return(
                  <li key={post._id} className="post">
                  <div className="post-title">
                    <div className="author">
                      <h4 className="post-author">{post.name}</h4><br />
                    </div>
                    <div className="location">
                      <h5 className="post-location">{post.location}</h5><br />
                    </div>
                  </div>
                  <div className="img-div">
                    <img src={post.img} className="post-img" /><br />
                  </div>
                  <p className="description">{post.description}</p><br />
                  <details>
                    <summary className="edit-label">edit</summary>
                    <form id={post._id} onSubmit={this.updatePost}>
                      <label htmlFor="name" className="edit-label">Name</label>
                      <br />
                      <input type="text" id="name" onChange={this.handleChange} defaultValue={post.name} className="post-input2"/>
                      <br />
                      <label htmlFor="location" className="edit-label">Location</label>
                      <br />
                      <input type="text" id="location" onChange={this.handleChange} defaultValue={post.location} className="post-input2"/>
                      <br />
                      <label htmlFor="img" className="edit-label">Image</label>
                      <br />
                      <input type="text" id="img" onChange={this.handleChange} defaultValue={post.img} className="post-input2"/>
                      <br />
                      <label htmlFor="description" className="edit-label">Description</label>
                      <br />
                      <textarea id="description" onChange={this.handleChange} defaultValue={post.description} className="post-input-description2"/>
                      <br />
                      <input type="submit" value="Update Post" className="edit-btn"/>
                      </form>
                      <button value={post._id} onClick={this.deletePost} className="delete-btn">DELETE</button>
                    </details>
                    {/*<p>Comments</p>*/}
                  <div className="line-comments"></div>
                  <ul className="comment-list">
                    { post.comments.map((comment => { return(
                    <li key={comment._id} className="post-comment">
                      <p className="comment">{comment.comment}</p>
                      <p className="commentName">-{comment.commentName}</p>
                    </li>
                    )}))}
                  </ul>
                    <div className="commentarea-line"></div>
                    <div className="add-comment-area">
                      <form id={post._id} onSubmit={this.createComment}>
                        <input type="text" id="commentName" defaultValue={post.comments.commentName} onChange={this.handleChange} placeholder="name"/>
                        <input type="text" id="comment" defaultValue={post.comments.comment} onChange={this.handleChange} placeholder="add a comment..."/>
                        <input type="submit" value="post" className="add-comment"/>
                      </form>
                    </div>
                  </li>
                )}))}
              </ul>
              </div>
            </div>
        }
}


ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
