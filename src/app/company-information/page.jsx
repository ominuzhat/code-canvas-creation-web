"use client";
import MainLayout from "@/components/layout/MainLayout";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toBase64 } from "@/hooks/useFilebase";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

const CompanyInformation = () => {
  const [instance] = useAxiosSecure();
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    city: "",
    postCode: "",
    tradeLicenseNo: "",
    tin: "",
    email: "",
    phone: "",
    ownerFullName: "",
    ownerAddress: "",
    ownerGender: "",
    nidNumber: "",
    ownerEmail: "",
    ownerPhone: "",
    logo: null,
    ownerPhoto: null,
    passportAttachment: null,
    otherAttachment: null,
    tradeLicenseAttachment: null,
    tinAttachment: null,
    contactFullName: "",
    contactDesignation: "",
    contactGender: "",
    contactEmail: "",
    contactPhone: "",
  });

  console.log("www", formData);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const fileBase64 = await toBase64(files[0]);
      setFormData((prevData) => ({
        ...prevData,
        [name]: fileBase64,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    const nid = formPayload.append("nidNumber", formData.nidNumber);
    const tradeLicenseAttachment = formPayload.append(
      "tradeLicenseAttachment",
      formData.tradeLicenseAttachment
    );
    const otherAttachment = formPayload.append(
      "otherAttachment",
      formData.otherAttachment
    );
    const passportAttachment = formPayload.append(
      "passportAttachment",
      formData.passportAttachment
    );
    const tinAttachment = formPayload.append(
      "tinAttachment",
      formData.tinAttachment
    );
    const logo = formPayload.append("logo", formData.logo);

    // Append company fields
    const companyName = formPayload.append(
      "company[name]",
      formData.companyName
    );
    const companyCity = formPayload.append("company[city]", formData.city);
    const tradeLicenseNo = formPayload.append(
      "company[tradeLicenseNo]",
      formData.tradeLicenseNo
    );
    const tinNo = formPayload.append("company[tinNo]", formData.tin);
    const postCode = formPayload.append("company[postCode]", formData.postCode);
    const email = formPayload.append("company[email]", formData.email);
    const phone = formPayload.append("company[phone]", formData.phone);
    const address = formPayload.append("company[address]", formData.address);

    // Append contact person fields
    const contactFullName = formPayload.append(
      "contactPerson[fullName]",
      formData.contactFullName
    );
    const contactEmail = formPayload.append(
      "contactPerson[email]",
      formData.contactEmail
    );
    const contactGender = formPayload.append(
      "contactPerson[gender]",
      formData.contactGender
    );
    const contactPhone = formPayload.append(
      "contactPerson[phone]",
      formData.contactPhone
    );
    const contactDesignation = formPayload.append(
      "contactPerson[designation]",
      formData.contactDesignation
    );

    const data = {
      nidNumber: nid,
      tradeLicenseAttachment: tradeLicenseAttachment,
      otherAttachment: otherAttachment,
      passportAttachment: passportAttachment,
      tinAttachment: tinAttachment,
      logo: logo,
      company: {
        name: companyName,
        city: companyCity,
        tradeLicenseNo: tradeLicenseNo,
        tinNo: tinNo,
        postCode: postCode,
        email: email,
        phone: phone,
        address: address,
      },
      contactPerson: {
        fullName: contactFullName,
        email: contactEmail,
        gender: contactGender,
        phone: contactPhone,
        designation: contactDesignation,
      },
    };

    console.log("www", data, nid);

    try {
      const response = await instance.post(`/customer`, formPayload);
      if (response.data) {
        enqueueSnackbar(`Customer information submitted successfully`, {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar(`Customer information submission failed`, {
        variant: "error",
      });
      console.error("Error submitting customer information:", error);
    }
  };
  return (
    <MainLayout>
      <div className="product-details-top-section scroll-margin pt-120 mb-120">
        <div className="container">
          <div className="row">
            <h1 className="pb-2">Company Information</h1>

            <form onSubmit={handleSubmit}>
              <div className="row border px-5 py-5 rounded">
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Address *</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Post Code *</label>
                    <input
                      type="text"
                      name="postCode"
                      placeholder="Post Code"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Trade License No.*</label>
                    <input
                      type="text"
                      name="tradeLicenseNo"
                      placeholder="Trade License No."
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>TIN *</label>
                    <input
                      type="text"
                      name="tin"
                      placeholder="TIN"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>TIN Attachment *</label>
                    <input
                      type="file"
                      name="tinAttachment"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Trade License Attachment *</label>
                    <input
                      type="file"
                      name="tradeLicenseAttachment"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-inner mb-30">
                  <label>Logo *</label>
                  <input
                    type="file"
                    name="logo"
                    accept=".jpg, .jpeg, .png, .svg"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <div className="form-inner mb-30">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner mb-30">
                    <label>Phone *</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Phone"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <h1 className="py-5">Owner Details</h1>

              <div className="row border px-5 py-5 rounded">
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Owner Full Name *</label>
                    <input
                      type="text"
                      name="ownerFullName"
                      placeholder="Owner Full Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Address *</label>
                    <input
                      type="text"
                      name="ownerAddress"
                      placeholder="Address"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Gender *</label>
                    <select
                      name="ownerGender"
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        color: "#495057",
                        backgroundColor: "#fff",
                        backgroundClip: "padding-box",
                        transition:
                          "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                      }}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Select your gender
                      </option>
                      <option value="male">Man</option>
                      <option value="female">Woman</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>NID Number *</label>
                    <input
                      type="text"
                      name="nidNumber"
                      placeholder="NID Number"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      placeholder="Email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Phone *</label>
                    <input
                      type="number"
                      name="ownerPhone"
                      placeholder="Phone"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Photo *</label>
                    <input
                      type="file"
                      name="ownerPhoto"
                      accept=".jpg, .jpeg, .png, .svg"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Passport Attachment *</label>
                    <input
                      type="file"
                      name="passportAttachment"
                      accept=".pdf"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Other Attachment</label>
                    <input
                      type="file"
                      name="otherAttachment"
                      accept=".pdf"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <h1 className="py-5">Contact Person</h1>

              <div className="row border px-5 py-5 rounded">
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="contactFullName"
                      placeholder="Full Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Designation *</label>
                    <input
                      type="text"
                      name="contactDesignation"
                      placeholder="Designation"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Gender *</label>
                    <select
                      name="contactGender"
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        color: "#495057",
                        backgroundColor: "#fff",
                        backgroundClip: "padding-box",
                        transition:
                          "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                      }}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Select your gender
                      </option>
                      <option value="male">Man</option>
                      <option value="female">Woman</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner mb-30">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="contactEmail"
                      placeholder="Email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner mb-30">
                    <label>Phone *</label>
                    <input
                      type="number"
                      name="contactPhone"
                      placeholder="Phone"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyInformation;
