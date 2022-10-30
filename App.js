import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
// import Calculator from './screens/Calculator';
// import History from './screens/History';

const Stack = createNativeStackNavigator();

const App = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState([]);

  var list = [];
  const showSearchResultItem = item => {
    return (
      <View
        style={{
          marginTop: 30,
          marginLeft: 30,
          marginRight: 30,
          backgroundColor: '#953AA6',
          flexDirection: 'row',
          borderRadius: 30,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 30, color: '#57FEFF'}}>
          {item.item.expression} ={' '}
        </Text>
        <Text style={{fontSize: 30, color: '#FFEA57'}}>{item.item.result}</Text>
      </View>
    );
  };
  //const [history, setHistory] = useState([]);
  const Calculator = props => {
    const {navigation} = props;

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    function isEvalable(text) {
      try {
        eval(text);
        return true;
      } catch {
        return false;
      }
    }

    function isNumber(n) {
      if (n - n == 0) {
        return true;
      } else {
        return false;
      }
    }

    function ConvertTextToArray(text) {
      let t = [];
      let i = 0;
      let operators = ['+', '-', '*', '/', '%', '.', '(', ')', '[', ']'];
      while (i < text.length) {
        if (
          (text[i] >= '0' && text[i] <= '9') ||
          operators.indexOf(text[i]) >= 0
        ) {
          t.push(text[i]);
          i++;
        } else {
          if (text[i] == ' ') {
            i++;
          } else {
            return [];
          }
        }
      }
      return t;
    }

    function calculator(list, text) {
      let t = ConvertTextToArray(text);
      // if (t.length == 0) {
      //   return 'SYNTAX ERROR';
      // }
      let str_calculate = '';
      //let str_store = '';
      for (let i = 0; i < t.length; i++) {
        //str_store += t[i];

        str_calculate += t[i];
      }

      if (isEvalable(str_calculate)) {
        let evaled_str_calculate = eval(str_calculate);
        if (evaled_str_calculate == 'Infinity') {
          return 'INFINITY';
        } else if (isNumber(evaled_str_calculate)) {
          //list.push(str_store + '=' + evaled_str_calculate);
          var his = history;

          his.push({
            id: 'history-item' + his.length,
            expression: str_calculate,
            result: evaled_str_calculate,
          });
          setHistory(his);
          setSearch(his);
          return evaled_str_calculate;
        } else {
          return 'SYNTAX ERROR';
        }
      } else {
        return 'SYNTAX ERROR';
      }
    }

    let operator = ['+', '-', '*', '/', '%'];
    let res = ['='];

    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.historyButton]}>
          <Button
            title="History"
            onPress={() => navigation.navigate('History')}
            color="#3BBD00"
          />
        </View>

        <Text style={styles.dislayResult}>{result}</Text>

        <TextInput
          color="#ffffff"
          placeholder="0"
          style={[styles.dislay]}
          keyboardType="numeric"
          onChangeText={newInput => {
            setInput(newInput);
            setResult();
          }}
          defaultValue={input}
          onSubmitEditing={() => setResult(calculator(list, input))}

          //newResults={() => setResults(calculator(list, result))}
        />

        <View style={styles.row}>
          {operator.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => setInput(input + item)}
              style={styles.buttonBackground}>
              <Text style={styles.buttonOperator}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.equal}>
          <TouchableOpacity
            defaultValue={input}
            //onSubmitEditing={() => setResult(calculator(list, input))}
            onPress={() => setResult(calculator(list, input))}
            //onPress={() => setResults(calculator(list, results))}
            style={styles.equalBackground}>
            <Text style={styles.buttonOperator}>{res}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const History = props => {
    const {navigation} = props;

    return (
      <SafeAreaView style={styles.container}>
        {/* <Text style={[styles.searchTitle]}>History</Text> */}
        <View style={[styles.historyButton]}>
          <View style={[styles.backButton]}>
            <Button
              title="Back"
              onPress={() => navigation.goBack()}
              color="#3BBD00"
            />
          </View>
        </View>
        <Text style={[styles.title]}>History</Text>
        <TextInput
          style={styles.searchBg}
          placeholder="Search"
          onChangeText={inputSearch => {
            var x = history.filter((value, index, arr) => {
              return (
                value.expression.includes(inputSearch) ||
                value.result.toString().includes(inputSearch)
              );
            });
            //console.log(x);
            setSearch(x);
          }}
        />

        <FlatList
          data={search}
          renderItem={showSearchResultItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Calculator'}>
        <Stack.Screen name={'Calculator'} component={Calculator} />
        <Stack.Screen name={'History'} component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282f3b',
  },

  dislay: {
    height: 150,
    fontSize: 40,
    textAlign: 'right',
    textAlignVertical: 'bottom',
    //backgroundColor: '#C5C4C4',
  },

  dislayResult: {
    height: 100,
    fontSize: 70,
    textAlign: 'right',
    textAlignVertical: 'center',
    color: '#ffffff',
    //backgroundColor: '#C5C4C4',
  },

  historyButton: {
    width: 100,
    height: 40,
    padding: 2,
  },

  row: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  equal: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  equalBackground: {
    width: 150,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#C5C4C4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonBackground: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#C5C4C4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonOperator: {
    fontSize: 40,
    color: 'white',
    position: 'absolute',
    //backgroundColor: CUSTOM_COLOR.Black,
  },

  backButton: {
    width: 100,
    height: 40,
  },

  searchBg: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 25,
    fontSize: 30,
    alignItems: 'center',
    // alignSelf: 'center',
    justifyContent: 'center',
    // backgroundColor: '#3f4d5b',
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 60,
    alignSelf: 'center',
    color: '#ffffff',
    //backgroundColor: '#C5C4C4',
  },

  back: {
    // marginTop: 50,
    // marginLeft: 50,
    fontSize: 30,
    borderRadius: 25,
    backgroundColor: '#C5C4C4',
  },
});
