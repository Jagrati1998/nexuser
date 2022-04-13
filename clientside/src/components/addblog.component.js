import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import "bootstrap/dist/css/bootstrap.css";
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

class AddBlog extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={BlogSchema}
              onSubmit={(values) => {
               // console.log(values);
               axios.post('http://localhost:4000/blogs/add-blog', values)
              .then(res => console.log(res.data));
                alert("Form is validated! Submitting the form...");
              }}
            >
              {({ touched, errors, isSubmitting, values }) =>
                !isSubmitting ? (
                  <div>
                    
                    <Form>
                    <div className="form-group">
                        <label htmlFor="name"> Name</label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Enter name"
                          autocomplete="off"
                          className={`mt-2 form-control
                          ${touched.name && errors.name ? "is-invalid" : ""}`}
                        />
  
                        <ErrorMessage
                          component="div"
                          name="name"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="blog">Description</label>
                        <Field as ="textarea"
                         
                          rows="5"
                          name="blog"
                          placeholder="Enter blog"
                          
                          autocomplete="off"
                          className={`mt-2 form-control
                          ${touched.blog && errors.blog ? "is-invalid" : ""}`}
                        />
  
                        <ErrorMessage
                          component="div"
                          name="blog"
                          className="invalid-feedback"
                        />
                      </div>
                      
  
                      
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mt-4"
                      >
                        Submit
                      </button>
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
        </div>
      </div>
    );
  }
}
  
export default AddBlog;




































