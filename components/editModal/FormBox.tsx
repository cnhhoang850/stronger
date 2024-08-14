import { StyleSheet, View } from "react-native";
import getWorkoutTimeCategory from "@/utils/getDayPeriod";
import formatDate from "@/utils/dateToStr";
import formatDuration from "@/utils/secToStr";
import { Card as PaperCard, Button as PaperButton } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";

type field = {
  title: string;
  value: string;
  type: string;
};

type FormBoxProps = {
  fields: field[];
};

export default function FormBox({ fields }: FormBoxProps) {
  return (
    <PaperCard mode="contained" style={styles.cardContainer}>
      {fields.map((field, index) => (
        <View
          key={index}
          style={{
            ...styles.cardRow,
            borderBottomWidth: index === fields.length - 1 ? 0 : 1,
          }}
        >
          <ThemedText type="menu">{field.title}</ThemedText>
          <ThemedText type="default">{field.value}</ThemedText>
        </View>
      ))}
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 2,
    paddingRight: 0,
    paddingLeft: 12,
    marginBottom: 26,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 32,
  },
  cardRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 44,
    lineHeight: 16,
    padding: 8,
    paddingLeft: 0,
    margin: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#d3d3d3",
    alignContent: "center",
  },
});
