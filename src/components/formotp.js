import React from 'react'
import Helmet from 'react-helmet'

export default class Otp extends React.Component{
	state={
			otp:"",
	};
	change= e=>{
			this.setState({
					[e.target.name]: e.target.value
			});
	};
			
	render(){
		return(
			<div className="section-dialog bg-gray">       
				<Helmet><title>OTP form</title></Helmet>  
				<div className="form input-line">              
					<div className="form-group">
						<label> OTP</label>
						<input name="otp" placeholder="Enter OTP" 
							className="form-control"
							value={this.state.otp} 
							onChange={e=> this.change(e)} type="text"
						/>
					</div>                        
					<button className="btn btn-success" disabled={!this.state.otp} onClick={this.props.onSubmit.bind(this, this.state.otp)} type="submit">Next</button>
				</div>
			</div>
		
		)
	}
}