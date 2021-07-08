import React, { Component } from "react";
import axios from "axios";

export class MovieDetail extends Component {
  state = { // what we are posting in our movie detail page info that gets rendered.
    Actors: "",
    Awards: "",
    Country: "",
    Plot: "",
    Poster: "",
    Rated: "",
    Ratings: [],
    Title: "",
    imdbID: "",
    isLoading: true, // if we dont have anything being pulled in our get req, show is loading because we dont have it set up correctly.
  };

  async componentDidMount() { //  makes a get req based on our api key and what we are searching for based on our match.params.movietitle.
    try {
      let result = await axios.get( //apikey should not be hardcoded
        `https://omdbapi.com/?apikey=6332b1e1&t=${this.props.match.params.movieTitle}`
      );

      this.setState({ // we then pull the results data for what we want in our state to render.
        Actors: result.data.Actors,
        Awards: result.data.Awards,
        Country: result.data.Country,
        Plot: result.data.Plot,
        Poster: result.data.Poster,
        Rated: result.data.Rated,
        Ratings: result.data.Ratings,
        Title: result.data.Title,
        imdbID: result.data.imdbID,
        isLoading: false,
      });

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  showMovieDetail = () => {  // this function sets up for the render to show the information from our state. 
    return (
      <div style={{ display: "flex" }}>
        <div>
          <img src={this.state.Poster} alt={this.state.Title} />
        </div>
        <div>
          <div>Actors: {this.state.Actors}</div>
          <div>Awards: {this.state.Awards}</div>
          <div>Country: {this.state.Country}</div>
          <div>Plot: {this.state.Plot}</div>
          <div>Poster: {this.state.Poster}</div>
          <div>Rated: {this.state.Rated}</div>
          <div>
            Ratings:{" "}
            {this.state.Ratings.map((item) => { // the rating will have more than one set of info, which is why we need to create a map and show all the items.
              return (
                <span key={item.Source}>
                  {item.Source} {item.Value}
                </span>
              );
            })}
          </div>
          <div>Title: {this.state.Title}</div>
          <div>imdbID: {this.state.imdbID}</div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (  // if load is true,
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            ...Loading {/*show loading  */}
          </div>
        ) : (
          this.showMovieDetail() // else, shows the state info from our func
        )}
      </div>
    );
  }
}

export default MovieDetail;
