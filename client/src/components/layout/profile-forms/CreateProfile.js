import React, {Fragment, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../../actions/profile';



const CreateProfile = ({createProfile,history}) => {
    
    const [formData, setformData] = useState({
       
        gender: '',
        status:'',
        hobbies:'',
        birthday:'',
        city:'',
        state:'',
        country:'',
        fathersname:'',
        companysname:'',
        dateofjoining:'',
        companysaddress:'',
        companycity:'',
        companystate:'',
        officepincode:'', 
        permanent_address:'',
        mobile:''
        
    });
    
    const [displayofficeAddress, toggleofficeaddress] = useState(false);
    
    const {
        
        hobbies,
        birthday,
        city,
        state,

        fathersname,
        companysname,
      
        companysaddress,
        companycity,
        companystate,
        officepincode, 
        permanent_address,
        mobile,
        status
        
    } = formData
    
    const onChange = e => setformData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        createProfile(formData, history)
    }
    
    return (
        <Fragment>
             <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>*required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange= { e => onChange(e) }>
            <option value="0">* Select Status</option>
            <option value="Student">Student</option>
            <option value="Working women">Working Women</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
       
        <div className="form-group">
          <input type="text" placeholder="Birthday" name="birthday" value={birthday} onChange= { e => onChange(e) } />
          <small className="form-text"
            >Your birthday</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Mobile" name="mobile" value={mobile} onChange= { e => onChange(e) } />
          <small className="form-text"
            >Mobile number</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Permanent Address" name="permanent_address" value={permanent_address} onChange= { e => onChange(e) } />
          <small className="form-text"
            >Please give your permanent address </small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={city} onChange= { e => onChange(e) }
          />
          <small className="form-text"> City</small>
        </div>
        <div className="form-group">
          <textarea placeholder="state" name="state" value={state} onChange= { e => onChange(e) }></textarea>
          <small className="form-text">State</small>
        </div>
        <div className="form-group">
          <textarea placeholder="fathers or Guardians name" name="fathersname" value={fathersname} onChange= { e => onChange(e) }></textarea>
          <small className="form-text">Fathers name</small>
        </div>
        <div class="form-group">
          <input type="text" placeholder=" Hobbies" name="hobbies" value={hobbies} onChange= { e => onChange(e) }/>
          <small class="form-text"
            >Please use comma separated values (eg.
            read,games,chat)</small
          >
        </div>
        <div className="my-2">
          <button type="button" onClick={()=> toggleofficeaddress(!displayofficeAddress)} className="btn btn-light">
            Office Address
          </button>
          <span>Optional</span>
        </div>
               
          {displayofficeAddress && <Fragment>
        <div className="form-group social-input">
          <i className="fab fa fa-2x"></i>
          <input type="text" placeholder="companysname " name="companysname" value={companysname} onChange= { e => onChange(e) } />
        </div>
            <div className="form-group social-input">
          <i className="fab fa fa-2x"></i>
          <input type="text" placeholder="companysaddress " name="companysaddress" value={companysaddress} onChange= { e => onChange(e) } />
        </div>

        <div className="form-group social-input">
          <i className="fab fa fafa-2x"></i>
          <input type="text" placeholder="companycity " name="companycity" value={companycity} onChange= { e => onChange(e) }/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa fa-2x"></i>
          <input type="text" placeholder="companystate " name="companystate" value={companystate} onChange= { e => onChange(e) }/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa fa-2x"></i>
          <input type="text" placeholder=" officepincode" name="officepincode" value={officepincode} onChange= { e => onChange(e) } />
        </div>
        </Fragment>}      
      
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
      </form>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
    
};

export default connect(null, {createProfile})(withRouter(CreateProfile));