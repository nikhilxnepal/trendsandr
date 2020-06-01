import React, { useContext, Fragment } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "react-loader-spinner";

const HomePage = React.lazy(() => import("../components/HomePage"));
const LatestMovies = React.lazy(() =>
  import("../components/HomePage/LatestMovies")
);
const LatestBooks = React.lazy(() =>
  import("../components/HomePage/LatestBooks")
);
// Movies Section
const Movie = React.lazy(() => import("../components/Movies/Movie"));
const PopularMovies = React.lazy(() =>
  import("../components/Movies/PopularMovies")
);
const UpcomingMovies = React.lazy(() =>
  import("../components/Movies/UpcomingMovies")
);
const TopratedMovies = React.lazy(() =>
  import("../components/Movies/TopratedMovies")
);
const Movies = React.lazy(() => import("../components/Movies"));

// Books Section
const Books = React.lazy(() => import("../components/Books"));
const Book = React.lazy(() => import("../components/Books/Book"));
const PopularBooks = React.lazy(() =>
  import("../components/Books/PopularBooks")
);
const TopratedBooks = React.lazy(() =>
  import("../components/Books/TopratedBooks")
);

// Games Section
const Game = React.lazy(() => import("../components/Games/Game"));
const PopularGames = React.lazy(() =>
  import("../components/Games/PopularGames")
);
const UpcomingGames = React.lazy(() =>
  import("../components/Games/UpcomingGames")
);
const TopratedGames = React.lazy(() =>
  import("../components/Games/TopratedGames")
);
const Games = React.lazy(() => import("../components/Games"));

// YouTubeVideos Section
const YouTubeVideo = React.lazy(() => import("../components/YouTubeVideos/YouTubeVideo"));
const YouTubeVideos = React.lazy(() => import("../components/YouTubeVideos"));

const Layout = (props) => {
  const { loading } = useContext(GlobalContext);
  return (
    <Fragment>
      {loading ? (
        <div className="loader">
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        </div>
      ) : null}
      <Router>
        <Navbar />
        <React.Suspense fallback={""}>
          <Switch>
            <Route path="/" exact component={HomePage} />

            <Route path="/movies" exact component={Movies} />
            <Route path="/movies/genre/:id" exact component={Movies} />
            <Route
              path="/movies/country/:countryname"
              exact
              component={Movies}
            />
            <Route path="/movies/popular" exact component={PopularMovies} />
            <Route path="/movies/upcoming" exact component={UpcomingMovies} />
            <Route path="/movies/toprated" exact component={TopratedMovies} />
            <Route path="/movies/:id" component={Movie} />

            <Route path="/books" exact component={Books} />
            <Route path="/books/popular" exact component={PopularBooks} />
            <Route path="/books/toprated" exact component={TopratedBooks} />
            <Route path="/books/:id" component={Book} />

            <Route path="/games" exact component={Games} />
            <Route path="/games/category/:id" exact component={Games} />
            <Route path="/games/popular" exact component={PopularGames} />
            <Route path="/games/upcoming" exact component={UpcomingGames} />
            <Route path="/games/toprated" exact component={TopratedGames} />
            <Route path="/games/:id" component={Game} />

            <Route path="/youtubevideos" exact component={YouTubeVideos} />
            <Route path="/youtubevideos/category/:id" exact component={YouTubeVideos} />
            <Route path="/youtubevideos/:id" component={YouTubeVideo} />

            <Redirect to="/" />
          </Switch>
        </React.Suspense>
      </Router>
    </Fragment>
  );
};

export default Layout;
