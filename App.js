import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

const App = () => {
  const [combatScore, setCombatScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [playerColorIndex, setPlayerColorIndex] = useState(0);

  const colors = ["white", "blue", "red", "orange", "green", "blue", "purple"];

  return (
    <>
      <StatusBar barStyle={(colors[playerColorIndex] == "white") ? "dark-content" : "light-content"} />
      <View
        style={[
          styles.container,
          { backgroundColor: colors[playerColorIndex] }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.controls}>
            <TouchableOpacity 
              onPress = {
                () => {
                  if (playerColorIndex == colors.length - 1) { setPlayerColorIndex(0); return; }
                  setPlayerColorIndex(playerColorIndex + 1);
                }
              }
              style={[
                styles.colorControl, 
                { backgroundColor: colors[playerColorIndex] }
              ]}
            />
          </View>
          <Text 
            style={[
              styles.title,
              { color: (colors[playerColorIndex] == "white") ? "black" : "white" }
            ]}
          >
            Munchkin Combat Score
          </Text>
          <View style={styles.scoreContainer}>
            <Text 
              style={[
                styles.score,
                { color: (colors[playerColorIndex] == "white") ? "black" : "white" }
              ]}
            >
              {combatScore}
            </Text>
          </View>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Level</Text>
              <Text style={styles.inputScore}>{level}</Text>
            <View style={styles.inputControls}>
              <TouchableOpacity 
                onPress= {
                  () => {
                    if (level == 0) { return }
                    const l = level - 1;
                    setLevel(l);
                    setCombatScore(l + bonus)
                  }
                }
                style={styles.decrement}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress= {
                  () => {
                    const l = level + 1;
                    setLevel(l);
                    setCombatScore(l + bonus);
                  }
                }
                style={styles.increment}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Bonus</Text>
              <Text style={styles.inputScore}>{bonus}</Text>
            <View style={styles.inputControls}>
              <TouchableOpacity
                onPress= {
                  () => {
                    const b = bonus - 1;
                    setBonus(b);
                    setCombatScore(b + level);
                  }
                }
                style={styles.decrement}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress= {
                  () => {
                    const b = bonus + 1 ;
                    setBonus(b);
                    setCombatScore(b + level);
                  }
                }
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
