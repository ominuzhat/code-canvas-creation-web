"use client";
import MainLayout from "@/components/layout/MainLayout";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toBase64 } from "@/hooks/useFilebase";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useForm, Controller } from "react-hook-form";

const CompanyInformation = () => {
  const [instance] = useAxiosSecure();
  const router = useRouter();
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
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
    },
  });

  const onFileChange = async (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const fileBase64 = await toBase64(files[0]);
      setValue(name, files); // Use `files` directly for `FormData`
    } else {
      setValue(name, null);
    }
  };

  const onSubmit = async (data) => {
    const companyPayload = {
      name: data.companyName,
      city: data.city,
      tradeLicenseNo: data.tradeLicenseNo,
      tinNo: data.tin,
      postCode: data.postCode,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };

    const contactPersonPayload = {
      fullName: data.contactFullName,
      email: data.contactEmail,
      gender: data.contactGender,
      phone: data.contactPhone,
      designation: data.contactDesignation,
    };

    const formPayload = new FormData();
    formPayload.append("nidNumber", data.nidNumber);
    formPayload.append("company", JSON.stringify(companyPayload));
    formPayload.append("contactPerson", JSON.stringify(contactPersonPayload));

    if (data.tradeLicenseAttachment && data.tradeLicenseAttachment[0]) {
      formPayload.append(
        "tradeLicenseAttachment",
        data.tradeLicenseAttachment[0]
      );
    }
    if (data.otherAttachment && data.otherAttachment[0]) {
      formPayload.append("otherAttachment", data.otherAttachment[0]);
    }
    if (data.passportAttachment && data.passportAttachment[0]) {
      formPayload.append("passportAttachment", data.passportAttachment[0]);
    }
    if (data.tinAttachment && data.tinAttachment[0]) {
      formPayload.append("tinAttachment", data.tinAttachment[0]);
    }
    if (data.logo && data.logo[0]) {
      formPayload.append("logo", data.logo[0]);
    }
    console.log("FormData:", [...formPayload.entries()]);
    try {
      const response = await instance.post(`/customer`, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        enqueueSnackbar(`Customer information submitted successfully`, {
          variant: "success",
        });
        router.push("/checkout");
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row border px-5 py-5 rounded">
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Company Name *</label>
                    <Controller
                      name="companyName"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Company Name"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Address *</label>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Address"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>City *</label>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="City"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Post Code *</label>
                    <Controller
                      name="postCode"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Post Code"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Trade License No.*</label>
                    <Controller
                      name="tradeLicenseNo"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Trade License No."
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>TIN *</label>
                    <Controller
                      name="tin"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="TIN"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>TIN Attachment *</label>
                    <input
                      type="file"
                      name="tinAttachment"
                      onChange={onFileChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Trade License Attachment *</label>
                    <input
                      type="file"
                      name="tradeLicenseAttachment"
                      onChange={onFileChange}
                    />
                  </div>
                </div>
                <div className="form-inner mb-30">
                  <label>Logo *</label>
                  <input
                    type="file"
                    name="logo"
                    accept=".jpg, .jpeg, .png, .svg"
                    onChange={onFileChange}
                  />
                </div>
                <div className="col-md-6">
                  <div className="form-inner mb-30">
                    <label>Email *</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="email"
                          {...field}
                          placeholder="Email"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner mb-30">
                    <label>Phone *</label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          {...field}
                          placeholder="Phone"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <h1 className="py-5">Owner Details</h1>

              <div className="row border px-5 py-5 rounded">
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Owner Full Name *</label>
                    <Controller
                      name="ownerFullName"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Owner Full Name"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Address *</label>
                    <Controller
                      name="ownerAddress"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Address"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Gender *</label>
                    <Controller
                      name="ownerGender"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          required
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                          }}
                        >
                          <option value="" disabled>
                            Select your gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>NID Number *</label>
                    <Controller
                      name="nidNumber"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="NID Number"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Email *</label>
                    <Controller
                      name="ownerEmail"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="email"
                          {...field}
                          placeholder="Email"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Phone *</label>
                    <Controller
                      name="ownerPhone"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          {...field}
                          placeholder="Phone"
                          required
                        />
                      )}
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
                      onChange={onFileChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Passport Attachment *</label>
                    <input
                      type="file"
                      name="passportAttachment"
                      accept=".jpg, .jpeg, .png, .svg"
                      onChange={onFileChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Other Attachment</label>
                    <input
                      type="file"
                      name="otherAttachment"
                      accept=".jpg, .jpeg, .png, .svg"
                      onChange={onFileChange}
                    />
                  </div>
                </div>
              </div>

              <h1 className="py-5">Contact Person</h1>

              <div className="row border px-5 py-5 rounded">
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Full Name *</label>
                    <Controller
                      name="contactFullName"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Full Name"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Designation *</label>
                    <Controller
                      name="contactDesignation"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Designation"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-inner mb-30">
                    <label>Gender *</label>
                    <Controller
                      name="contactGender"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          required
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                          }}
                        >
                          <option value="" disabled>
                            Select your gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner mb-30">
                    <label>Email *</label>
                    <Controller
                      name="contactEmail"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="email"
                          {...field}
                          placeholder="Email"
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner mb-30">
                    <label>Phone *</label>
                    <Controller
                      name="contactPhone"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          {...field}
                          placeholder="Phone"
                          required
                        />
                      )}
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
