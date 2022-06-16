import { Component } from 'react';
import { signUp } from '../../utilities/users-service';


export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  };


  handleChange = (evt) => {
    // Unlike setSomeState in function components which
    // REPLACE the state with the arg, setState in class components
    // MERGE the provided object with the existing
    // state object
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // We don't want to send the 'error' or the 
      // 'confirm state properties
      const formData = {...this.state};
      delete formData.error;
      delete formData.confirm;
      // The promise returned by the signUp service methods
      // will resolve to the user object included in the
      // payload of the JSON Web Token
      const user = await signUp(formData);
      // Baby step
      this.props.setUser(user);
      this.props.navigate("/myposts");
    } catch {
      // An error occurred
      this.setState({ error: 'Sign Up Failed - Try Again'});
    }
  };

  // Must override the render method
  // The render method takes the place of 
  // a function component, in that its job
  // is to return the UI as JSX
  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      // <div>
      //   <div className="form-container">
      //     <form autoComplete="off" onSubmit={this.handleSubmit}>
      //       <label>Name</label>
      //       <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
      //       <label>Email</label>
      //       <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
      //       <label>Password</label>
      //       <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
      //       <label>Confirm</label>
      //       <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
      //       <button type="submit" disabled={disable}>SIGN UP</button>
      //     </form>
      //   </div>
      //   <p className="error-message">&nbsp;{this.state.error}</p>
      // </div>
      <div>
<div className="form-container" style={{width:'50%', margin:'50px auto'}}>
<form autoComplete="off" onSubmit={this.handleSubmit}>
<h1>Signup</h1>

<div className="form-outline mb-4">
  <input name="name" value={this.state.name} onChange={this.handleChange} required  type="text" id="form2Example11" className="form-control"
    placeholder="Name" />

</div>

<div className="form-outline mb-4">
  <input name="email" value={this.state.email} onChange={this.handleChange} required type="email" id="form2Example11" className="form-control"
    placeholder="Email address" />

</div>

<div className="form-outline mb-4">
  <input placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required type="password" id="form2Example22" className="form-control" />

</div>

<div className="form-outline mb-4">
  <input placeholder="Confirm Password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required type="password" id="form2Example22" className="form-control" />

</div>

<div className="d-flex align-items-center justify-content-center pb-4">
  <button type="submit" disabled={disable} className="btn btn-outline-primary">Register</button>
</div>

</form>

</div>
<p className="error-message">&nbsp;{this.state.error}</p>
</div>
    );
  }
}