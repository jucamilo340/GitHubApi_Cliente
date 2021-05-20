import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Header from "./Layouts/Header";
import Search from "./Layouts/Search";
import { useQuery, gql } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import moment from "moment"
import { Grid } from "@material-ui/core";
import { Axios } from "../config/axios";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import {
  ADD_FAVORITES,
  GET_FAVORITES,
  REMOVE_FAVORITES,
} from "../constants/index";

const query = gql`
  query user($login: String!) {
    user(login: $login) {
      avatarUrl
      repositories(first: 50, isFork: false) {
        nodes {
          name
          description
          createdAt
          isPrivate
          url
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  container: {
    marginTop: 30,
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  Star: {
    color: "#DAD05C",
    fontSize: 35,
    cursor: "pointer",
  },
});

const Inicio = () => {

  //authenticated user
  var user = localStorage.getItem("user");
  var User = JSON.parse(user);

  //UseStates
  const [repositories, setrepositories] = useState([]);
  const [repositoriesFav, setrepositoriesFav] = useState([]);
  const [avatarurl, setavatarurl] = useState("");
  const [active, setactive] = useState("#202123");
  const [Fav, setFav] = useState(false);
  const [favvoid, setfavvoid] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [disable, setdisable] = useState("#fff");
  const classes = useStyles();

  //we execute the query to obtain the repositories
  const { data, loading, refetch } = useQuery(query, {
    variables: { login: User ? User.username : "" },
  });

  console.log(data);

  useEffect(() => {
    //if data is diffetent undefined
    if (data) {
      setrepositories(data.user.repositories.nodes);
      setavatarurl(data.user.avatarUrl);
      getFavorites();
    }
  }, [data, refresh]);

  //Get the list of favorite repositories
  const getFavorites = () => {
    let data = { userId: User._id };
    Axios.post(GET_FAVORITES, data)
      .then((res) => {
        console.log(res);
        if (repositoriesFav.length !== 0) {
          setrepositories(res.data.repos);
        }
        if(res.data.repos.length===0){
          console.log("entraaaa");
          setfavvoid(true)
        }
        setrepositoriesFav(res.data.repos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 //reload all repositories from the github api
  const getAll = () => {
    refetch();
    setactive("#202123");
    setdisable("#fff");
    setrepositories([]);
    setrepositoriesFav([]);
    setrefresh(!refresh);
  };

  //function to add a repository to favorites
  const AddFavorites = (repo) => {
    console.log("repo", repo);
    let data = {
      createdAt: repo.createdAt,
      description: repo.description,
      isPrivate: repo.isPrivate,
      name: repo.name,
      url: repo.url,
      userId: User._id,
    };
    Axios.post(ADD_FAVORITES, data)
      .then((res) => {
        console.log(res);
        setrepositoriesFav([]);
        if (Fav) {
          getFavorites();
        } else {
          setrefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //function to remove a repository to favorites
  const RemoveFavorites = (repo) => {
    let name = repo.name;

    Axios.delete(REMOVE_FAVORITES, { params: { name } })
      .then((res) => {
        console.log(res);
        setrepositoriesFav([]);
        if (Fav) {
          getFavorites();
        } else {
          setrefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //check if a repository is in the favorites list
  const isFavorite = (name) => {
    const current = repositoriesFav.find((repo) => name === repo.name);
    if (current) {
      return true;
    }
    return false;
  };
  return (
    <>
      {user !== null ? (
        <>
          <Header avatarurl={avatarurl} />          
          <Container className={classes.container}>
            <Search repositoriesAll={repositories} setrepositories={setrepositories}/>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  if(Fav){
                    setFav(false);
                    setfavvoid(false);
                    getAll();
                  }
                }}
                style={{ backgroundColor: active, color: disable }}
              >
                All Repositories
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  if(!Fav){
                  setFav(true);
                  setactive("#fff");
                  setdisable("#202123");
                  setrepositories([]);
                  getFavorites();
                  }
                }}
                style={{ backgroundColor: disable, color: active }}
              >
                Favorites
              </Button>
            </Grid>
            <Grid container spacing={3}>
              {!loading ? (
                repositories.length !== 0 ? (
                  repositories.map((repo, index) => (
                    <Grid item xs={3} index={index}>
                      <Card  elevation={3} className={classes.root}>
                        <CardContent className={classes.content}>
                          <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                          ></Typography>
                          <Typography variant="h5" component="h2">
                            {repo.name}
                          </Typography>
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            {repo.isPrivate ? "Private" : "Public"}
                          </Typography>
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            CreateAt: {moment(new Date(repo.createdAt)).format("DD/MM/YYYY")}
                          </Typography>
                          <Typography variant="body2" component="p" style={{with:20}}>
                            {repo.description
                              ? repo.description
                              : "none Description"}
                            <br />
                          </Typography>
                          <Typography
                            variant="body2"
                            component="p"
                            style={{ width: "10px" }}
                          >
                            <br />
                            URL:{repo.url}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {isFavorite(repo.name) ? (
                            <StarIcon
                              className={classes.Star}
                              onClick={() => RemoveFavorites(repo)}
                            />
                          ) : (
                            <StarBorderIcon
                              className={classes.Star}
                              onClick={() => AddFavorites(repo)}
                            />
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <h1>
                    {Fav && favvoid
                      ? "you dont have favorite repositories, add one"
                      : !Fav?"you dont have repositories":null}
                  </h1>
                )
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </Container>
        </>
      ) : (
        <Redirect to="/Login" />
      )}
    </>
  );
};

export default Inicio;
