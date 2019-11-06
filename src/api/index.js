import Network from "./network";

export default class ApiService {
  static getContactDetails = () => Network().get("Contact/GetContactDetails");

  static getContactDetailsById = contactId =>
    Network().get("Contact/GetContactDetailsById?ContactId=" + contactId);

  static deleteContactDetails = contactId =>
    Network().delete("Contact/DeleteContactDetails?ContactId=" + contactId);

  static updateContactDetails = (
    firstName,
    lastName,
    email,
    phoneNo,
    statusMode
  ) =>
    Network().put("Contact/UpdateContactDetails?ContactId=" + contactId, {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PhoneNo: phoneNo,
      StatusMode: statusMode
    });

  static insertContactDetails = (firstName, lastName, email, phoneNo) =>
    Network().post("Contact/InsertContactDetails", {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PhoneNo: phoneNo
    });

  /*static getContactDetails = () => Network(process.env.REACT_APP_BASE_API_URL3).get(
        'Contact/GetContactDetails'
    );*/
}
