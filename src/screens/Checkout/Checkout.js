/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import Button from '../../components/Button';
import FormInput from '../../components/Input';
import DatePicker from '../../components/DatePicker';
import CheckBox from '../../components/CheckBox';

import styles from './styles';
// TODO: replace this input with relevant ones
import { cleanPhone, validatePhone } from '../../Utils';
import {
  updateUserData as updateUserDataAction, logout as logoutAction
} from '../../redux/modules/auth';

const ERRORS = {
  additional_text: 'Введите текст к открытке',
};

const validateString = text => (
  text && text.length
);

class Checkout extends React.Component {
  static navigationOptions = {
    title: 'Оформить заказ'
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    updateUserData: PropTypes.func.isRequired
  };

  state = {
    form: {
      additional_text: '',
      additional_info: '',
      orderDate: new Date(),
      showAdditionalText: false,
      showAdditionalInfo: false,
    },
    errors: {
      additional_text: null,
    },
    showSuccess: false,
    showError: false
  };

  componentDidMount() {
    const { auth } = this.props;
    this.setState(state => ({
      form: {
        ...state.form,
        ...auth.user
      }
    }));
  }

  onPhoneChange = (phone) => {
    const { errors, form } = this.state;
    const cleanedPhone = cleanPhone(phone);

    const isValid = validatePhone(cleanedPhone);

    this.setState({
      form: {
        ...form,
        phone
      },
      errors: {
        ...errors,
        phone: isValid ? null : ERRORS.phone
      }
    });

    setTimeout(() => {
      this.setState({
        form: {
          ...form,
          phone: cleanedPhone
        }
      });
    }, 0);
  };

  onChange = (field, val) => {
    const { errors, form } = this.state;

    const isValid = validateString(val);

    this.setState({
      form: {
        ...form,
        [field]: val
      },
      errors: {
        ...errors,
        [field]: isValid ? null : ERRORS[field]
      }
    });
  };

  onDateChange = (date) => {
    this.setState(state => ({
      form: {
        ...state.form,
        date
      }
    }));
  };

  // eslint-disable-next-line consistent-return
  onSubmit = () => {
    const { updateUserData } = this.props;
    const { form, errors } = this.state;

    if (Object.values(errors).find(er => !!er)) {
      this.showNoty('showError');
      return false;
    }

    updateUserData(form);
    this.showNoty('showSuccess');
  };

  showNoty = (field) => {
    this.setState({
      showSuccess: false,
      showError: false,
      [field]: true
    });
    setTimeout(() => {
      this.setState({
        [field]: false
      });
    }, 2000);
  };

  toggleAdditionalInfo = () => {
    const { form } = this.state;
    this.setState(({
      form: {
        ...form,
        showAdditionalInfo: !form.showAdditionalInfo
      }
    }));
  };

  toggleAdditionalText = () => {
    const { form } = this.state;
    this.setState(({
      form: {
        ...form,
        showAdditionalText: !form.showAdditionalText
      }
    }));
  };

  renderSeparator = ({ customWidth }) => (
    <View
      style={{
        height: 1,
        width: customWidth,
        backgroundColor: '#E5E5E5',
        marginBottom: 28,
        marginTop: 28
      }}
    />
  );

  render() {
    const {
      form: {
        // eslint-disable-next-line camelcase
        additional_text,
        // eslint-disable-next-line camelcase
        additional_info,
        orderDate,
        showAdditionalText,
        showAdditionalInfo
      },
      errors,
      showError,
      showSuccess
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <CheckBox
            // styles={styles.checkbox}
            keyField="ff-additional_text"
            onPress={this.toggleAdditionalText}
            checked={showAdditionalText}
            name="Написать текст открытки"
          />
          { showAdditionalText && (
            <FormInput
              keyField="ff-additional_text"
              onChange={val => (this.onChange('additional_text', val))}
              inputProps={{
                value: additional_text
              }}
              customStyles={styles.additionalTextInput}
              error={errors.lastName}
            />
          ) }
          <View styles={{ flexDirection: 'row' }}>
            <Text>Recipient Получатель</Text>
            <CheckBox
              keyField="ff-receiver"
              name="I'll take the order myself Я сам заберу заказ"
              style={styles.receiverCheckbox}
            />
          </View>
          <FormInput name="NameИмя" />
          <FormInput name="PhoneТелефон" />
          <View styles={{ flexDirection: 'row' }}>
            <FormInput
              name="Address Адрес"
              customStyles={styles.addressInput}
            />
            <FormInput
              name="Office / Quart Офис/кварт."
              customStyles={styles.officeInput}
            />
          </View>
          <CheckBox
            keyField="ff-receiver"
            name="Additional Information Дополнительная информация"
            style={styles.receiverCheckbox}
            onPress={this.toggleAdditionalInfo}
            checked={showAdditionalInfo}
          />
          { showAdditionalInfo && (
            <FormInput
              keyField="ff-additional_info"
              onChange={val => (this.onChange('additional_info', val))}
              inputProps={{
                value: additional_info
              }}
              customStyles={styles.additionalTextInput}
              error={errors.lastName}
            />
          ) }

          <this.renderSeparator customWidth="100%" />

          <Text>When to deliver Когда доставить</Text>
          <DatePicker
            name="Choose a date Выберите дату"
            customStyles={styles.datepicker}
            date={orderDate}
          />
          <CheckBox
            keyField="ff-exact-time"
            name="Exact time (± 15min) Точное время (±15мин)"
            // style={styles.receiverCheckbox}
            // onPress={this.toggleAdditionalInfo}
            // checked={showAdditionalInfo}
          />

          <this.renderSeparator customWidth="100%" />

          <View styles={{ flexDirection: 'row' }}>
            <Text>From whom От Кого</Text>
            <CheckBox
              keyField="ff-from"
              name="Anonymously Анонимно"
            // style={styles.receiverCheckbox}
            />
          </View>
          <FormInput name="Name Имя" />
          <FormInput name="Phone Телефон" />
          <FormInput name="E-mail" />
          <Text>Send a check and a photo with a bouquet Отправим чек и фото с букетом</Text>

          <this.renderSeparator customWidth="100%" />

          <Button
            keyField="ff-checkout"
            active
            customStyles={styles.checkoutBtn}
            // onPress
            title="GO TO THE PAYMENT ПЕРЕЙТИ К ОПЛАТЕ"
          />
        </ScrollView>
      </View>

    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = {
  updateUserData: updateUserDataAction,
  logout: logoutAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
