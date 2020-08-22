const Movies = require('./models/movie').Movies

const resolvers = {
  Query: {

    //getMovies: () => Movie.find({}),
    movies: async(parent, args, context) => {
      try {
        const movies = await Movies.find();
        return movies
      } catch (err) {
        throw err
      }
    },

    //getMovie: (args) => Movie.findById(args.id)
    movie: async (parent, args, context) => {
      try {
        const movie = await Movies.findById(args.id)
        return movie
      } catch (err) {
        throw err
      }
    },

  },

  Mutation: {
    /* addMovie: (parent, args) => {
      let movie = new Movie({
        name: args.name,
        producer: args.producer,
        rating: args.rating
      })
      return movie.save()
    } */
    addMovie: async (parent, args) => {
      try {
        
        const movie = Movies.findOne({
          name:  args.name
        })
        
        /**FIX**/
      if (movie.name) {
       throw new Error ('Movie already exists')
        } else {
          const newMovie = new Movies({
            name: args.name,
            producer: args.producer,
            rating: args.rating
          });
          const savedMovie = newMovie.save();
          return savedMovie
        }
        
      } catch(err) {
        throw err
      }
    },

    updateMovie: async (parent, { id, updateMovie}, context) => {
      try {
        const movie = await Movies.findByIdAndUpdate(id, updateMovie, { new: true})
        return movie
      } catch(err) {
        throw err
      }
    },

    deleteMovie: async (parent, args, context) => {
      try {
        if (!args.id) {
          throw new Error (`Movie with ${args.id} doesn't exist!`)
        } else {
          
          return Movies.findByIdAndDelete(args.id)
        }
      } catch (err) {
        throw err
      }
    }
  }
}

module.exports = resolvers