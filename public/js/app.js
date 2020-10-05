class App extends React.Component {
  state = {
    name: '',
    commentName: '',
    location: '',
    img: '',
    description: '',
    posts: [],
    comments: []
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
        name: '',
        location: '',
        img: '',
        description: '',
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
        posts: response.data,
        name: '',
        location: '',
        img: '',
        description: ''
      })
    })
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
              <h3>Posts</h3>
              <ul>
                { this.state.posts.map((post) => { return(
                  <li key={post._id}>
                  {post.name}<br />
                  {post.location}<br />
                  <img src={post.img}/><br />
                  {post.description}<br />
                  <div className="comments">
                    <p>Comments</p>
                    <form id={post._id} onSubmit={this.updatePost}>
                      <label htmlFor="commentName">Name</label>
                      <br />
                      <input type="text" id="commentName" onChange={this.handleChange} value={this.state.commentName} />
                      <br />
                      <label htmlFor="comment">Comments</label>
                      <br />
                      <input type="text" id="comment" onChange={this.handleChange} value={this.state.comment} />
                      <input type="submit" value="Add Comment" />
                    </form>
                  </div>
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
                        <input type="text" id="img" onChange={this.handleChange} value={post.img} />
                        <br />
                        <label htmlFor="description">Description</label>
                        <br />
                        <input type="text" id="description" onChange={this.handleChange} defaultValue={post.description} />
                        <br />
                        <input type="submit" value="Update Post" />
                      </form>
                    </details>
                  <button value={post._id} onClick={this.deletePost}>DELETE</button>
                  </li>
                )})}
              </ul>
              </div>
        }
}


ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
