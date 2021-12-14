sap.ui.define([
	"sap/ui/model/type/Currency"
], function (Currency) {
	"use strict";

	return {

		/**
		 * Rounds the currency value to 2 digits
		 */
		currencyValue: function (sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},

		/**
		 * Rounds the currency value to 2 digits
		 */
		calculateItemTotal: function (iQuantity, fPrice, sCurrencyCode) {
			var oCurrency = new Currency({ showMeasure: false });
			var fTotal = iQuantity * fPrice;
			return oCurrency.formatValue([fTotal.toFixed(2), sCurrencyCode], "string");
		},

		/**
		 * Converts a binary string into an image format suitable for the src attribute
		 * */
		handleBinaryContent: function (vData) {
			if (vData) {
				var sMetaData1 = 'data:image/jpeg;base64,';
				var sMetaData2 = vData.substr(104); // stripping the first 104 bytes from the binary data when using base64 encoding.
				return sMetaData1 + sMetaData2;
			} else {
				return "../images/Employee.png";
			}
		},

		/**
		 * Provides a text to indicate the delivery status based on shipped and required dates
		 */

		deliveryText: function (oRequiredDate, oShippedDate) {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();

			if (oShippedDate === null) {
				return "None";
			}
			// delivery is urgent (takes more than 7 days)
			if (oRequiredDate - oShippedDate > 0 && oRequiredDate - oShippedDate <= 432000000) {
				return oResourceBundle.getText("DeliveryUrgent");
			} else if (oRequiredDate < oShippedDate) {
				//delivery is too late
				return oResourceBundle.getText("DeliveryTooLate");
			} else {
				// delivery is in time
				return oResourceBundle.getText("DeliveryInTime");
			}
		},

		/**
		 * Provides a semantic state to indicate the delivery status based on shipped and required dates
		 */
		deliveryState: function (oRequiredDate, oShippedDate) {
			if (oShippedDate === null) {
				return "None";
			}
			// delivery is urgent (takes more than 7 days)
			if (oRequiredDate - oShippedDate > 0 && oRequiredDate - oShippedDate <= 432000000) {
				return "Warning";
			} else if (oRequiredDate < oShippedDate) { // delivery is too late
				return "Error";
			} else { // delivery is in time
				return "Success";
			}
		}
	};
});