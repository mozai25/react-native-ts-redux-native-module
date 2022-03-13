import React from 'react';
import {Animated, Easing, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

import EmptyImage from "../components/EmptyImage";
import {ClickFunc} from '../model/Interfaces';

type ItemProps = {
    info: any,
    callback: (i: ClickFunc)=>{},
}

export class TestItem extends React.Component<any, any> {

    public targetRotateSmall: any;

    constructor(props: ItemProps) {
        super(props);
        this.targetRotateSmall = new Animated.Value(0);

    }

    render() {

        return (

            <View style={styles.item}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        Animated.timing(this.targetRotateSmall, {toValue: 720, duration: 500, easing: Easing.bounce, useNativeDriver: true}).start(() => {
                            this.targetRotateSmall.setValue(0);
                            if(this.props.callback != undefined) {
                                const i:ClickFunc = {
                                    done: true
                                }
                                this.props.callback(i);
                            }
                        });
                    }} >
                    <View style={styles.item_container}>
                        <EmptyImage url={this.props.info.posterUrl} style={{
                            width: 170,
                            height: 170,
                            resizeMode: 'contain',
                            transform: [
                            {
                                rotateY: this.targetRotateSmall.interpolate({
                                    inputRange: [0, 360],
                                    outputRange: ['0deg', '360deg'],
                                })
                            }]
                        }} />
                    </View>
                    <View style={styles.text_item}>
                        <Text numberOfLines={1} style={styles.title}>{this.props.info.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>

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
    }
});