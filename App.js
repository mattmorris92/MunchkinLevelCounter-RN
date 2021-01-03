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

const INCREMENT_LEVEL = 'INCREMENT_LEVEL';
const DECREMENT_LEVEL = 'DECREMENT_LEVEL';
const INCREMENT_BONUS = 'INCREMENT_BONUS';
const DECREMENT_BONUS = 'DECREMENT_BONUS';
const TOGGLE_COLOR = 'TOGGLE_COLOR';

function reducer(state, action) {
  switch (action.type) {
    case INCREMENT_LEVEL:
      return {
        ...state,
        combatScore: state.level + 1 + state.bonus,
        level: state.level + 1
      };
    case DECREMENT_LEVEL:
      if (state.level == 0) { return state; }
      return {
        ...state,
        combatScore: state.level - 1 + state.bonus,
        level: state.level - 1
      };
    case INCREMENT_BONUS:
      return {
        ...state,
        combatScore: state.bonus + 1 + state.level,
        bonus: state.bonus + 1
      };
    case DECREMENT_BONUS:
      return {
        ...state,
        combatScore: state.bonus - 1 + state.level,
        bonus: state.bonus - 1
      };
    case TOGGLE_COLOR:
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
              onPress= {() => dispatch({type: TOGGLE_COLOR})}
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
          <Counter state={state} dispatch={dispatch} title="Level" incrementType={INCREMENT_LEVEL} decrementType={DECREMENT_LEVEL}/>
          <Counter state={state} dispatch={dispatch} title="Bonus" incrementType={INCREMENT_BONUS} decrementType={DECREMENT_BONUS}/>
        </View>
      </View>
    </>
  );
};

const Counter = ({state, dispatch, title, incrementType, decrementType}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{title}</Text>
        <Text style={styles.inputScore}>{(title == "Level") ? state.level : state.bonus}</Text>
      <View style={styles.inputControls}>
        <TouchableOpacity 
          onPress= {() => dispatch({type: decrementType})}
          style={styles.decrement}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress= {() => dispatch({type: incrementType})}
          style={styles.increment}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
