import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
const moment = require('moment');
const BlogSchema = Yup.object().shape({
     name: Yup.string()
    .min(3, "name must be 3 characters at minimum")
    .required(" name is required"),
     blog: Yup.string()
    .min(3, "blog must be 3 characters at minimum")
    .required("blog is required"),
   
  });
 // AddBlog Component
 export default class AddBlog extends React.Component {
       handleSubmit=(values,{resetForm})=>{
       alert(JSON.stringify(values, null, 2));
       axios.post('http://localhost:4000/blogs/add-blog', values)
       .then(res => console.log(res.data));
       alert("Form is validated! Submitting the form...");
    };

 render() {
      return (
        <div className="container">
             <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={BlogSchema}
                onsubmit={this.handleSubmit}
              > 
                 {({ touched, errors, isSubmitting, values }) =>
                  !isSubmitting ? (
                <div>
                <Form>
                <div className="form-group">
                <label htmlFor="name"> Name</label>
                <Field type="text"  name="name" placeholder="Enter name" autoComplete="off" 
                className={`mt-2 form-control ${touched.name && errors.name ? "is-invalid" : ""}`}/>
                <ErrorMessage component="div" name="name" className="invalid-feedback"/>
                </div>
                <div className="form-group">
                <label htmlFor="blog">Description </label>
                <Field as="textarea" name="blog" placeholder="Enter first name" autoComplete="off" 
                className={`mt-2 form-control ${touched.blog && errors.blog ? "is-invalid" : ""}`}/>
                <ErrorMessage component="div" name="blog" className="invalid-feedback"/>
                </div>
                <div className="form-group">
               <button type="submit" onClick="onSubmit()" className="btn btn-primary mr-2">Submit</button>
               </div>
               </Form>
               </div>
                ) : (
                    <div>
                      <h1 className="p-3 mt-5">Form Submitted</h1>
                      <div className="alert alert-success mt-3">
                        Thank You for vist
                      </div>
                      </div>
                  )
                }
              </Formik>
            </div>
        );
    }
}
            
         
            
                
             
                
                    
                      
                        
    
                        
                        
                      
                    
                 
                              
              
        
                       
                   
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  