import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Button } from 'native-base';
import call from 'react-native-phone-call';

// ASPCA Animal Poison Control Center Phone Number
const POISON_HOTLINE = '8884264435';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  header: {
    marginBottom: 20,
  },
});

export default class App extends React.Component {
  handleOnPress = () => {
    const args = {
      number: POISON_HOTLINE,
      prompt: true,
    };

    // eslint-disable-next-line no-console
    call(args).catch(console.error);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.header}>Pet Safe Plants</Text>
          <Button onPress={this.handleOnPress}>
            <Text>Call Animal Poison Control</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
