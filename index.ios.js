/* @flow */
'use strict';

var plants = require('./data/plants.json');
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} = React;

var PetSafePlants = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(plants),
      loaded: true,
    });
  },

  renderLoadingView: function () {
    return (
      <View style={styles.container}>
        <Text>
          Loading plants...
        </Text>
      </View>
    );
  },

  renderPlantRow: function(plant) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{plant.name}</Text>
      </View>
    );
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        initialListSize={40}
        renderRow={this.renderPlantRow}
        style={styles.container}
      />
    );
  }

});

var styles = StyleSheet.create({});

AppRegistry.registerComponent('PetSafePlants', () => PetSafePlants);
