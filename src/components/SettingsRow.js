import React from 'react';
import { Paragraph, IconButton, Colors, Divider } from 'react-native-paper';
import { StyleSheet, View, Switch, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
/**
 * @desc A settings row.
 *
 * @param {String} description - The description of the row
 * @param {String} content - The text content of the row (optional)
 * @param {String} icon - An icon to be displayed on the right
 * @param {Boolean} withSwitch - A switch to be displayed on the right
 * @param {Boolean} editable - An edit button to be displayed on the right
 * @param {Function} setSwitchValue
 * @param {Boolean} withBorderTop
 */
const SettingsRow = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

/**
 * A component that wraps some content with a given margin
 *
 * @param {} children - The components to be wrapped in
 * @param {number} margin - The margin
 */
const SettingsRowItem = ({ icon, description, content, editable }) => {
  const { colors } = useTheme();
  return (
    <>
      {icon && <IconButton icon={icon} size={25} color={colors.primary} />}
      <Paragraph style={styles.descText}>{description}</Paragraph>
      {content && <Paragraph style={styles.contentText}>{content}</Paragraph>}
      {editable && (
        <IconButton
          style={{ marginTop: -1, marginLeft: 'auto' }}
          icon={'pencil-outline'}
          size={25}
          color={Colors.brown200}
        />
      )}
      <Divider />
    </>
  );
};

/**
 * A component that wraps some content with a given margin
 *
 * @param {} children - The components to be wrapped in
 * @param {number} margin - The margin
 */
const SettingsRowSwitch = ({ children, margin }) => {
  return <Switch />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey200,
    alignItems: 'center',
  },
  descText: {
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor: Colors.red200,
  },
  contentText: {
    marginLeft: 10,
    marginRight: 5,
  },
});

export { SettingsRow, SettingsRowItem, SettingsRowSwitch };
