import React from 'react';
import axios from 'axios';
//import {useDropzone} from 'react-dropzone'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import moment from 'moment'



const LoginSchema = Yup.object().shape({
  fname: Yup.string()
  .min(3, "fname must be 3 characters at minimum")
  .required("first name is required"),
  lname: Yup.string()
  .min(3, "lname must be 3 characters at minimum")
  .required("last name is required"),
  email: Yup.string()
  .email("Invalid email address format")
  .required("Email is required"),
  password: Yup.string()
 .min(3, "Password must be 3 characters at minimum")
 .required("Password is required"),
  dob:Yup.string()
  .required("DOB is Required")
  .test("DOB", "Please choose a valid date of birth", (value) => {
  return moment().diff(moment(value), "years") >= 1;
  }),
  profileImg: Yup.mixed().required("image is Required")
});

class UpdateUser extends React.Component {
  componentDidMount(){
    console.log(this.props);
    const id=this.props.id;
     
     axios.get('http://localhost:4000/users/getuser/' + id)
      .then(res => {
        this.setState({
            fname:res.data.fname,
            lname:res.data.lname,
            dob:res.data.dob,
            email:res.data.email,
            password:res.data.password,
            profileImg:res.data.profileImg
        });
    })
    .catch((error) => {
      console.log(error);
    })
   
  }

  handleSubmit=(values,{resetForm}) => {
    console.log('values', values);
    const id=this.props.id;
    
    alert(JSON.stringify(values, null, 2));
   
    const formData = new FormData();

    formData.append('fname', values.fname);
    formData.append('lname', values.lname);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('dob', values.dob);
    formData.append('profileImg', values.profileImg);

    axios.put("http://localhost:4000/users/updateuser/" + id,  formData, {headers: {
      "Content-Type": "multipart/form-data",
    },})
      
      resetForm({values:""})
      alert('user updated successfully ' );
    
      
};

render() {
    
  return (
   
    <div>
      <Formik
           initialValues={{ fname:"",lname:"",email: "", password: "" ,dob:"",profileImg:""}}
          validationSchema={LoginSchema}

          onSubmit={this.handleSubmit}
        
        
          render={({ setFieldValue, errors, status, touched }) => (
             
            <Form >
            <div className="form-group">
                <label htmlFor="fname">First Name</label>
                <Field
                  type="text"
                  name="fname"
                  placeholder="Enter first name"
                  autoComplete="off"
                  className={`mt-2 form-control
                  ${touched.fname && errors.fname ? "is-invalid" : ""}`}
                />

                <ErrorMessage
                  component="div"
                  name="fname"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lname">Last Name</label>
                <Field
                  type="text"
                  name="lname"
                  placeholder="Enter last name"
                  autoComplete="off"
                  className={`mt-2 form-control
                  ${touched.lname && errors.lname ? "is-invalid" : ""}`}
                />

                <ErrorMessage
                  component="div"
                  name="lname"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  className={`mt-2 form-control
                  ${touched.email && errors.email ? "is-invalid" : ""}`}
                />

                <ErrorMessage
                  component="div"
                  name="email"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="mt-3">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  autoComplete="off"
                  className={`mt-2 form-control
                  ${
                    touched.password && errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob" className="mt-3">
                  Date Of Birth
                </label>
                <Field
                  type="date"
                  name="dob"
                  placeholder="Enter Date Of Birth"
                  className={`mt-2 form-control
                  ${
                    touched.dob && errors.dob
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="dob"
                  className="invalid-feedback"
                />
              </div>
             
              <label htmlFor="imagem" className="mt-3">
                  Upload Your Image
                </label>
               <br/>
             
              
               <input
          id="file"
          name="profile"
          type="file"
          onChange={(event) => {
            const File = event.target.files[0];
            setFieldValue("profileImg", File);
          }}
        />
            
             
                  <div className="form-group">
                      <button type="submit" onClick={this.onSubmit} className="btn btn-primary mr-2">Register</button>
                      <button type="reset" className="btn btn-secondary">Reset</button>
                  </div>
              </Form>
          )}
      />
        </div>
  )

}

}

function UpdatemyUserFunction() {
const params = useParams();
return (<UpdateUser id={params.id}/>);
}

export default UpdatemyUserFunction;

            
  
       
   
      

  
  
              
 
   
    
   

   
  

   