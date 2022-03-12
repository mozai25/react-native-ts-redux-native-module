/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import type from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    SectionList,
    Image,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    Button,
    Alert,
    FlatList,
} from 'react-native';

import EmptyImage from "../components/EmptyImage";
import {Poster} from "../model/Poster";
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessage} from '../redux/actions';
type Props = {}

class App extends React.Component<any, any> {

    public listItems: any[] = [];

    constructor(props: Props) {
        super(props);

        this.state = {
            data: [],
            refreshing: true,
        };
    }

    componentDidMount() {

        new Poster(null).getPosterData().then((data: Poster) => {
            const posters = data.adjustPosterData();
            this.setState({ data: posters, refreshing: false });
        }).catch((error) => {
            Alert.alert("Error", "Could not get source");
        });

    }

    TestItem = (info: any) => {

      return (
          <View style={styles.item}>
              <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {

                    Navigation.push(this.props.componentId, {
                      component: {
                        name: 'test1.info',
                        passProps: {
                          poster: info
                        },
                        options: {
                          topBar: {
                            title: {
                              text: 'Info Page'
                            }
                          }
                        }
                      }})
                  }} >
                  <View style={styles.item_container}>
                      <EmptyImage url={{uri: info.posterUrl}} style={styles.stretch_new} />
                  </View>
                  <View style={styles.text_item}>
                    <Text numberOfLines={1} style={styles.title}>{info.title}</Text>
                  </View>
              </TouchableOpacity>
          </View>
      );
    }

    render() {

       return (

            <SafeAreaView style={styles.top_container}>
              <SectionList
                contentContainerStyle={styles.contentContainerStyle}
                stickySectionHeadersEnabled={false}
                sections={this.state.data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => {
                   //return this.TestItem(item)
                   return null;
                }}
                renderSectionHeader={({ section }) => (
                    <View style={styles.section_title}>
                        <Text style={styles.header}>{section.title}</Text>
                        <FlatList
                            horizontal={true}
                            data={section.data}
                            renderItem={({ item }) => {
                                return this.TestItem(item);
                            }}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        title={"Loading..."}
                        titleColor={'#3a6b33'}
                        refreshing={this.state.refreshing}
                        enabled={this.state.refreshing}
                        progressViewOffset={10}
                        colors={['white']}
                        progressBackgroundColor={'#276e66'}
                        onRefresh={() => {

                        }}
                    />
                }
              />
            </SafeAreaView>
      );
    }
}
const mapStateToProps = (state: any) => {
    const {messages} = state;
    return {messages};
};
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ addMessage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  text_item: {
    flexDirection: 'row',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'green',
  },
  item_container: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section_title: {
    flexDirection: 'column',
    marginBottom: 5,
    width: '100%'
  },
  top_container: {
    backgroundColor: '#cccccc',
    flex: 1,
  },
  contentContainerStyle: {
     flexDirection: 'column',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  header: {
    borderWidth: 0,
    borderColor: 'red',
    fontSize: 28,
    backgroundColor: "#fff",
    width: '100%',
    textAlign: 'center',
  },
  title: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    borderColor: 'red',
    borderWidth: 0,
    flexWrap: 'wrap',
  },
  item: {
    //flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ffffff',
    marginTop: 2,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
    height: 200,
    width: 140,
  },
  stretch_new: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
  },
});

