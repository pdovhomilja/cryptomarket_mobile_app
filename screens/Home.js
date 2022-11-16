// Step 1: Import the crypto getRandomValues shim (**BEFORE** the ethers shims)
import "react-native-get-random-values";

// Step 2: Import the ethers shims (**BEFORE** the thirdweb SDK)
import "@ethersproject/shims";

// Step 3: Import the thirdweb SDK

import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import { useEffect, useState } from "react";
import { View, FlatList, Text, SafeAreaView } from "react-native";

import { COLORS } from "../constants";
import { NFTCard, HomeHeader, FocusedStatusBar } from "../components";

const Home = () => {
  const [nfts, setNFTS] = useState([]);

  useEffect(() => {
    const sdk = new ThirdwebSDK("mumbai");
    const loadNFTS = async () => {
      const contract = await sdk.getContract(
        "0xE7a2bD9B1134E04Af247a04B637C0D55c72EEA7E",
        "marketplace"
      );

      return await contract.getActiveListings();
    };
    loadNFTS().then((_nfts) => {
      setNFTS(_nfts);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={nfts}
            //data={NFTData}
            renderItem={({ item }) => <NFTCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader />}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 300, backgroundColor: COLORS.primary }}></View>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
