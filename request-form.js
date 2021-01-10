import React, { Component } from "react";
import * as emailjs from "emailjs-com";
import { Container, Button } from "react-bootstrap";

import "./request-form.css";

import sad from "../../assets/sad.png";

class RequestForm extends Component {
  state = {
    formErrors: {
      name: "",
      phone: "",
      email: "",
      hiking: "",
      hikingDate: "",
      city: "",
      numbers: "",
      question: "",
    },

    nameValid: false,
    phoneValid: false,
    emailValid: false,
    hikingValid: false,
    hikingDateValid: false,
    cityValid: false,
    numbersValid: false,
    questionValid: false,
    checkboxValid: false,

    formValid: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    emailjs
      .sendForm(
        "gmail",
        "myEmail",
        ".contact_form_class",
        "user_R8YqnmTxz7oSgCeSEA2uE"
      )
      .then(() => {
        this.setState({ sent: true });
      })
      .catch(() => {
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });

    // e.preventDefault();
    // this.setState({ loading: true });
    // emailjs
    //   .sendForm(
    //     "myGmail",
    //     "myEmail",
    //     ".contact_form_class",
    //     "user_n7ihflynPsUv0VdmX1TbG"
    //   )
    //   .then(() => {
    //     this.setState({ sent: true });
    //   })
    //   .catch(() => {
    //     this.setState({ error: true });
    //   })
    //   .finally(() => {
    //     this.setState({ loading: false });
    //   });

    this.setState({
      name: "",
      phone: "",
      email: "",
      hiking: "",
      hikingDate: "",
      city: "",
      numbers: "",
      question: "",

      checkboxValid: false,
      formValid: false,
    });
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleCheckbox = (e) => {
    this.setState({ checkboxValid: e.target.checked });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;

    let nameValid = this.state.nameValid;
    let phoneValid = this.state.phoneValid;
    let emailValid = this.state.emailValid;
    let hikingValid = this.state.hikingValid;
    let hikingDateValid = this.state.hikingDateValid;
    let cityValid = this.state.cityValid;
    let numbersValid = this.state.numbersValid;
    let checkboxValid = this.state.checkboxValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length > 10;
        fieldValidationErrors.name = nameValid ? "" : " is invalid";
        break;

      case "phone":
        phoneValid = value.match(
          /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/
        );
        fieldValidationErrors.phone = phoneValid ? "" : " is invalid";
        break;

      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;

      case "hiking":
        hikingValid = value.length > 0;
        fieldValidationErrors.hiking = hikingValid ? "" : " is invalid";
        break;

      case "hikingDate":
        hikingDateValid = value.length > 0;
        fieldValidationErrors.hikingDate = hikingDateValid ? "" : " is invalid";
        break;

      case "city":
        cityValid = value.length > 0;
        fieldValidationErrors.city = cityValid ? "" : " is invalid";
        break;

      case "numbers":
        numbersValid = value.length > 0;
        fieldValidationErrors.numbers = numbersValid ? "" : " is invalid";
        break;

      case "checkbox":
        checkboxValid = true;
        fieldValidationErrors.checkbox = checkboxValid ? "" : " is invalid";
        break;

      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        phoneValid: phoneValid,
        emailValid: emailValid,
        hikingValid: hikingValid,
        hikingDateValid: hikingDateValid,
        cityValid: cityValid,
        numbersValid: numbersValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.phoneValid &&
        this.state.emailValid &&
        this.state.hikingValid &&
        this.state.hikingDateValid &&
        this.state.cityValid &&
        this.state.numbersValid,
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "badClass";
  }

  render() {
    return this.state.sent ? (
      <SuccessForm />
    ) : this.state.error ? (
      <ErrorForm />
    ) : (
      <div style={{ minHeight: "100vh" }}>
        <form
          onSubmit={this.handleSubmit.bind(this)}
          className="contact_form_class"
        >
          <h3 className="mb-5 mt-5">Форма заявки на участие в поход</h3>
          <div className="contact-grid">
            <label> Фамилия, имя, отчество:</label>
            <input
              className={`form-group ${this.errorClass(
                this.state.formErrors.name
              )}`}
              type="text"
              id="name"
              name="name"
              placeholder="Фамилия, имя, отчество"
              value={this.state.name}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="contact-grid">
            <label>Ваш е-mail:</label>
            <input
              className={`form-group ${this.errorClass(
                this.state.formErrors.email
              )}`}
              type="text"
              id="email"
              name="email"
              placeholder="Ваш е-mail"
              value={this.state.email}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="contact-grid">
            <label>Ваш номер мобильного телефона:</label>
            <input
              className={`form-group ${this.errorClass(
                this.state.formErrors.phone
              )}`}
              type="text"
              id="phone"
              name="phone"
              placeholder="Номер мобильного телефона"
              pattern="[0-9+]*"
              maxLength="13"
              value={this.state.phone}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="contact-grid">
            <label>Укажите где Вы хотите принять участие:</label>
            <input
              className={`form-group ${this.errorClass(
                this.state.formErrors.hiking
              )}`}
              type="text"
              id="hiking"
              name="hiking"
              placeholder="Где Вы хотите принять участие?"
              value={this.state.hiking}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="contact-grid">
            <label>Дата:</label>
            <input
              className={`form-group ${this.errorClass(
                this.state.formErrors.hikingDate
              )}`}
              type="text"
              id="hikingDate"
              name="hikingDate"
              placeholder="Дата"
              value={this.state.hikingDate}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="contact-grid">
            <label>Город проживания:</label>
            <input
              className={`form-group ${this.errorClass(
                this.state.formErrors.city
              )}`}
              type="text"
              id="city"
              name="city"
              placeholder="Введите ваш город"
              value={this.state.city}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="contact-grid">
            <label>Количество участников:</label>
            <input
              className={`form-group ${this.errorClass(
                this.state.formErrors.numbers
              )}`}
              type="text"
              id="numbers"
              name="numbers"
              min="0"
              pattern="[0-9]*"
              placeholder="Введите количество"
              value={this.state.numbers}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="contact-grid">
            <label>Задать вопрос:</label>
            <input
              className="form-group"
              type="text"
              id="question"
              name="question"
              placeholder="Вопрос"
              value={this.state.question}
              onChange={this.handleUserInput}
            />
          </div>

          <div className="contact-grid_checkbox">
            <label>
              Отправляя заявку Вы соглашаетесь на обработку ваших персональных
              данных
            </label>
            <input
              className="mt-1"
              type="checkbox"
              id="checkbox"
              name="checkbox"
              checked={this.state.checkboxValid}
              onChange={this.handleCheckbox}
            />
          </div>

          <Button
            type="submit"
            variant="danger"
            className="mt-4 contact-btn"
            disabled={
              !this.state.formValid ||
              !this.state.checkboxValid ||
              this.state.loading
            }
          >
            {this.state.loading ? "Отправляем..." : "Отправить"}
          </Button>
        </form>
      </div>
    );
  }
}

export default RequestForm;

const SuccessForm = () => {
  const linkToHome = () => {
    document.location = "/";
  };
  return (
    <Container className="success-form" style={{ minHeight: "75vh" }}>
      <h1>Заявка успешно отправлена!</h1>
      <Button
        variant="danger"
        className="mt-4 contact-btn"
        onClick={linkToHome}
      >
        На главную
      </Button>
    </Container>
  );
};

const ErrorForm = () => {
  return (
    <Container
      className="success-form error-form"
      style={{ minHeight: "75vh" }}
    >
      <p>
        Что то пошло не так... Ваша заявка не отправилась{" "}
        <img src={sad} alt="sad emoji" width="25px" />
      </p>
      <p>Пожалуйста, напишите нам на почту!</p>
      <p>
        <a href="mailto:timofeev.trekking@gmail.com">
          timofeev.trekking@gmail.com
        </a>
      </p>
    </Container>
  );
};
