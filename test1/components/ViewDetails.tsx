import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";

export const ViewDetails: (posterData: { posterData: any }) => void = ({ posterData }) => {

    return (
        <SafeAreaView style={styles.main_area}>

            <ScrollView style={styles.scrollView}>
                <View style={styles.inner_view}>

                    <View style={styles.image_container}>
                        <Image
                            style={styles.stretch_new}
                            source={{uri: posterData.posterUrl}}
                        />
                    </View>
                    <View style={styles.text_container}>

                        <View style={styles.line_dashed}>
                            <Text style={styles.bold_title}>{posterData.title}</Text>
                        </View>
                        <View style={styles.line_dashed}>
                            <Text style={styles.description_title}>Genres:</Text>
                            <Text style={styles.normal_title}>{posterData.genres.join(', ')}</Text>
                        </View>
                        <View style={styles.line_dashed}>
                            <Text style={styles.description_title}>Director:</Text>
                            <Text style={styles.normal_title}>{posterData.director}</Text>
                        </View>
                        <View style={styles.line_dashed}>
                            <Text style={styles.description_title}>Actors:</Text>
                            <Text style={styles.normal_title}>{posterData.actors}</Text>
                        </View>
                        <View style={styles.plot}>
                            <Text style={styles.normal_title}>{posterData.plot}</Text>
                        </View>

                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  text_inner: {
    fontSize: 24,
    color: '#000000',
  },
  text_arrange: {
    height: Dimensions.get('window').width/2,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner_container: {
    flexDirection: 'column'
  },
  loading_container: {
    backgroundColor: '#cccccc'
  },
  main_area: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  inner_view: {
    flexDirection: 'column'
  },
  image_container: {
    height: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plot: {
    flexDirection: 'row',
    padding: 5
  },
  description_title: {
    fontSize: 18,
    fontWeight: 'normal',
    marginRight: 10,
    width: 70
  },
  text_container: {
    flexDirection: 'column',
    backgroundColor: '#cccccc',
    marginTop: 5,
    paddingBottom: 50,
  },
  normal_title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'normal'
  },
  bold_title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold'
  },
  line_dashed: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderStyle: 'dashed'
  },
  stretch_new: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
  scrollView: {
    marginVertical: 0,
  },
});


