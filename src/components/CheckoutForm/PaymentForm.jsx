import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import Review from "./Review";
// const mp = new MercadoPago("TEST-144d3506-8c0f-4009-aa82-5de73c729264");

function PaymentForm({
  checkoutToken,
  shippingData,
  backStep,
  onCaptureCheckout,
  nextStep,
}) {
  // const cardForm = mp.cardForm({
  //   amount: "100.5",
  //   autoMount: true,
  //   form: {
  //     id: "form-checkout",
  //     cardholderName: {
  //       id: "form-checkout__cardholderName",
  //       placeholder: "Titular de la tarjeta",
  //     },
  //     cardholderEmail: {
  //       id: "form-checkout__cardholderEmail",
  //       placeholder: "E-mail",
  //     },
  //     cardNumber: {
  //       id: "form-checkout__cardNumber",
  //       placeholder: "Número de la tarjeta",
  //     },
  //     cardExpirationMonth: {
  //       id: "form-checkout__cardExpirationMonth",
  //       placeholder: "Mes de vencimiento",
  //     },
  //     cardExpirationYear: {
  //       id: "form-checkout__cardExpirationYear",
  //       placeholder: "Año de vencimiento",
  //     },
  //     securityCode: {
  //       id: "form-checkout__securityCode",
  //       placeholder: "Código de seguridad",
  //     },
  //     installments: {
  //       id: "form-checkout__installments",
  //       placeholder: "Cuotas",
  //     },
  //     identificationType: {
  //       id: "form-checkout__identificationType",
  //       placeholder: "Tipo de documento",
  //     },
  //     identificationNumber: {
  //       id: "form-checkout__identificationNumber",
  //       placeholder: "Número de documento",
  //     },
  //     issuer: {
  //       id: "form-checkout__issuer",
  //       placeholder: "Banco emisor",
  //     },
  //   },
  //   callbacks: {
  //     onFormMounted: (error) => {
  //       if (error) return console.warn("Form Mounted handling error: ", error);
  //       console.log("Form mounted");
  //     },
  //     onSubmit: (event) => {
  //       event.preventDefault();

  //       const {
  //         paymentMethodId: payment_method_id,
  //         issuerId: issuer_id,
  //         cardholderEmail: email,
  //         amount,
  //         token,
  //         installments,
  //         identificationNumber,
  //         identificationType,
  //       } = cardForm.getCardFormData();

  //       fetch("/process_payment", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           token,
  //           issuer_id,
  //           payment_method_id,
  //           transaction_amount: Number(amount),
  //           installments: Number(installments),
  //           description: "Descripción del producto",
  //           payer: {
  //             email,
  //             identification: {
  //               type: identificationType,
  //               number: identificationNumber,
  //             },
  //           },
  //         }),
  //       });
  //     },
  //     onFetching: (resource) => {
  //       console.log("Fetching resource: ", resource);

  //       // Animate progress bar
  //       const progressBar = document.querySelector(".progress-bar");
  //       progressBar.removeAttribute("value");

  //       return () => {
  //         progressBar.setAttribute("value", "0");
  //       };
  //     },
  //   },
  // });
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    // const cardElement = elements.getElement(CardElement);
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });
    // if (error) {
    //   console.log(error);
    // } else {
    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: "Primary",
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: "Mercadopago",
        // stripe: {
        //   payment_method_id: paymentMethod.id,
        // },
      },
    };

    onCaptureCheckout(checkoutToken.id, orderData);
    nextStep();
  };
  // };
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Método de pago
      </Typography>
      <section className="payment-form dark">
        <div className="container__payment">
          <div className="row">
            {/* <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group col-sm-8">
                <label htmlFor="cardholderName">Card Holder Name</label>
                <input
                  id="form-checkout__cardholderName"
                  name="cardholderName"
                  type="text"
                  className="form-control"
                  data-checkout="cardholderName"
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="cardExpirationMonth">
                  Card Expiration Date
                </label>
                <div className="input-group expiration-date">
                  <input
                    id="form-checkout__cardExpirationMonth"
                    name="cardExpirationMonth"
                    type="text"
                    data-checkout="cardExpirationMonth"
                    className="form-control"
                  />
                  <span className="date-separator">/</span>
                  <input
                    id="form-checkout__cardExpirationYear"
                    name="cardExpirationYear"
                    data-checkout="cardExpirationYear"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group col-sm-8">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  id="form-checkout__cardNumber"
                  name="cardNumber"
                  type="text"
                  data-checkout="cardNumber"
                  className="form-control"
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="securityCode">CCV</label>
                <input
                  id="form-checkout__securityCode"
                  name="securityCode"
                  type="text"
                  data-checkout="securityCode"
                  className="form-control"
                />
              </div>
              <div id="issuerInput" className="form-group col-sm-12 hidden">
                <label htmlFor="issuer">Issuer</label>
                <select
                  id="form-checkout__issuer"
                  name="issuer"
                  className="form-control"
                  data-checkout="issuer"
                >
                  <option value="HSBC">HSBC</option>
                  <option value="SANTANDER">SANTANDER</option>
                </select>
              </div>
              <div className="form-group col-sm-12">
                <label htmlFor="installments">Installments</label>
                <select
                  id="form-checkout__installments"
                  name="installments"
                  type="text"
                  className="form-control"
                >
                  <option value="1">Single payment</option>
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="12">12</option>
                </select>
              </div>
              <br />
              <br />
            </form> */}
            <form id="form-checkout" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group d-flex flex-column">
                <label htmlFor="cardNumber">Numero de tarjeta</label>
                <input
                  type="text"
                  name="cardNumber"
                  id="form-checkout__cardNumber"
                  className="form-control"
                />
              </div>
              <label>Fecha de Vencimiento</label>
              <div className="form-group">
                <input
                  type="text"
                  name="cardExpirationMonth"
                  id="form-checkout__cardExpirationMonth"
                  className="form-control"
                  placeholder="MM"
                />
                /
                <input
                  type="text"
                  name="cardExpirationYear"
                  id="form-checkout__cardExpirationYear"
                  className="form-control"
                  placeholder="YY"
                />
              </div>
              <div className="form-group d-flex flex-column">
                <label htmlFor="cardholderName">Nombre Completo</label>

                <input
                  type="text"
                  name="cardholderName"
                  id="form-checkout__cardholderName"
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex flex-column">
                <label htmlFor="cardholderEmail">Email</label>
                <input
                  type="email"
                  name="cardholderEmail"
                  id="form-checkout__cardholderEmail"
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex flex-column">
                <label htmlFor="securityCode">CCV</label>

                <input
                  type="text"
                  name="securityCode"
                  id="form-checkout__securityCode"
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex flex-column">
                <label htmlFor="issuer">Emisor</label>
                <select
                  name="issuer"
                  id="form-checkout__issuer"
                  className="form-control"
                ></select>
              </div>
              <div className="form-group d-flex flex-column">
                <label htmlFor="identificationType">
                  Tipo de Identificación
                </label>
                <select
                  name="identificationType"
                  id="form-checkout__identificationType"
                  className="form-control"
                ></select>
              </div>
              <div className="form-group d-flex flex-column">
                <label htmlFor="identificationNumber">
                  Número de Identificación
                </label>
                <input
                  type="text"
                  name="identificationNumber"
                  id="form-checkout__identificationNumber"
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex flex-column">
                <label htmlFor="installments">Cuotas</label>
                <select
                  name="installments"
                  id="form-checkout__installments"
                  className="form-control"
                ></select>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <Button onClick={backStep} variant="outlined" color="primary">
                  Atrás
                </Button>
                <Button
                  id="form-checkout__submit"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Pagar {checkoutToken.live.subtotal.formatted_with_code}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaymentForm;
