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
              <h2>Create Post</h2>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <br />
                <input type="text" id="name" onChange={this.handleChange}/>
                <br />
                <label htmlFor="location">Location</label>
                <br />
                <input type="text" id="location" onChange={this.handleChange}/>
                <br />
                <label htmlFor="img">Image</label>
                <br />
                <input type="text" id="img" onChange={this.handleChange}/>
                <br />
                <label htmlFor="description">Description</label>
                <br />
                <input type="text" id="description" onChange={this.handleChange}/>
                <br />
                <input type="submit" value="Create Post" />
              </form>
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
                    <form id={post._id} onSubmit={this.createComment}>
                      <label htmlFor="name">Name</label>
                      <br />
                      <input type="text" id="commentName" defaultValue={post.comments.commentName} onChange={this.handleChange} />
                      <br />
                      <label htmlFor="comment">Comments</label>
                      <br />
                      <input type="text" id="comment" defaultValue={post.comments.comment} onChange={this.handleChange}  />
                      <input type="submit" value="Add Comment" />
                    </form>
                    <details>
                      <summary>Edit this post</summary>
                      <form id={post._id} onSubmit={this.updatePost}>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input type="text" id="name" onChange={this.handleChange} defaultValue={post.name} />
                        <br />
                        <label htmlFor="location">Location</label>
                        <br />
                        <input type="text" id="location" onChange={this.handleChange} defaultValue={post.location} />
                        <br />
                        <label htmlFor="img">Image</label>
                        <br />
                        <input type="text" id="img" onChange={this.handleChange} defaultValue={post.img} />
                        <br />
                        <label htmlFor="description">Description</label>
                        <br />
                        <input type="text" id="description" onChange={this.handleChange} defaultValue={post.description} />
                        <br />
                        <input type="submit" value="Update Post" />
                      </form>
                      <button value={post._id} onClick={this.deletePost}>DELETE</button>
                    </details>
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
