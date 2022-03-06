/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import {LogBox} from 'react-native';
import App from './App';
import Info from './Info';

LogBox.ignoreAllLogs(true);
Navigation.registerComponent('test1.home', () => App);
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