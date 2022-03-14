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
    Animated,
    Easing,
    NativeModules,
    NativeEventEmitter, EmitterSubscription
} from 'react-native';

import {ClickFunc, HelloInterfaceFromAndroid} from '../model/Interfaces';
import EmptyImage from "../components/EmptyImage";
import {TestItem} from "../components/TestItem";
import {Poster} from "../model/Poster";
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessage} from '../redux/actions';

const HelloFromAndroid = NativeModules.HelloFromAndroid;
const helloEmitter = new NativeEventEmitter(HelloFromAndroid);

const testEventName = "SendHelloEvent";
type Props = {}
class App extends React.Component<any, any> {

    public listItems: any[] = [];
    public testEvent: EmitterSubscription | undefined;

    constructor(props: Props) {
        super(props);

        this.state = {
            data: [],
            refreshing: true,
        };

        //catch event
        this.testEvent = helloEmitter.addListener(testEventName,
            (data: HelloInterfaceFromAndroid) => {
                Alert.alert("Hello!", data[0].action);
            },
        );
    }

    componentDidMount() {

        //call method
        HelloFromAndroid.HelloMethod();

        new Poster(null).getPosterData().then((data: Poster) => {
            const posters = data.adjustPosterData();
            this.setState({ data: posters, refreshing: false });

        }).catch((error) => {
            Alert.alert("Error", "Could not get source");
        });

    }

    componentWillUnmount() {

        if(this.testEvent != undefined) this.testEvent.remove();

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
                                return <TestItem info={item} callback={(check: ClickFunc)=>{

                                    if (check.done) {
                                        Navigation.push(this.props.componentId, {
                                            component: {
                                                name: 'test1.info',
                                                passProps: {
                                                    poster: item
                                                },
                                                options: {
                                                    topBar: {
                                                        title: {
                                                            text: 'Info Page'
                                                        }
                                                    }
                                                }
                                            }})
                                    }

                                }}></TestItem>;
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
  stretch_new: {

  },
});

