import React, {Fragment, useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile, getCurrentProfile} from '../../../actions/profile';



const EditProfile = ({
  profile:{profile, loading},
  createProfile,
  getCurrentProfile,
  history
  }) => {
    
    const [formData, setformData] = useState({
       
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
    
    useEffect(() => {
      getCurrentProfile();
      setformData({
        
        hobbies: loading||!profile.hobbies?'':profile.hobbies.join(','),
        status:loading||!profile.status?'':profile.status,
        birthday:loading||!profile.birthday?'':profile.birthday,
        city:loading||!profile.city?'':profile.city,
        state:loading||!profile.state?'':profile.state,
        country:loading||!profile.country?'':profile.country,
        fathersname:loading||!profile.fathersname?'':profile.fathersname,
        companysname:loading||!profile.companysname?'':profile.companysname,
        dateofjoining:loading||!profile.dateofjoining?'':profile.dateofjoining,
        companysaddress:loading||!profile.officaladdress?'':profile.companysaddress,
        companycity:loading||!profile.officaladdress?'':profile.companycity,
        companystate:loading||!profile.officaladdress?'':profile.companystate,
        officepincode:loading||!profile.officaladdress?'':profile.officepincode,
        permanent_address:loading||!profile.permanent_address?'':profile.permanent_address,
        mobile:loading||!profile.mobile?'':profile.mobile 
      })
      
    }, [loading]);
    
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
        createProfile(formData, history, true)
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
            read,games,chat)</small>
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
          <input type="text" placeholder="compnaystate " name="companystate" value={companystate} onChange= { e => onChange(e) }/>
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

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
    
};

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));