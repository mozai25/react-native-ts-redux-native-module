import React, { Component} from 'react';
import {
    StyleSheet, Animated
} from 'react-native';

type Props = {
    url: String;
    style: any;
}

export default class EmptyImage extends Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {showDefault: true};
    }

    render() {

        let image = this.state.showDefault ? require('../assets/images/loading-icon.gif') : {uri: this.props.url};
        let imageStyle = this.state.showDefault ? styles.loading_new : this.props.style;

        return (
            <Animated.Image
                style={imageStyle}
                source={image}
                onLoadEnd={() => this.setState({showDefault: false})}
            />
        );
    }
}

const styles = StyleSheet.create({
    loading_new: {
        marginTop: 40,
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
});