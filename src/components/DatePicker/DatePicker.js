import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import DatePickerComponent from 'react-native-datepicker';
import styles from './styles';

const DatePicker = ({
  date,
  name,
  keyField,
  customStyles = {},
  onChange
}) => (
  <View style={customStyles}>
    {name ? (
      <Text style={styles.label}>
        { name }
      </Text>
    ) : null}
    <DatePickerComponent
      key={keyField}
      style={{ width: '100%' }}
      date={date}
      mode="date"
      showIcon={false}
      customStyles={{
        dateInput: {
          marginLeft: 0,
          borderRadius: 30
        }
      }}
      placeholder="Выберите дату"
      format="YYYY-MM-DD"
      confirmBtnText="Выбрать"
      cancelBtnText="Отмена"
      onDateChange={onChange}
    />
  </View>
);

DatePicker.propTypes = {
  date: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customStyles: PropTypes.shape({}),
  keyField: PropTypes.string.isRequired
};

export default DatePicker;
