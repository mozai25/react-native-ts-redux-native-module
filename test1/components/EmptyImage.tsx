import React, { Component} from 'react';
import {
    Image, StyleSheet,
} from 'react-native';

type Props = {
    url: String;
    style: any;
}

export default class EmptyImage extends Component<any, any> {

    constructor(props: Props) {
        super(props);

        this.state = {showDefault: true};
    }

    render() {
        const { url, style } = this.props;
        let image = this.state.showDefault ? require('../assets/images/loading-icon.gif') : this.props.url;
        let imageStyle = this.state.showDefault ? styles.loading_new : this.props.style;

        return (
            <Image
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