import { Command } from "commander";
import axios from "axios";
import ora from "ora";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

const program = new Command();

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

async function fetchMovies(endpoint) {
  const spinner = ora("Fetching movies...").start();
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        api_key: API_KEY,
      },
    });
    spinner.stop();
    return response.data.results;
  } catch (error) {
    spinner.stop();
    console.error(chalk.red("Error fetching movies: "), error.message);
    process.exit(1);
  }
}

async function displayMovies(type) {
  let endpoint;
  switch (type) {
    case "popular":
      endpoint = "movie/popular";
      break;
    case "top_rated":
      endpoint = "movie/top_rated";
      break;
    case "upcoming":
      endpoint = "movie/upcoming";
      break;
    case "now_playing":
      endpoint = "movie/now_playing";
      break;
    default:
      console.log(
        chalk.yellow(
          "Invalid type. Use: popular, top_rated, upcoming, now_playing"
        )
      );
      process.exit(1);
  }

  const movies = await fetchMovies(endpoint);
  console.log(chalk.green(`\n${type.toUpperCase()} MOVIES\n`));
  movies.forEach((movie, index) => {
    console.log(
      `${index + 1}. ${chalk.blue(movie.title)} (${movie.release_date})`
    );
  });
}

program
  .name("tmdb-cli")
  .description("A CLI tool to fetch movies from TMDB")
  .version("1.0.0");

program
  .command("movies <type>")
  .description(
    "Fetch movies by type (popular, top_rated, upcoming, now_playing)"
  )
  .action((type) => {
    displayMovies(type);
  });

program.parse(process.argv);
