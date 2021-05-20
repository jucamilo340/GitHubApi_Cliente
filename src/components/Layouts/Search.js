import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      margin:'40px 0',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

//filter repositories by name according to a term
const Search = ({repositoriesAll,setrepositories}) => {
    const classes = useStyles();
    const SearchRepository=(e)=>{
        let term=e.target.value
        let arraySearch=Array.from(repositoriesAll)
        let SearchRepositories=arraySearch.filter((repo)=>repo.name.toUpperCase().indexOf(term.toUpperCase()) > -1)
        setrepositories(SearchRepositories);
    }

  return (
    <Paper elevation={3} component="form" className={classes.root}>      
      <InputBase
        className={classes.input}
        placeholder="Search a Repository"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e)=>SearchRepository(e)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>      
    </Paper>
  );
}
 
export default Search;