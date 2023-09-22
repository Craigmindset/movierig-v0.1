import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import YouTube from 'react-youtube';

const App = () => {
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    // Get the trailer URL from themoviedb.
    const getTrailerUrl = async (movieId) => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=YOUR_API_KEY`);
      const data = await response.json();

      if (data.results.length > 0) {
        setTrailerUrl(data.results[0].youtube_url);
      } else {
        setTrailerUrl(null);
      }
    };

    getTrailerUrl(1);
  }, []);

  return (
    <View style={styles.container}>
      {trailerUrl && (
        <YouTube
          ref={youtube}
          url={trailerUrl}
          // Other props go here
        />
      )}

      {!trailerUrl && (
        <Text>No trailer found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
