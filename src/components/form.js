import React from 'react';
import * as EmailValidator from 'email-validator'
// import {Label} from 'semantic-ui-react'
import {isValidNumber } from 'libphonenumber-js'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
export default class Form extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            name:"",
            email:"",
            phone:"",
            description:"",
            college_name:"",
            city:"",
            test:"",
            email_validation: true
        }
    }
    change= e=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onBlur(){
        let validity = EmailValidator.validate(this.state.email)
        this.setState({
            email_validation:validity
        })
    }
    handleOnChange=(value)=> {
        this.setState({
         phone: value
       })
    }

    render(){
			return(
				<div className="section-dialog bg-gray shadow-8">
					<div>
						{
							this.props.formTitle && <center><h2>
								{this.props.formTitle}
							</h2> </center>
						}
						<div className="form input-line">
								<div className="form-group">
								<label>Mobile Number <span className="text-danger">*</span></label>
								<PhoneInput
									className=""
									country="IN"
									placeholder="Enter phone number"
									onChange={this.handleOnChange}
									value={ this.state.phone }
									error={ this.state.phone ? (isValidNumber(this.state.phone) ? undefined : 'Invalid phone number') : 'Phone number required' }
											indicateInvalid
								/>
								</div>
								<div className="form-group">
										{/* <label> Name</label> */}
										<input name="name" placeholder="Name"
										className="form-control"
										value={this.state.name}
										onChange={e=> this.change(e)} type="text"/>
								</div>
								<div className="form-group">
										{/* <label>Email</label> */}
										<input name="email" placeholder="Email"
										className="form-control"
										value={this.state.email}
										onChange={e=> this.change(e)}
												type="text"
												onBlur = {this.onBlur.bind(this)}/>
												{!this.state.email_validation && <label style={{color:'#D30F00',fontWeight:'300'}}>Please Enter Correct Email Address</label>}
								</div>
								{(this.props.pathName === "/contact" || this.props.pathName === '/contact/') &&<div><div className="form-group">
										{/* <label>Description</label> */}
										<textarea rows="5" name="description" placeholder="Description"
										value={this.state.description}
										onChange={e=> this.change(e)} type="text"/>
								</div>
								<button className="btn" onClick={this.props.onSubmit.bind(this, this.state.phone, this.state.email, this.state.name, this.state.description)} disabled={!this.state.email_validation} type="submit">Next</button></div>
								}
								{
										(this.props.pathName === "/campus-leaders" || this.props.pathName === "/campus-leaders/") && <div>
										<div className="form-group">
										{/* <label>College Name</label> */}
										<input name="college_name" placeholder="College Name"
										className="form-control"
										value={this.state.college_name}
										onChange={e=> this.change(e)} type="text"/>
								</div>
								<div className="form-group">
										{/* <label>City</label> */}
										<input name="city" placeholder="City Name"
										className="form-control"
										value={this.state.city}
										onChange={e=> this.change(e)} type="text"/>
								</div>
								<button className="btn btn-success" onClick={this.props.onSubmit.bind(this, this.state.phone, this.state.name, this.state.email, this.state.college_name, this.state.city)} type="submit" disabled={!this.state.email_validation} >Next</button>
								</div>
								}
						</div>
				</div>
			</div>
		)
  }
}
