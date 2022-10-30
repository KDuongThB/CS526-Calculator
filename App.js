/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-eval */
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

var list = [];
const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState([]);

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
    let str_store = '';
    for (let i = 0; i < t.length; i++) {
      str_store += t[i];

      str_calculate += t[i];
    }

    if (isEvalable(str_calculate)) {
      let evaled_str_calculate = eval(str_calculate);
      if (evaled_str_calculate == 'Infinity') {
        return 'INFINITY';
      } else if (isNumber(evaled_str_calculate)) {
        list.push(str_store + '=' + evaled_str_calculate);
        var his = history;
        his.push({
          id: 'history-item' + his.length,
          expression: str_calculate,
          result: evaled_str_calculate,
        });
        setHistory(his);
        setSearch( [...new Set(his) ]);
        return evaled_str_calculate;
      } else {
        return 'SYNTAX ERROR';
      }
    } else {
      return 'SYNTAX ERROR';
    }
  }

  const showSearchResultItem = item => {
    return (
      <View
        style={{
          backgroundColor: '#4d4d4e',
          width: '100%',
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 30, color: 'red'}}>
          {item.item.expression} ={' '}
        </Text>
        <Text style={{fontSize: 30, color: '#FF7400'}}>{item.item.result}</Text>
      </View>
    );
  };

  let operator = ['+', '-', '*', '/', '%'];
  let res = ['='];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyButton}>
        <Button title="History" onPress={() => ''} color="#3BBD00" />
      </View>

      <Text style={styles.dislayResult}>{result}</Text>

      <TextInput
        placeholder="0"
        style={[styles.dislay]}
        keyboardType="numeric"
        onChangeText={newInput => {
          setInput(newInput);
          setResult();
        }}
        defaultValue={input}
        onSubmitEditing={() => setResult(calculator(list, input))}
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

      <FlatList
        data={search}
        renderItem={showSearchResultItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  dislay: {
    height: 150,
    fontSize: 40,
    textAlign: 'right',
    textAlignVertical: 'bottom',
    backgroundColor: '#C5C4C4',
  },

  dislayResult: {
    height: 100,
    fontSize: 50,
    textAlign: 'right',
    textAlignVertical: 'center',
    backgroundColor: '#C5C4C4',
  },

  historyButton: {
    width: 100,
    height: 40,
    //backgroundColor: CUSTOM_COLOR.Vermilion,
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
    //fontWeight: '500',
    color: 'white',
    //textAlign: 'center',
    //alignSelf: 'stretch',
    position: 'absolute',
    //backgroundColor: CUSTOM_COLOR.Black,
  },
});
