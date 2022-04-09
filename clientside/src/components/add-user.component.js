import  {React,Component} from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment'


// Login Scheema:
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

// AddUser Component

export default class AddUser extends Component{
    //handleSubmit 
    handleSubmit=(values,{resetForm})=>{
    alert(JSON.stringify(values, null, 2));
    const formData=new FormData();
    formData.append('fname',values.fname);
    formData.append('lname',values.lname);
    formData.append('email',values.email);
    formData.append('password',values.password);
    formData.append('dob',values.dob);
    formData.append('profileImg',values.profileImg);
    axios.post("http://localhost:4000/users/add-user",formData,{headers:{ "Content-Type": "multipart/form-data",}})
       .then(console.log)
        resetForm({values:""})
        alert('Submitted Successfuly!!');

    };

            
  render()
  {
  return(
        <Formik
             initialValues={{ fname:"",lname:"",email: "", password: "" ,dob:"",profileImg:""}}
             validationSchema={LoginSchema}
             onsubmit={this.handleSubmit}
             
        
             render={({ setFieldValue, errors, status, touched }) => (
                   
            <Form >

            <div className="form-group">
                <label htmlFor="fname">First Name</label>
                <Field type="text"  name="fname" placeholder="Enter first name" autoComplete="off" 
                className={`mt-2 form-control ${touched.fname && errors.fname ? "is-invalid" : ""}`}/>
                <ErrorMessage component="div" name="fname" className="invalid-feedback"/>
            </div>

            <div className="form-group">
                <label htmlFor="lname">Last Name</label>
                <Field type="text"  name="lname" placeholder="Enter last name" autoComplete="off" 
                className={`mt-2 form-control ${touched.lname && errors.lname ? "is-invalid" : ""}`}/>
                 <ErrorMessage component="div" name="lname" className="invalid-feedback"/>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email"  name="email" placeholder="Enter your email" autoComplete="off" 
                className={`mt-2 form-control ${touched.email && errors.email ? "is-invalid" : ""}`}/>
                 <ErrorMessage component="div" name="email" className="invalid-feedback"/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password"  name="password" placeholder="Enter your password" autoComplete="off" 
                className={`mt-2 form-control ${touched.password && errors.password ? "is-invalid" : ""}`}/>
                 <ErrorMessage component="div" name="password" className="invalid-feedback"/>
            </div>

            <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <Field type="date"  name="dob" placeholder="Enter first name" autoComplete="off" 
                className={`mt-2 form-control ${touched.dob && errors.dob ? "is-invalid" : ""}`}/>
                 <ErrorMessage component="div" name="dob" className="invalid-feedback"/>
            </div>
            
            <label htmlFor="imagem" className="mt-3"> Upload Your Image </label>
            <br/>
            <input id="file" name="profile"  type="file"
              onChange={(event) => {
              const File = event.target.files[0];
              setFieldValue("profileImg", File);
             }}/>
           
            <div className="form-group">
            <button type="submit" onClick="onSubmit()" className="btn btn-primary mr-2">Submit</button>
            </div>
            </Form>
                            
                        
            )}
        />
               
      )
  }
} 




