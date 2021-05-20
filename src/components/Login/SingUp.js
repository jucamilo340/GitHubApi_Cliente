import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useFormik } from "formik";
import Swal from 'sweetalert2'
import { Axios } from "../../config/axios"
import {useHistory } from "react-router-dom";
import {
  CREATE_USER,
} from "../../constants/index";
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import 'date-fns';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://blog.underc0de.org/wp-content/uploads/2020/10/69061801_1983324578436489_6865726632515076096_o.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor:"#202123",
      color:"white"
    },
  }));
  

const Login = () => {
    const classes = useStyles();
    let history = useHistory();

      // use formik to validate the form data
      const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName:"",
          username:"",
          email:"",
          password:""          
        },
        //validate the fields
        validationSchema: Yup.object({
          firstName: Yup.string().required("The firstName is required"),
          lastName: Yup.string().required("The lastName is required"),
          username: Yup.string().required("The username is required"),
          password:Yup.string().min(6, 'The password must be a minimum of 6 characters').required('The Password is required'),
          email: Yup.string().email('Invalid email').required('The Email is required'),
         
        }),
        onSubmit: (values) => {
          const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            password: values.password,
          }; 
        //Request Create user  
        Axios.post(CREATE_USER, data)
        .then((res) => {
          Swal.fire(
            'User Created Successfully',
            '',
            'success'
          )
          history.push('/Login')
        })
        .catch((err) => {
          console.log(err);
          Swal.fire(
            'There was an Error creating the user',
            '',
            'error'
          )
        });
          
        },
      });

    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
                error={formik.touched.firstName && formik.errors.firstName ? true : false}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
                error={formik.touched.lastName && formik.errors.lastName ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                helperText={formik.touched.username && formik.errors.username}
                error={formik.touched.username && formik.errors.username ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && formik.errors.email ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                helperText={formik.touched.password && formik.errors.password}
                error={formik.touched.password && formik.errors.password ? true : false}
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
            
            </Grid>
                    
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="#434b4d"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/Login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
          </div>
        </Grid>
      </Grid>
    );
}
 
export default Login;