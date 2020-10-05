class App extends React.Component {
  state = {
    name: '',
    destination: '',
    posts: [],
    currentUser: ''
  }
  userSignIn = () => {
    axios.post('/sessions', (req, res) => {
  User.findOne({username:req.body.username}, (err, foundUser) => {
    if(err){
      console.log(err);
    } else if (!foundUser){
    console.log(req.body.username);
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        this.currentUser = foundUser
        console.log(req.session.currentUser._id);
        res.redirect('/')
      }
    }
  })
})
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
    axios.post('/travel', this.state).then(
      (response) => {
      this.setState({
        name: '',
        destination: '',
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
        destination: ''
      })
    })
  }
  render = () => {
    return  <div>
              {this.currentUser ? 7 : 9}
              <h2>Log In</h2>
              <form onSubmit={this.userSignIn}>
                <label htmlFor="username">Username</label>
                <br />
                <input type="text" id="username" onChange={this.handleChange}/>
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input type="text" id="password" onChange={this.handleChange}/>
                <br />
                <input type="submit" value="LogIn" />
              </form>
              <h2>Create Post</h2>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <br />
                <input type="text" id="name" onChange={this.handleChange}/>
                <br />
                <label htmlFor="destination">Destination</label>
                <br />
                <input type="text" id="destination" onChange={this.handleChange}/>
                <br />
                <input type="submit" value="Create Post" />
              </form>
              <h3>Posts</h3>
              <ul>
                { this.state.posts.map((post) => { return(
                  <li key={post._id}>
                  {post.name}<br />
                  {post.destination}<br />
                  <button value={post._id} onClick={this.deletePost}>DELETE</button>
                  <details>
                    <summary>Edit this post</summary>
                    <form id={post._id} onSubmit={this.updatePost}>
                      <label htmlFor="name">Name</label>
                      <br />
                      <input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
                      <br />
                      <label htmlFor="destination">Destination</label>
                      <br />
                      <input type="text" id="destination" onChange={this.handleChange} value={this.state.destination} />
                      <br />
                      <input type="submit" value="Update Post" />
                    </form>
                  </details>
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
