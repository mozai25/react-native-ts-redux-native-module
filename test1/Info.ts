/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ViewDetails} from './components/ViewDetails';

type Props = {}

export default class Info extends React.Component<any, any> {

    constructor(props : Props) {
      super(props);
    }

    componentDidMount() {

    }

    // @ts-ignore
    render():ViewDetails {
        return ViewDetails({posterData: this.props.poster});
    }
}

