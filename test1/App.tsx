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
} from 'react-native';

import { Navigation } from 'react-native-navigation';
type Props = {}

export default class App extends React.Component<any, any> {

    public listItems: any[] = [];

    constructor(props: Props) {
        super(props);

        this.state = {
            data: [],
            refreshing: true,
        };
    }

    componentDidMount() {

        //get data
        fetch("https://raw.githubusercontent.com/24i/smartapps-test/main/data.json")
        .then(response => {
            return response.json();
        })
        .then(response => {

            if (response.carousels.length > 0) {
                response.carousels.map((item: { title: String; items: [] }, index: any) => {
                    let i = {
                        title: item.title,
                        data: item.items
                    }
                    this.listItems.push(i);
                })
                this.setState({ data: this.listItems, refreshing: false });
            }

        }).catch((error) => {
            console.error(error);
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
                    <Image
                      style={styles.stretch_new}
                      source={{uri: info.posterUrl}}
                    />
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
            stickySectionHeadersEnabled={true}
            sections={this.state.data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => this.TestItem(item)}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.section_title}><Text numberOfLines={1} style={styles.header}>{title}</Text></View>
            )}
            refreshControl={
                <RefreshControl
                    //refresh control used for the Pull to Refresh
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
    flexDirection: 'row',
    marginBottom: 5,
    width: Dimensions.get('window').width
  },
  top_container: {
    backgroundColor: '#cccccc'
  },
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    flexDirection: 'row',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    borderColor: 'red',
    borderWidth: 0,
  },
  item: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ffffff',
    marginTop: 2,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
  },
  stretch_new: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

