class App extends React.Component {
  state = {
    name: '',
    location: '',
    img: '',
    description: '',
    comments:[{commentName:'', comment:''}],
    posts: []
  }
  componentDidMount = () => {
    axios.get('/travel').then(
      (response) => {
        console.log(response.data)
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
        description: '',
        comments: []
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
                { this.state.posts.map((post => { return(
                  <li key={post._id}>
                  {post.name}<br />
                  {post.location}<br />
                  <img src={post.img}/><br />
                  {post.description}<br />

                    <p>Comments</p>
                    { post.comments.map((comment => { return(
                      <li key={post._id}>
                      {comment.commentName}<br />
                      {comment.comment}<br />
                      </li>
                    )}))}

                    <form id={post._id} onSubmit={this.updatePost}>
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
                        <input type="text" id="img" onChange={this.handleChange} value={post.img} />
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
        }
}


ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
