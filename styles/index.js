import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native";

const styles = StyleSheet.create({
  headerUpper: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#243F59",
    opacity: 0.9,
    alignItems: "flex-start",
    paddingHorizontal: 20,
    elevation: 20,
    shadowColor: "#fff",
    justifyContent: "center",
  },
  darkHeaderUpper: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: 0.92,
    alignItems: "flex-start",
    paddingHorizontal: 20,

    shadowColor: "#fff",
    justifyContent: "center",
  },

  headerImage: { top: 0, width: "100%", height: 200 },
  formContainer: { padding: 20, height: "100%" },
  formIndividualContainer: { position: "relative" },
  individualInputFieldText: {
    position: "absolute",
    left: 10,
    top: -10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    zIndex: 1,
    color: "#243F59",
  },
  darkIndividualInputFieldText: {
    position: "absolute",
    left: 10,
    top: -10,
    paddingHorizontal: 12,
    backgroundColor: "#000",
    zIndex: 1,
    color: "#fff",
  },
  textInput: {
    marginBottom: 25,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderColor: "#243F59",
    color: "grey",
  },

  formBtn: {
    backgroundColor: "#C5D877",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  formBtnLink: {
    color: "#243F59",
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 1.2,
    borderRadius: 4,
  },
  uploadFormBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#243F59",
    width: 150,
    borderRadius: 50,
    marginBottom: 20,
  },
  uploadFormBtnText: {
    textAlign: "center",
    color: "#fff",
  },
  footerIcon: {
    color: "#fff",
  },
  activeFooterIcon: {
    color: "#C5D877",
  },
  attendenceText: {
    paddingVertical: 4,
    borderRadius: 50,
    fontSize: 18,
    paddingHorizontal: 10,
    elevation: 1,
    marginRight: 10,
  },
  individualEmployeeHeading: {
    marginTop: 20,
  },
  individualEmployeeHeadingText: {
    fontFamily: "MontserratRegular",
    borderBottomWidth: 1,
    fontSize: 18,
    textTransform: "uppercase",
    padding: 10,
  },
  individualEmployeeSlide: {},
});

export default styles;
