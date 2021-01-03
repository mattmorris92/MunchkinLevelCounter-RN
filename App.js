import React, { useReducer, useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

const colors = ["white", "blue", "red", "orange", "green", "blue", "purple"];

const initialState = {
  combatScore: 0,
  level: 0,
  bonus: 0,
  playerColorIndex: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'incrementLevel':
      return {
        ...state,
        combatScore: state.level + 1 + state.bonus,
        level: state.level + 1
      };
    case 'decrementLevel':
      if (state.level == 0) { return state; }
      return {
        ...state,
        combatScore: state.level - 1 + state.bonus,
        level: state.level - 1
      };
    case 'incrementBonus':
      return {
        ...state,
        combatScore: state.bonus + 1 + state.level,
        bonus: state.bonus + 1
      };
    case 'decrementBonus':
      return {
        ...state,
        combatScore: state.bonus - 1 + state.level,
        bonus: state.bonus - 1
      };
    case 'toggleColor':
      return {
        ...state,
        playerColorIndex: (state.playerColorIndex == colors.length - 1) ? 0 : state.playerColorIndex + 1
      }
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <StatusBar barStyle={(colors[state.playerColorIndex] == "white") ? "dark-content" : "light-content"} />
      <View
        style={[
          styles.container,
          { backgroundColor: colors[state.playerColorIndex] }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.controls}>
            <TouchableOpacity 
              onPress= {() => dispatch({type: 'toggleColor'})}
              style={[
                styles.colorControl, 
                { backgroundColor: colors[state.playerColorIndex] }
              ]}
            />
          </View>
          <Text 
            style={[
              styles.title,
              { color: (colors[state.playerColorIndex] == "white") ? "black" : "white" }
            ]}
          >
            Munchkin Combat Score
          </Text>
          <View style={styles.scoreContainer}>
            <Text 
              style={[
                styles.score,
                { color: (colors[state.playerColorIndex] == "white") ? "black" : "white" }
              ]}
            >
              {state.combatScore}
            </Text>
          </View>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Level</Text>
              <Text style={styles.inputScore}>{state.level}</Text>
            <View style={styles.inputControls}>
              <TouchableOpacity 
                onPress= {() => dispatch({type: 'decrementLevel'})}
                style={styles.decrement}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress= {() => dispatch({type: 'incrementLevel'})}
                style={styles.increment}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Bonus</Text>
              <Text style={styles.inputScore}>{state.bonus}</Text>
            <View style={styles.inputControls}>
              <TouchableOpacity
                onPress= {() => dispatch({type: 'decrementBonus'})}
                style={styles.decrement}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress= {() => dispatch({type: 'incrementBonus'})}
                style={styles.increment}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    height: "100%"
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: 'stretch',
  },
  controls: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: 'stretch',
    paddingVertical: 30,
  },
  colorControl: {
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8
  },
  title: {
    fontSize: 24,
    fontWeight: "900"
  },
  scoreContainer: {
    padding: 54
  },
  score: {
    fontSize: 100,
    fontWeight: "900"
  },
  inputs: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: 'stretch'
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ccc",
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 8,
    marginTop: 20
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "400"
  },
  inputScore: {
    fontSize: 32,
    fontWeight: "900"
  },
  inputControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'stretch',
  },
  decrement: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  increment: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff"
  }
});

export default App;
