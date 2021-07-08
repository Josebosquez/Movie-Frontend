import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class Movie extends Component {
  state = {
    movie: "",
    movieArray: [], // variable to display our search 
  };

  handleOnChange = (event) => {  // sets state to remember what we input in our search box.
    this.setState({
      movie: event.target.value,
    });
  };

  onSubmit = async (event) => {
    try {
      let result = await axios.get( // get req for what we are looking for in our input box.
        `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&s=${this.state.movie}`
      );

      console.log(result);

      this.setState({
        movieArray: result.data.Search, // sets our movie array to be what we searched for in the search bar. but its limited to 10 searches a page. will work on that later.
      });
    } catch (e) {
      console.log(e);
    }
  };

  showMovieList = () => {
    return this.state.movieArray.map((item) => { // will map through our array
      return (
        <div
          key={item.imdbID}
          style={{ width: 300, height: 300, marginRight: 25 }}
        >
          <Link // creates a link tag that makes a path with the path name.
            to={{
              pathname: `/movie-detail/${item.Title}`,
              //search: `?t=${item.Title}`, //?minPrice=20&maxPrice=59&color=white&size=10
            }}
          >
            <div> {/*creates a img based on the picture, and throws the title, and year */}
              <img src={item.Poster} alt={item.Title} />
            </div>
            <div>
              Title: {item.Title}
              Year: {item.Year}
            </div>
          </Link>
        </div>
      );
    });
  };

  render() {
    console.log(this.props);

    return (
      <div>
        <div // sets the style to what we want
          style={{
            width: 500,
            margin: "0 auto",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <input // input bar that handles our onchange func
            type="text"
            placeholder="Search something..."
            name="movie"
            onChange={this.handleOnChange}
          /> 
          <button onClick={this.onSubmit}>Search</button> {/* handles our get request for the movie we searched for.*/} 
        </div>

        <div
          style={{
            width: 1200,
            margin: "0 auto",
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
          }}
        >
          {this.showMovieList()} {/* handles our mapped movie array to display our search.*/}
        </div>
      </div>
    );
  }
}

export default Movie;
