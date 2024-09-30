import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {

  const [clientData, setClientData] = useState({
    corporation_name: "",
    corporation_short_name: "",
    corporation_code: "",
    certificate_type: "",
    certificate_number: "",
    brn_expiry_date: "",
    customer_level: "",
    legal_form: "",
    tax_id: "",
    industry: "",
    sub_industry: "",
    phone_number: "",
    email: "",
    fax_number: "",
    customer_grade: "",
    size_level: "",
    register_date: "",
    register_capital: "",
    parent_customer: "",
    remark: "",
    customer_language: "",
    written_language: "",
    tax_exemption: "",
    status: "",
    nationality: "",
    state_province: "",
    district_region: "",
    city: "",
    street: "",
    block: "",
    house_number: "",
    postal_code: "",
    address_type: "",
    operation_type: "",
    dossier_entreprise: "",
    stripe_customer_id: "",
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const clientId = localStorage.getItem('userId'); // Retrieve clientId from localStorage
      const response = await axios.get(
        `http://localhost:8000/clients/getClientById/${clientId}`, // Use clientId in API URL
        {
          headers: {
            Authorization: token
          }
        }
      );
      setClientData(response.data);
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      // Create a data object containing only non-empty fields
      const requestData = { ...clientData };

      // Only include password fields if they are not empty
      if (clientData.old_password && clientData.new_password) {
        requestData.password = clientData.new_password;
      }

      // Update profile with the merged data (including password fields)
      const response = await axios.put(
        "http://localhost:8000/clients/updateProfileClient",
        { ...requestData, password: requestData.new_password },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);

      // Clear password fields after submission
      setClientData((prevData) => ({
        ...prevData,
        old_password: "",
        new_password: "",
      }));

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  /*const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.put(
        "http://localhost:8000/clients/updateProfileClient",
        clientData,
        {
          headers: {
            Authorization: token
          }
        }
      );
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }; */

  const handleLogout = () => {
    // Supprimer le token JWT du stockage local
    localStorage.removeItem('token');
    // Rediriger vers la page de connexion
    window.location.href = '/';
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: "#f4f7fe",
        height: "1341px",
        overflow: "hidden",
        textAlign: "left",
        fontSize: "18px",
        color: "#707eae",
        fontFamily: "'DM Sans'",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "42px",
          left: "360px",
          width: "1525px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "2px 0px",
          }}
        >
          <div
            style={{
              position: "relative",
              lineHeight: "24px",
              fontWeight: "500",
            }}
          >
            Pages / Paramètres{" "}
          </div>{" "}
          <b
            style={{
              position: "relative",
              fontSize: "34px",
              lineHeight: "42px",
              color: "#2b3674",
            }}
          >
            Modification du compte{" "}
          </b>{" "}
        </div>{" "}
        <div
          style={{
            width: "470px",
            position: "relative",
            height: "68px",
            fontSize: "16px",
            color: "#b8b8b8",
            right: "120px"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              borderRadius: "30px",
              backgroundColor: "#fff",
              boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
              width: "470px",
              height: "68px",
            }}
          />{" "}
          <div
            style={{
              position: "absolute",
              top: "11.1px",
              left: "11.1px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "0px 20px",
            }}
          >
            <div
              style={{
                width: "238.6px",
                position: "relative",
                height: "45.7px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  top: "0%",
                  right: "0%",
                  bottom: "0%",
                  left: "0%",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: "0%",
                    right: "0%",
                    bottom: "0%",
                    left: "0%",
                    borderRadius: "49px",
                    backgroundColor: "#f4f7fe",
                  }}
                />{" "}
              </div>{" "}
              <div
                style={{
                  position: "absolute",
                  top: "13px",
                  left: "20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "0px 7px",
                }}
              >
                <img
                  style={{
                    width: "15px",
                    position: "relative",
                    height: "15px",
                  }}
                  alt=""
                  src="/search-icon1.svg"
                />
                <div
                  style={{
                    width: "79px",
                    position: "relative",
                    height: "20px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(50% - 10px)",
                      left: "0px",
                      lineHeight: "20px",
                    }}
                  >
                    Recherche{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div
              style={{
                width: "122.7px",
                height: "26.8px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "0px 20px",
              }}
            >
              <a href="/notificationpage">
              <img
                style={{
                  width: "24px",
                  position: "relative",
                  height: "24px",
                  overflow: "hidden",
                  flexShrink: "0",
                }}
                alt=""
                src="/notifications-none1.svg"
              />
              </a>
              <a href="/chatbotpage">

              <img
                style={{
                  width: "22.1px",
                  position: "relative",
                  height: "23px",
                  overflow: "hidden",
                  flexShrink: "0",
                }}
                alt=""
                src="/carbonchatbot.svg"
              />
              </a>
              <a href="/helppage">
              <img
                style={{
                  width: "24px",
                  position: "relative",
                  height: "24px",
                  overflow: "hidden",
                  flexShrink: "0",
                }}
                alt=""
                src="/info-outline.svg"
              />
              </a>
            </div>{" "}
            <a href="/settingspage">
            <img
              style={{
                width: "45.7px",
                position: "relative",
                height: "45.7px",
                objectFit: "cover",
              }}
              alt=""
              src="/avatar-style-6@2x.png"
            />
            </a>
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div
        style={{
          position: "absolute",
          top: "144px",
          left: "360px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "#2b3674",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "50px 0px",
          }}
        >
          {/*profile */}

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "30px 0px", color: "#b8b8b8" }}>
      {/*sec1 */}
      <div style={{ width: "1400px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: "0px 25px" }}>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            type="text"
            placeholder="Corporation Name"
            name="corporation_name"
            value={clientData.corporation_name}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}

          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Corporation Short Name"
            type="text"
            name="corporation_short_name"
            value={clientData.corporation_short_name}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Corporation Code"
            type="text"
            name="corporation_code"
            value={clientData.corporation_code}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
      </div>
      {/*sec2 */}
      <div style={{ width: "1400px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: "0px 25px" }}>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Certificate Type"
            type="text"
            name="certificate_type"
            value={clientData.certificate_type}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Certificate Number"
            type="text"
            name="certificate_number"
            value={clientData.certificate_number}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="BRN Expiry Date"
            type="text"
            name="brn_expiry_date"
            value={clientData.brn_expiry_date}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
      </div>
     {/*sec3 */}
     <div style={{ width: "1400px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: "0px 25px" }}>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Customer Level"
            type="text"
            name="customer_level"
            value={clientData.customer_level}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Legal Form"
            type="text"
            name="legal_form"
            value={clientData.legal_form}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Tax ID"
            type="text"
            name="tax_id"
            value={clientData.tax_id}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
      </div>
      {/*sec4 */}
      <div style={{ width: "1400px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: "0px 25px" }}>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Industry"
            type="text"
            name="industry"
            value={clientData.industry}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Sub Industry"
            type="text"
            name="sub_industry"
            value={clientData.sub_industry}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Phone Number"
            type="text"
            name="phone_number"
            value={clientData.phone_number}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
      </div>
      {/*sec5 */}
      <div style={{ width: "1400px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: "0px 25px" }}>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={clientData.email}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Fax number"
            type="text"
            name="fax_number"
            value={clientData.fax_number}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Customer Grade"
            type="text"
            name="customer_grade"
            value={clientData.customer_grade}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
      </div>
      {/*sec6 */}
      <div style={{ width: "1400px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: "0px 25px" }}>
      <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Size Level"
            type="text"
            name="size_level"
            value={clientData.size_level}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Register Date"
            type="text"
            name="register_date"
            value={clientData.register_date}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Register Capital"
            type="text"
            name="register_capital"
            value={clientData.register_capital}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        
      </div>
      {/*sec7 */}
      <div style={{ width: "1400px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: "0px 25px" }}>
      
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Parent Customer"
            type="text"
            name="parent_customer"
            value={clientData.parent_customer}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Remark"
            type="text"
            name="remark"
            value={clientData.remark}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px" , width: "500px" }}
          />
          </div>
        </div>
      </div>
      {/*sec8 */}
      <div style={{ width: "1400px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: "0px 25px" }}>
      <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Customer Language"
            type="text"
            name="customer_language"
            value={clientData.customer_language}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Written Language"
            type="text"
            name="written_language"
            value={clientData.written_language}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
        <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "20px" }}>
          <div style={{ position: "relative", lineHeight: "140%" }}>
          <input
            placeholder="Tax Exemption"
            type="text"
            name="tax_exemption"
            value={clientData.tax_exemption}
            onChange={handleInputChange}
            style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  }}
          />
          </div>
        </div>
      </div>



      
      <button
        onClick={handleSubmit}
        style={{ width: "442px", position: "relative", height: "65px", textAlign: "center", color: "#fff", backgroundColor: "#54b848", borderRadius: "20px" }}
      >
        Enregistrer les modifications
      </button>
    </div>
         



       
           
          {/*<div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "30px 0px",
            }}
          >
            <b
              style={{
                position: "relative",
                fontSize: "34px",
                lineHeight: "42px",
              }}
            >
              Modification du mot de passe{" "}
            </b>{" "}
            
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                color: "#b8b8b8",
                 width: "1400px"
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "0px 25px",
                }}
              >
                <div
                  style={{
                    flex: "1",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    border: "1px solid #e7e7e7",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <div style={{ position: "relative", lineHeight: "140%" }}>
                    Ancien mot de passe *
                  </div>{" "}
                  <img
                    style={{
                      width: "24px",
                      position: "relative",
                      height: "24px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                    alt=""
                    src="/solareyelinear.svg"
                  />
                </div>{" "}
                <div
                  style={{
                    flex: "1",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    border: "1px solid #e7e7e7",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <div style={{ position: "relative", lineHeight: "140%" }}>
                    Nouveau mot de passe *
                  </div>{" "}
                  <img
                    style={{
                      width: "24px",
                      position: "relative",
                      height: "24px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                    alt=""
                    src="/solareyelinear.svg"
                  />
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div
              style={{
                width: "442px",
                position: "relative",
                height: "65px",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  top: "0%",
                  right: "0%",
                  bottom: "0%",
                  left: "0%",
                  borderRadius: "20px",
                  backgroundColor: "#54b848",
                }}
              />{" "}
              <div
                style={{
                  position: "absolute",
                  top: "calc(50% - 12.5px)",
                  left: "calc(50% - 107px)",
                  fontWeight: "500",
                }}
              >
                Changer le mot de passe{" "}
              </div>{" "}
            </div>{" "}
          </div>*/}

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "30px 0px" }}>
  <b style={{ position: "relative", fontSize: "34px", lineHeight: "42px" }}>Modification du mot de passe</b>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", color: "#b8b8b8", width: "1400px" }}>
    <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: "0px 25px" }}>
      <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "20px" }}>
        <div style={{ position: "relative", lineHeight: "140%" }}>
        <input
          placeholder="Ancien mot de passe *"
          type="password"
          name="old_password"
          value={clientData.old_password}
          onChange={handleInputChange}
          style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px" , width: "600px" }}
          required
        />
        </div>
      </div>
      <div style={{ flex: "1", borderRadius: "20px", backgroundColor: "#fff", border: "1px solid #e7e7e7", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "20px" }}>
        <div style={{ position: "relative", lineHeight: "140%" }}>
        <input
          placeholder="Nouveau mot de passe"
          type="password"
          name="new_password"
          value={clientData.new_password}
          onChange={handleInputChange}
          style={{ marginLeft: "20px", border:"none",outline: "none" ,  fontSize: "16px"  , width: "600px"}}
        />
        </div>
      </div>
    </div>
  </div>
  <button
    onClick={handleSubmit}
    style={{ width: "442px", position: "relative", height: "65px", textAlign: "center", color: "#fff", backgroundColor: "#54b848", borderRadius: "20px" }}
  >
    Changer le mot de passe
  </button>
</div>
        </div>{" "}
      </div>{" "}
      <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "329px",
          height: "844px",
          overflow: "hidden",
          fontSize: "20px",
          color: "#b8b8b8",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "-6px",
            width: "340px",
            height: "844px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "6px",
              backgroundColor: "#fff",
              width: "329px",
              height: "844px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "60px 40px",
              boxSizing: "border-box",
              gap: "60px 0px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "13px 0px",
              }}
            >
              <img
                style={{
                  width: "124.6px",
                  position: "relative",
                  height: "19.5px",
                }}
                alt=""
                src="/sendmob.svg"
              />
              <img
                style={{
                  width: "71.8px",
                  position: "relative",
                  height: "17px",
                  objectFit: "cover",
                }}
                alt=""
                src="/image-1@2x.png"
              />
            </div>{" "}
            <div
              style={{
                height: "634.3px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "30px 0px",
                }}
              >
                <a href="/dashboardpage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8'}}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0px 15px",
                  }}
                >
                  <img
                    style={{
                      width: "35px",
                      position: "relative",
                      height: "35px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                    alt=""
                    src="/icon1.svg"
                  />
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "30px",
                      fontWeight: "500",
                    }}
                  >
                    Dashboard{" "}
                  </div>{" "}
                </div>{" "}
                </a>
                <a href="/sendsmspage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8'}}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0px 15px",
                  }}
                >
                  <img
                    style={{
                      width: "35px",
                      position: "relative",
                      height: "35px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                    alt=""
                    src="/mingcutesendfill1.svg"
                  />
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "30px",
                      fontWeight: "500",
                    }}
                  >
                    Envoi des SMS{" "}
                  </div>{" "}
                </div>{" "}
                </a>
                <a href="/clientspage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8'}}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0px 15px",
                  }}
                >
                  <img
                    style={{
                      width: "35px",
                      position: "relative",
                      height: "35px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                    alt=""
                    src="/icroundpermcontactcalendar1.svg"
                  />
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "30px",
                      fontWeight: "500",
                    }}
                  >
                    Contacts{" "}
                  </div>{" "}
                </div>{" "}
                </a>
                <a href="/messagespage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8'}}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0px 15px",
                  }}
                >
                  <img
                    style={{
                      width: "35px",
                      position: "relative",
                      height: "35px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                    alt=""
                    src="/antdesignmessagefilled1.svg"
                  />
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "30px",
                      fontWeight: "500",
                    }}
                  >
                    Boite d’ envoi{" "}
                  </div>{" "}
                </div>{" "}
                </a>
                <a href="/historyofpaymentpage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8'}}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0px 15px",
                  }}
                >
                  <img
                    style={{
                      width: "35px",
                      position: "relative",
                      height: "35px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                    alt=""
                    src="/octiconhistory161@2x.png"
                  />
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "30px",
                      fontWeight: "500",
                    }}
                  >
                    Mes transactions
                  </div>
                </div>
                </a>
                <a href="/reportpage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8'}}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0px 15px",
                  }}
                >
                  <img
                    style={{
                      width: "35px",
                      position: "relative",
                      height: "35px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                    alt=""
                    src="/materialsymbolswarningrounded@2x.png"
                  />
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "30px",
                      fontWeight: "500",
                    }}
                  >
                    Signaler un problème{" "}
                  </div>
                </div>
                </a>
                <a href="/addresspage"style={{textDecoration: 'none',cursor: 'pointer',  color: '#B8B8B8' }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "15px",
                    
                  }}
                >
                  <img
                    style={{
                      width: "35px",
                      position: "relative",
                      height: "35px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                    alt=""
                    src="/fluent_location-28-filled.svg"
                  />
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "30px",
                      fontWeight: "500",
                    }}
                  >
                    Mes adresses{" "}
                  </div>{" "}
                </div>{" "}
                </a>
                <a href="/settingspage" style={{textDecoration: 'none',cursor: 'pointer' }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0px 15px",
                    color: "#54b848",
                  }}
                >
                  <img
                    style={{
                      width: "35px",
                      position: "relative",
                      height: "35px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                    alt=""
                    src="/antdesignsettingfilled1.svg"
                  />
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "30px",
                      fontWeight: "500",
                    }}
                  >
                    Paramètres{" "}
                  </div>{" "}
                </div>{" "}
                </a>
              </div>{" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "0px 15px",
                }}
              >
                <img
                  style={{
                    width: "35px",
                    position: "relative",
                    height: "35px",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  alt=""
                  src="/solarlogout3bold1.svg"
                />
                <div   onClick={handleLogout}
                  style={{
                    position: "relative",
                    lineHeight: "30px",
                    fontWeight: "500",
                    cursor: "pointer"
                  }}
                >
                  Se déconnecter{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div
            style={{
              position: "absolute",
              top: "calc(50% + 200px)",
              left: "0px",
              width: "340px",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "12px",
                position: "relative",
                borderRadius: "25px",
                backgroundColor: "#54b848",
                height: "39px",
              }}
            />{" "}
            <div
              style={{
                width: "12px",
                position: "relative",
                borderRadius: "25px",
                backgroundColor: "#54b848",
                height: "39px",
              }}
            />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Settings;
