import { createStackNavigator } from 'react-navigation-stack';
import Announce from '../src/components/Announce/Announce';
import Article from '../src/components/Announce/Article';
import SignIn from '../src/components/SignIn';
import Main from '../src/components/Main';
import GoodWork from '../src/components/GoodWork/GoodWork';
import PSInformation from '../src/components/PSInformation/PSInformation';
import Account from '../src/components/AccManage/Account';
import Rank from '../src/components/Rank/Rank';
import Map from '../src/components/Map/Map';
import CommonRead from '../src/components/CommonRead/CommonRead';
import LearningFile from '../src/components/LearningFile/LearningFile';
import Task from '../src/components/Task/Task';
import Measure from '../src/components/Measure/Measure';
import ExamA from '../src/components/Task/ExamA';
import ExamB from '../src/components/Task/ExamB';
import ExamC from '../src/components/Task/ExamC';
import Menu2 from '../src/components/Menu2';
import Record from '../src/components/Recording/Record';
import Recordtable from '../src/components/Recording/Recordtable';
import MeasureRecord from '../src/components/Measure/MeasureRecord';
import MeasurePhotoConfirm from '../src/components/Measure/MeasurePhotoConfirm';
import Gallery from '../src/components/Gallery/Gallery';
import Data_record from '../src/components/Gallery/Data_record';
import GW_date from '../src/components/GoodWork/GW_date';
import SearchMap from '../src/components/Map/SearchMap';
const components = {
        SignIn: {
        screen: SignIn,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },

     Announce: {
        screen: Announce,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    Article:{
        screen: Article,
        navigationOptions:{
            header: null,
            title:'GodZen Crazy',
        }
    },
     Main: {
        screen: Main,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',    
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    PSInformation: {
        screen: PSInformation,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    Account: {
        screen: Account,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    Rank: {
        screen: Rank,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    Map: {
        screen: Map ,
        navigationOptions:{
            header: null,
            title:'Map',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    CommonRead: {
        screen: CommonRead,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    LearningFile: {
        screen: LearningFile,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    Task: {
        screen: Task,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    ExamA: {
        screen: ExamA,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    ExamB: {
        screen: ExamB,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    ExamC: {
        screen: ExamC,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    Measure: {
        screen: Measure,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    Measure: {
        screen: Measure,
        navigationOptions:{
            header: null,
            title:'GodZen Rock',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    GoodWork:{
        screen: GoodWork,
        navigationOptions:{
            header: null,
            title:'GodZen Crazy',
           // headerStyle:{backgroundColor:'#eee'}
        }
    },
    Menu2: {
        screen: Menu2,
        navigationOptions:{
            header: null,
            title:'Menu2',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    Record: {
        screen: Record,
        navigationOptions:{
            header: null,
            title:'Record',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    Recordtable: {
        screen: Recordtable,
        navigationOptions:{
            header: null,
            title:'Recordtable',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    MeasureRecord: {
        screen: MeasureRecord,
        navigationOptions:{
            header: null,
            title:'MeasureRecord',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    MeasurePhotoConfirm: {
        screen: MeasurePhotoConfirm,
        navigationOptions:{
            header: null,
            title:'MeasurePhotoConfirm',
            //headerStyle:{backgroundColor:'#eee'}
        }
    },
    Gallery: {
        screen: Gallery,
        navigationOptions:{
            header: null,
            title:'Gallery',
            
        }
    },
    Data_record: {
        screen: Data_record,
        navigationOptions:{
            header: null,
            title:'Data_record',
            
        }
    },
    GW_date: {
        screen: GW_date,
        navigationOptions:{
            header: null,
            title:'GW_date',
            
        }
    },
        SearchMap: {
        screen: SearchMap,
        navigationOptions:{
            header: null,
            title:'SearchMap',
            
        }
    },
}

const HomeStack = createStackNavigator(components,{
    defaultNavigationOptions:{
        //headerTintColor:'#444',標題顏色
        headerStyle:{backgroundColor:'#eee'}//height:100設定高度
    }
});


export default HomeStack;