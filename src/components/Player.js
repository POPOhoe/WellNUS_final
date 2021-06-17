import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Text } from "../components/TextComponents";
import Slider from "@react-native-community/slider";
import { windowWidth, windowHeight } from "../infrastructure/theme/dimensions";

const Playlist = [
  {
    title: "Basics of Meditation - Day 1",
    author: "WellNUS",
    source: "",
    uri: require("../../MeditationTracks/Basics/Day1.mp3"),
    imageSource:
      "https://cdn.dribbble.com/users/1787323/screenshots/15491880/media/b7743c488f2f89dd461ad8955405fa29.png?compress=1&resize=1600x1200",
  },
  {
    title: "Basics of Meditation - Day 2",
    author: "WellNUS",
    source: "",
    uri: require("../../MeditationTracks/Basics/Day2.mp3"),
    imageSource:
      "https://cdn.dribbble.com/users/1787323/screenshots/15491880/media/b7743c488f2f89dd461ad8955405fa29.png?compress=1&resize=1600x1200",
  },
];

export class Player extends Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false,
  };

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });

      this.loadAudio();
    } catch (e) {
      console.log(e);
    }
  }

  async loadAudio() {
    const { currentIndex, isPlaying, volume } = this.state;

    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri: Playlist[currentIndex].uri,
      };

      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(
        Playlist[currentIndex].uri,
        status,
        false
      );
      this.setState({ playbackInstance });
    } catch (e) {
      console.log(e);
    }
  }

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering,
    });
  };

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    this.setState({
      isPlaying: !isPlaying,
    });
  };

  handlePreviousTrack = async () => {
    let { playbackInstance, currentIndex } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < Playlist.length - 1
        ? (currentIndex -= 1)
        : (currentIndex = 0);
      this.setState({
        currentIndex,
      });
      this.loadAudio();
    }
  };

  handleNextTrack = async () => {
    let { playbackInstance, currentIndex } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < Playlist.length - 1
        ? (currentIndex += 1)
        : (currentIndex = 0);
      this.setState({
        currentIndex,
      });
      this.loadAudio();
    }
  };

  renderFileInfo() {
    const { playbackInstance, currentIndex } = this.state;
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {Playlist[currentIndex].title}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {Playlist[currentIndex].author}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {Playlist[currentIndex].source}
        </Text>
      </View>
    ) : null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.albumCover}
          source={{
            uri: "https://cdn.dribbble.com/users/1787323/screenshots/15491880/media/b7743c488f2f89dd461ad8955405fa29.png?compress=1&resize=1600x1200",
          }}
        />
        <Slider
          style={{ width: windowWidth * (6 / 7), height: 40 }}
          minimumValue={0}
          maximumValue={1}
        />
        {/* <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#03A89E"
          maximumTrackTintColor="#000000"
        /> */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePreviousTrack}
          >
            <Entypo name="controller-jump-to-start" size={48} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPause}
          >
            {this.state.isPlaying ? (
              <MaterialIcons name="pause" size={48} color="black" />
            ) : (
              <Entypo name="controller-play" size={48} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handleNextTrack}
          >
            <Entypo name="controller-next" size={48} color="black" />
          </TouchableOpacity>
        </View>
        {this.renderFileInfo()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  albumCover: {
    width: 250,
    height: 250,
  },
  trackInfo: {
    padding: 40,
    backgroundColor: "#fff",
  },
  trackInfoText: {
    textAlign: "center",
    flexWrap: "wrap",
  },
  largeText: {
    fontSize: 22,
  },
  smallText: {
    fontSize: 16,
  },
  control: {
    margin: 20,
  },
  controls: {
    flexDirection: "row",
  },
});
