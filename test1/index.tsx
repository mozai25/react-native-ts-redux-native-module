/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import {LogBox} from 'react-native';
import App from './App';
import Info from './Info';

import {Provider} from 'react-redux';
import {createStore, Store} from 'redux';
import messagesReducer from './redux/reducers';
import {
  addMessage,
} from './redux/actions';

const store: Store = createStore(messagesReducer);

LogBox.ignoreAllLogs(true);

Navigation.registerComponent('test1.home', () => props => (
    <Provider store={store}>
        <App {...props} />
    </Provider>
), () => App);

Navigation.registerComponent('test1.info', () => Info);

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'test1.home',
               options: {
                   topBar: {
                     title: {
                       text: 'Home Page',
                     },
                   },
                 },
             },
           }
         ]
       }
     }
  });
});