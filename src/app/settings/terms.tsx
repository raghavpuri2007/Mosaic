import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.text}>
          Welcome to our app! By using our services, you agree to be bound by
          the following terms and conditions:
        </Text>
        <Text style={styles.subheading}>1. User Conduct</Text>
        <Text style={styles.text}>
          You agree to use our app in a manner that is lawful, respectful, and
          in accordance with these terms and conditions. You shall not use our
          app to engage in any activity that is harmful, threatening, abusive,
          harassing, defamatory, or otherwise objectionable.
        </Text>
        <Text style={styles.subheading}>2. Intellectual Property</Text>
        <Text style={styles.text}>
          All intellectual property rights in our app, including but not limited
          to copyrights, trademarks, and logos, are owned by us or our
          licensors. You shall not use, reproduce, or distribute any of our
          intellectual property without our prior written consent.
        </Text>
        <Text style={styles.subheading}>3. Privacy</Text>
        <Text style={styles.text}>
          We respect your privacy and handle your personal information in
          accordance with our Privacy Policy. By using our app, you consent to
          the collection, use, and disclosure of your personal information as
          described in our Privacy Policy.
        </Text>
        <Text style={styles.subheading}>4. Disclaimer of Warranties</Text>
        <Text style={styles.text}>
          Our app is provided on an "as is" and "as available" basis. We make no
          warranties or representations, express or implied, regarding the
          functionality, reliability, or availability of our app. We disclaim
          all liability for any interruptions, errors, or delays in the
          operation of our app.
        </Text>
        <Text style={styles.subheading}>5. Limitation of Liability</Text>
        <Text style={styles.text}>
          In no event shall we be liable for any direct, indirect, incidental,
          consequential, or punitive damages arising out of or in connection
          with your use of our app. Our total liability to you for any claims
          under these terms and conditions shall not exceed the amount paid by
          you, if any, for using our app.
        </Text>
        <Text style={styles.subheading}>6. Governing Law</Text>
        <Text style={styles.text}>
          These terms and conditions shall be governed by and construed in
          accordance with the laws of [Jurisdiction]. Any disputes arising out
          of or in connection with these terms and conditions shall be subject
          to the exclusive jurisdiction of the courts of [Jurisdiction].
        </Text>
        <Text style={styles.text}>
          By using our app, you acknowledge that you have read, understood, and
          agree to be bound by these terms and conditions.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#38a093",
    marginBottom: 20,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38a093",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
});
