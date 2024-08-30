import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";

export default function modal() {
  const params = useLocalSearchParams();
  const [pokemons, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPokemon = async () => {
    try {
      const res = await fetch(params.url);
      const data = await res.json();
      setPokemon(data.abilities[0].ability.name);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <ThemedView style={styles.modalContainer}>
      <ThemedText>{pokemons}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
