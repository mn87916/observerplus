import { createStackNavigator } from 'react-navigation-stack';
import About from '../src/components/about';

const components = {
    About: {
        screen: About,
        navigationOptions:{
            title:'About GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
}

const AboutStack = createStackNavigator(components,{
    defaultNavigationOptions:{
        //headerTintColor:'#444',標題顏色
        headerStyle:{backgroundColor:'#eee'}//height:100設定高度
    }
});

export default AboutStack;