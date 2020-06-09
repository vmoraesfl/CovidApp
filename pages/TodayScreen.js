import React, { Component, useEffect, useState, useRef } from "react";
import axios from "axios";
import Moment from "moment";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Picker,
  Modal,
  FlatList,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Calendar } from "react-native-calendars";
import { Block, Button, TextView } from "../components";
import { Colors } from "../components/color";
import Feather from "react-native-vector-icons/Feather";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { setProvidesAudioData } from "expo/build/AR";
import GoalInput from "./StatesModal";
import ModalDropdown from "react-native-modal-dropdown";
import "moment/locale/pt-br";

const myHtmlFile = require("./localsite.html");

const W = Dimensions.get("window").width;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 300,
  },
  doctor: {
    position: "absolute",
    top: 100,
    left: 60,
    /* width: 50,
    height: 80, */
  },
  wrapperImage: {
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    width: W,
    height: 300,
  },
  bg: {
    position: "absolute",
    width: 1000,
    height: 1000,
    top: -(930 - W / 2),
    alignSelf: "center",
    //top: 500 - W / 2,
    //left: 500 - W / 2,
    borderRadius: 1000,
    overflow: "hidden",
  },
  containerHeader: {
    position: "relative",
  },
  map: {
    borderRadius: 8,
    marginTop: 15,
    padding: 15,
    overflow: "hidden",
  },
});

function Handler(num) {
  if (num > 100000) return Math.floor(num / 1000) + "k";
  else if (num > 1000) return Math.round(num / 100) / 10 + "k";
  else if (num <= 15 && num != 0) return num + "%";
  else if (num === 0) return 0;
  else return num;
}

const ItemDot = ({ color1, color2, num, title }) => {
  return (
    <Block block>
      <Block style={{ marginTop: 5 }} middle>
        <Block
          width={30}
          height={30}
          middle
          centered
          borderRadius={30}
          color={color1}
        >
          <Block
            width={20}
            height={20}
            borderWidth={4}
            borderRadius={20}
            borderColor={color2}
          />
        </Block>
        <TextView style={{ marginTop: 5 }} padding={5} color={color2} h3>
          {Handler(num)}
        </TextView>
        <TextView style={{ marginTop: 5 }} color="gray" center h6>
          {title}
        </TextView>
      </Block>
    </Block>
  );
};

const ConverterEstados = function (val) {
  var data;

  switch (val.toUpperCase()) {
    case "AC":
      data = "Acre";
      break;
    case "AL":
      data = "Alagoas";
      break;
    case "AM":
      data = "Amazonas";
      break;
    case "AP":
      data = "Amapá";
      break;
    case "BA":
      data = "Bahia";
      break;
    case "CE":
      data = "Ceará";
      break;
    case "DF":
      data = "Distrito Federal";
      break;
    case "ES":
      data = "Espírito Santo";
      break;
    case "GO":
      data = "Goiás";
      break;
    case "MA":
      data = "Maranhão";
      break;
    case "MG":
      data = "Minas Gerais";
      break;
    case "MS":
      data = "Mato Grosso do Sul";
      break;
    case "MT":
      data = "Mato Grosso";
      break;
    case "PA":
      data = "Pará";
      break;
    case "PB":
      data = "Paraíba";
      break;
    case "PE":
      data = "Pernambuco";
      break;
    case "PI":
      data = "Piauí";
      break;
    case "PR":
      data = "Paraná";
      break;
    case "RJ":
      data = "Rio de Janeiro";
      break;
    case "RN":
      data = "Rio Grande do Norte";
      break;
    case "RO":
      data = "Rondônia";
      break;
    case "RR":
      data = "Roraima";
      break;
    case "RS":
      data = "Rio Grande do Sul";
      break;
    case "SC":
      data = "Santa Catarina";
      break;
    case "SE":
      data = "Sergipe";
      break;
    case "SP":
      data = "São Paulo";
      break;
    case "TO":
      data = "Tocantins";
      break;
    case "BR":
      data = "Brasil";
      break;
  }

  return data;
};

const TodayScreen = ({ navigation }) => {
  const [data, setData] = useState({ hits: [] });
  const [dataInfectedByRegion, setdataInfectedByRegion] = useState({
    hits: [],
  });
  const [dataDeceasedByRegion, setdataDeceasedByRegion] = useState({
    hits: [],
  });

  const [isAddMode, setIsAddMode] = useState(false);

  const [chevron, setChevron] = useState("chevron-right");

  const [id, setID] = useState(0);

  const [estados, setLista] = useState(["Brasil"]);

  const estadoDropdown = useRef(null);

  function idHandlerInfected(id) {
    if (id == 0) return data.infected;
    else {
      return dataInfectedByRegion.count;
    }
  }
  function idHandlerDeceased(id) {
    if (id == 0) return data.deceased;
    else {
      return dataDeceasedByRegion.count;
    }
  }
  StatusBar.setHidden(false);
  StatusBar.setBarStyle("dark-content");
  StatusBar.setBackgroundColor("#f0f0f0");
  Moment.locale("pt-br");
  useEffect(() => {
    const url =
      "https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true";
    async function fetchData() {
      try {
        if (isAddMode) {
          setChevron("chevron-down");
          estadoDropdown.current.show();
        }
        const response = await axios(url);
        setData(response.data);
        const responseInfectedByRegion =
          (response.data &&
            response.data.infectedByRegion &&
            response.data.infectedByRegion[id - 1]) ||
          "";
        setdataInfectedByRegion(responseInfectedByRegion);
        const responseDeceasedByRegion =
          (response.data &&
            response.data.deceasedByRegion &&
            response.data.deceasedByRegion[id - 1]) ||
          "";

        const estadosnames = ["BR"];
        const responseStates =
          (response.data && response.data.deceasedByRegion) || "";
        for (let i = 0; i < responseStates.length; i += 1) {
          estadosnames.push(responseStates[i].state);
        }
        // console.log("en", estadosnames);

        const ufs = estadosnames.map(ConverterEstados);
        setLista(ufs);

        setdataDeceasedByRegion(responseDeceasedByRegion);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id, isAddMode]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Block block color="#f1f1f1">
        <Block height={300} color={Colors.blue} style={styles.bg}>
          <Block style={styles.wrapperImage}>
            <Image
              style={styles.doctor}
              source={require("../assets/Drcorona.png")}
            />
          </Block>
        </Block>
        <Block height={280} style={styles.containerHeader}>
          <Image
            style={styles.img}
            source={require("../assets/virus.png")}
          ></Image>
        </Block>
        <Block padding={10}>
          <Block padding={10} style={{ marginTop: 10 }}>
            <Block justifyContent="space-between" direction="row">
              <Block>
                <TextView h5>COVID-19</TextView>
                <TextView style={{ marginTop: 5, color: "gray" }}>
                  {"Atualizado em: " +
                    Moment(data.lastUpdatedAtSource).format("LL")}
                </TextView>
              </Block>
              <Button
                style={{ marginTop: 8 }}
                textColor={Colors.blue1}
                onPress={() => navigation.navigate("Details")}
              >
                Saiba mais
              </Button>
            </Block>
          </Block>
          <Block shadow style={{ marginTop: 15 }}>
            <Button
              color="#fff"
              borderWidth={0}
              borderColor="#f0f0f0"
              borderRadius={10}
              onPress={() => {
                if (isAddMode === false) {
                  setIsAddMode(true);
                }
              }}
            >
              <Block direction="row" paddingHorizontal={15} middle>
                <Feather name="map-pin" size={16} color={Colors.blue1} />
                <Feather
                  name={chevron}
                  size={16}
                  color={Colors.blue1}
                  style={{ marginLeft: 5 }}
                />
                <Block block padding={10} direction="row">
                  <ModalDropdown
                    ref={estadoDropdown}
                    defaultIndex={0}
                    defaultValue={estados[0]}
                    options={estados}
                    dropdownStyle={{
                      marginTop: 10,
                      marginLeft: -30,
                      width: 250,
                      height: 285,
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                    dropdownTextStyle={{
                      fontSize: 18,
                      marginLeft: 22,
                    }}
                    showsVerticalScrollIndicator={true}
                    textStyle={{
                      color: "black",
                      fontSize: 20,
                    }}
                    onDropdownWillHide={() => {
                      setIsAddMode(false);
                      setChevron("chevron-right");
                    }}
                    onDropdownWillShow={() => {
                      setChevron("chevron-down");
                    }}
                    onSelect={(i, v) => setID(i)}
                  />
                </Block>
                <Block direction="row">
                  <Text style={{ color: "gray" }}>Selecione a região</Text>
                </Block>
              </Block>
            </Button>
          </Block>
          <Block
            color="#fff"
            borderRadius={8}
            padding={10}
            shadow
            style={{ marginTop: 20 }}
            direction="row"
          >
            <ItemDot
              color1={Colors.carot_op}
              color2={Colors.carot}
              num={(idHandlerInfected(id) && idHandlerInfected(id)) || " "}
              title={"Infectados"}
            />
            <ItemDot
              color1={Colors.red_op}
              color2={Colors.red}
              num={(idHandlerDeceased(id) && idHandlerDeceased(id)) || " "}
              title={"Mortos"}
            />
            <ItemDot
              color1={Colors.blue1_op}
              color2={Colors.blue1}
              num={
                (Math.round(
                  (idHandlerDeceased(id) / idHandlerInfected(id)) * 1000
                ) / 10 &&
                  Math.round(
                    (idHandlerDeceased(id) / idHandlerInfected(id)) * 1000
                  ) / 10) ||
                " "
              }
              title={"Letalidade"}
            />
            {/* <ItemDot
              color1={Colors.green_op}
              color2={Colors.green}
              num={Math.floor(data.recovered)}
              title={"Total de Recuperados"}
            /> */}
          </Block>
          <Block
            middle
            direction="row"
            padding={10}
            justifyContent="space-between"
            style={{ marginTop: 5 }}
          >
            <TextView style={{ fontSize: 15 }} bold>
              {"Total de recuperados no país:  "}
            </TextView>
            <Block direction="row" middle>
              <Block
                width={25}
                height={25}
                middle
                centered
                borderRadius={20}
                color={Colors.green_op}
              >
                <Block
                  width={15}
                  height={15}
                  borderWidth={3}
                  borderRadius={12}
                  borderColor={Colors.green}
                />
              </Block>
              <TextView
                h5
                bold
                style={{ marginLeft: -10 }}
                color={Colors.green}
                m
              >
                {(data.recovered && data.recovered) || ""}
              </TextView>
            </Block>
          </Block>

          <Block>
            <Block
              padding={10}
              direction="row"
              justifyContent="space-between"
              centered
            >
              <TextView h5>Avanço do Vírus</TextView>
              <Button
                style={{ marginTop: 8 }}
                textColor={Colors.blue1}
                onPress={() => navigation.navigate("Prevention")}
              >
                Saiba como se prevenir
              </Button>
            </Block>
            <Block middle color={"#262626"} style={styles.map}>
              <Image source={require("../assets/map2.png")} />
            </Block>
          </Block>
          <Block
            style={{ marginTop: 10 }}
            direction="row"
            justifyContent="center"
          >
            <Text style={{ color: "gray" }} justifyContent="center">
              © 2020 yuyiwx & vmoraes.fl
            </Text>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

export default TodayScreen;
