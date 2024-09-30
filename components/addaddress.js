import React, { useState , useEffect } from "react";
import axios from "axios";



const AddAddress = () => {

  const [adresseId, setAdresseId] = useState('');
  const [clientId, setClientId] = useState('');
  const [nationality, setNationality] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [districtRegion, setDistrictRegion] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [block, setBlock] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addressType, setAddressType] = useState('');
  const [operationType, setOperationType] = useState('');
  const [token, setToken] = useState("");

  useEffect(() => {
    // Retrieve token and clientId from localStorage
    const storedToken = localStorage.getItem('token');
    const storedClientId = localStorage.getItem('userId');
    setToken(storedToken);
    setClientId(storedClientId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressData = {
      adresse_id: adresseId,
      client_id: clientId,
      nationality: nationality,
      state_province: stateProvince,
      district_region: districtRegion,
      city: city,
      street: street,
      block: block,
      house_number: houseNumber,
      postal_code: postalCode,
      address_type: addressType,
      operation_type: operationType
    };

    try {
      const response = await axios.post('http://localhost:8000/adresses/createAdresse', addressData, {
        headers: {
          Authorization: token
        }
      });

      
        alert('Address created successfully'); // Show alert upon successful creation
        // Clear form inputs after successful submission
        setAdresseId('');
        setClientId('');
        setNationality('');
        setStateProvince('');
        setDistrictRegion('');
        setCity('');
        setStreet('');
        setBlock('');
        setHouseNumber('');
        setPostalCode('');
        setAddressType('');
        setOperationType('');
      
    } catch (error) {
      console.error('Error creating address:', error);
      alert('Error creating address. Please try again.'); // Show alert on error
    }
  };
  
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
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "0px 35px 0px 0px",
        boxSizing: "border-box",
        gap: "31px",
        letterSpacing: "normal",
      }}
    >
      <div
        style={{
          width: "329px",
          overflow: "hidden",
          flexShrink: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            height: "864px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "60px 38px 60px 40px",
            boxSizing: "border-box",
            position: "relative",
            gap: "60px",
            textAlign: "left",
            fontSize: "20px",
            color: "#b8b8b8",
            fontFamily: "'DM Sans'",
          }}
        >
          <div
            style={{
              width: "124.6px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "13px",
            }}
          >
            <img
              style={{
                alignSelf: "stretch",
                height: "19.5px",
                position: "relative",
                maxWidth: "100%",
                overflow: "hidden",
                flexShrink: "0",
              }}
              loading="eager"
              alt=""
              src="/sendmob.svg"
            />
            <img
              style={{
                width: "71.8px",
                height: "17px",
                position: "relative",
                objectFit: "cover",
              }}
              loading="eager"
              alt=""
              src="/image-1@2x.png"
            />
          </div>{" "}
          <div
            style={{
              alignSelf: "stretch",
              height: "634.3px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "30px",
              }}
            >
              <a href="/dashboardpage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8'}}>
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
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="eager"
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
                  gap: "15px",
                }}
              >
                <img
                  style={{
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="eager"
                  alt=""
                  src="/mingcutesendfill.svg"
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
              <a href="/clientspage" style={{ textDecoration: 'none', cursor: 'pointer', color: '#B8B8B8' }}>
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
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                  alt=""
                  src="/icroundpermcontactcalendar@2x.png"
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
                  gap: "15px",
                }}
              >
                <img
                  style={{
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="eager"
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
                  gap: "15px",
                }}
              >
                <img
                  style={{
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="eager"
                  alt=""
                  src="/octiconhistory161.svg"
                />
                <div
                  style={{
                    position: "relative",
                    lineHeight: "30px",
                    fontWeight: "500",
                  }}
                >
                  Mes transactions{" "}
                </div>{" "}
              </div>{" "}
              </a>
              <a href="/reportpage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8'}}>
              <div
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "15px",
                }}
              >
                <img
                  style={{
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="eager"
                  alt=""
                  src="/materialsymbolswarningrounded1.svg"
                />
                <div
                  style={{
                    position: "relative",
                    lineHeight: "30px",
                    fontWeight: "500",
                  }}
                >
                  Signaler un problème{" "}
                </div>{" "}
              </div>{" "}
              </a>
              <a href="/addresspage"style={{textDecoration: 'none',cursor: 'pointer' }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "15px",
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
                    src="/fluent_location.svg"
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
              <a href="/settingspage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8'}}>
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
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="eager"
                  alt=""
                  src="/antdesignsettingfilled.svg"
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
                gap: "15px",
              }}
            >
              <img
                style={{
                  height: "35px",
                  width: "35px",
                  position: "relative",
                  overflow: "hidden",
                  flexShrink: "0",
                }}
                loading="eager"
                alt=""
                src="/solarlogout3bold1.svg"
              />
              <div  onClick={handleLogout}
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
          <div
            style={{
              width: "340px",
              margin: "0",
              position: "absolute",
              top: "560px",
              left: "-6px",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "20px",
              zIndex: "1",
            }}
          >
            <div
              style={{
                height: "39px",
                width: "12px",
                position: "relative",
                borderRadius: "25px",
                backgroundColor: "#54b848",
              }}
            />{" "}
            <div
              style={{
                height: "39px",
                width: "12px",
                position: "relative",
                borderRadius: "25px",
                backgroundColor: "#54b848",
              }}
            />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <section
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "42px 0px 0px",
          boxSizing: "border-box",
          minWidth: "991px",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "34px",
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "20px",
              maxWidth: "100%",
              textAlign: "left",
              fontSize: "18px",
              color: "#707eae",
              fontFamily: "'DM Sans'",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "2px",
                maxWidth: "100%",
              }}
            >
              <div
                style={{
                  position: "relative",
                  lineHeight: "24px",
                  fontWeight: "500",
                  display: "inline-block",
                  maxWidth: "100%",
                }}
              >
                <a href="/addresspage" style={{textDecoration: 'none',cursor: 'pointer' }}>
                Pages / Mes adresses / Ajouter une adresse{" "} </a>
              </div>{" "}
              <h2
                style={{
                  margin: "0",
                  position: "relative",
                  fontSize: "34px",
                  lineHeight: "42px",
                  fontWeight: "700",
                  fontFamily: "inherit",
                  color: "#2b3674",
                }}
              >
                Ajouter une nouvelle adresse{" "}
              </h2>{" "}
            </div>{" "}
            <div
              style={{
                width: "470px",
                borderRadius: "30px",
                backgroundColor: "#fff",
                boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "11px 12px 12px 11px",
                boxSizing: "border-box",
                gap: "26px",
                maxWidth: "100%",
              }}
            >
              <div
                style={{
                  height: "68px",
                  width: "470px",
                  position: "relative",
                  borderRadius: "30px",
                  backgroundColor: "#fff",
                  boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                  display: "none",
                  maxWidth: "100%",
                }}
              />{" "}
              <div
                style={{
                  flex: "1",
                  borderRadius: "49px",
                  backgroundColor: "#f4f7fe",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: "13px 20px 12px",
                  boxSizing: "border-box",
                  gap: "7px",
                  minWidth: "91px",
                  zIndex: "1",
                }}
              >
                <div
                  style={{
                    height: "45.7px",
                    width: "238.6px",
                    position: "relative",
                    borderRadius: "49px",
                    backgroundColor: "#f4f7fe",
                    display: "none",
                  }}
                />{" "}
                <img
                  style={{
                    height: "15px",
                    width: "15px",
                    position: "relative",
                    zIndex: "2",
                  }}
                  alt=""
                  src="/search-icon1.svg"
                />
                <input
                  style={{
                    width: "76px",
                    border: "none",
                    outline: "none",
                    fontFamily: "'DM Sans'",
                    fontSize: "16px",
                    backgroundColor: "transparent",
                    height: "20px",
                    position: "relative",
                    lineHeight: "20px",
                    color: "#b8b8b8",
                    textAlign: "left",
                    display: "inline-block",
                    zIndex: "2",
                  }}
                  placeholder="Recherche"
                  type="text"
                />
              </div>{" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "20px",
                }}
              >
                <a href="/notificationpage" >
                <img
                  style={{
                    height: "24px",
                    width: "24px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                    zIndex: "1",
                  }}
                  loading="eager"
                  alt=""
                  src="/notifications-none1.svg"
                />
                </a>
                <a href="/chatbotpage" >
                <img
                  style={{
                    height: "23px",
                    width: "22.1px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                    zIndex: "1",
                  }}
                  loading="eager"
                  alt=""
                  src="/carbonchatbot.svg"
                />
                </a>
                
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "0px 6px 0px 0px",
                  }}
                >
                  <a href="/helppage" >
                  <img
                    style={{
                      width: "24px",
                      height: "24px",
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: "0",
                      zIndex: "1",
                    }}
                    loading="eager"
                    alt=""
                    src="/info-outline.svg"
                  />
                  </a>
                </div>{" "}
                <a href="/settingspage" >
                <img
                  style={{
                    height: "45.7px",
                    width: "45.7px",
                    position: "relative",
                    objectFit: "cover",
                    zIndex: "1",
                  }}
                  loading="eager"
                  alt=""
                  src="/avatar-style-61@2x.png"
                />
                </a>
              </div>{" "}
            </div>{" "}
          </div>{" "}
          
{/*form */}
<div
      style={{
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "440px",
        maxWidth: "100%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <header
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "25px",
            maxWidth: "100%",
            width:"1420px",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "25px",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                flex: "1",
                borderRadius: "20px",
                backgroundColor: "#fff",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "100%",
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  height: "25px",
                  position: "relative",
                  lineHeight: "140%",
                  textAlign: "left",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
                placeholder="Nationalité"
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>{" "}
            <div
              style={{
                flex: "1",
                borderRadius: "20px",
                backgroundColor: "#fff",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "100%",
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  height: "25px",
                  position: "relative",
                  lineHeight: "140%",
                  textAlign: "left",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
                placeholder="État/Province"
                type="text"
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
              />
            </div>{" "}
            <div
              style={{
                flex: "1",
                borderRadius: "20px",
                backgroundColor: "#fff",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "100%",
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  height: "25px",
                  position: "relative",
                  lineHeight: "140%",
                  textAlign: "left",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
                placeholder="District/Région"
                type="text"
                value={districtRegion}
                onChange={(e) => setDistrictRegion(e.target.value)}
              />
            </div>{" "}
          </div>{" "}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "25px",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                flex: "1",
                borderRadius: "20px",
                backgroundColor: "#fff",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "100%",
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  height: "25px",
                  position: "relative",
                  lineHeight: "140%",
                  textAlign: "left",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
                placeholder="Ville"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>{" "}
            <div
              style={{
                flex: "1",
                borderRadius: "20px",
                backgroundColor: "#fff",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "100%",
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  height: "25px",
                  position: "relative",
                  lineHeight: "140%",
                  textAlign: "left",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
                placeholder="Rue"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>{" "}
            <div
              style={{
                flex: "1",
                borderRadius: "20px",
                backgroundColor: "#fff",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "100%",
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  height: "25px",
                  position: "relative",
                  lineHeight: "140%",
                  textAlign: "left",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
                placeholder="Bloc"
                type="text"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
              />
            </div>{" "}
          </div>{" "}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "25px",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                flex: "1",
                borderRadius: "20px",
                backgroundColor: "#fff",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "100%",
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  height: "25px",
                  position: "relative",
                  lineHeight: "140%",
                  textAlign: "left",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
                placeholder="Numéro de maison"
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
            </div>{" "}
            <div
              style={{
                flex: "1",
                borderRadius: "20px",
                backgroundColor: "#fff",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "100%",
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  height: "25px",
                  position: "relative",
                  lineHeight: "140%",
                  textAlign: "left",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
                placeholder="Code postal"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>{" "}
            <div
              style={{
                flex: "1",
                borderRadius: "20px",
                backgroundColor: "#fff",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "100%",
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  height: "25px",
                  position: "relative",
                  lineHeight: "140%",
                  textAlign: "left",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
                placeholder="Type d'adresse"
                type="text"
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
              />
            </div>{" "}
          </div>{" "}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "25px",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                flex: "1",
                borderRadius: "20px",
                backgroundColor: "#fff",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px",
                maxWidth: "100%",
              }}
            >
              <input
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  height: "25px",
                  position: "relative",
                  lineHeight: "140%",
                  textAlign: "left",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
                placeholder="Type d'opération"
                type="text"
                value={operationType}
                onChange={(e) => setOperationType(e.target.value)}
              />
            </div>{" "}
            
            
          </div>{" "}
          
        </header>{" "}
        <button
          style={{
            marginTop:"240px",
            cursor: "pointer",
            border: "none",
            padding: "20px 22px 20px 20px",
            backgroundColor: "#54b848",
            width: "442px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            maxWidth: "100%",
            whiteSpace: "nowrap",
          }}
          type="submit"
        >
          <div
            style={{
              height: "65px",
              width: "442px",
              position: "relative",
              borderRadius: "20px",
              backgroundColor: "#54b848",
              display: "none",
              maxWidth: "100%",
            }}
          />{" "}
          <b
            style={{
              position: "relative",
              fontSize: "18px",
              lineHeight: "140%",
              fontFamily: "'DM Sans'",
              color: "#fff",
              textAlign: "center",
              zIndex: "1",
            }}
          >
            Ajouter l'adresse{" "}
          </b>{" "}
        </button>{" "}
      </form>
    </div>

        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default AddAddress;
