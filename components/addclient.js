import React, { useState , useEffect } from "react";
import axios from "axios";



const AddClient = () => {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");
  const [label, setLabel] = useState("");
  const [token, setToken] = useState("");
  const [clientId, setClientId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Retrieve token and clientId from localStorage
    const storedToken = localStorage.getItem('token');
    const storedClientId = localStorage.getItem('userId');
    setToken(storedToken);
    setClientId(storedClientId);
  }, []);

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      nom,
      prenom,
      numero_telephone: numeroTelephone,
      label,
      date_ajout: new Date(),
      client_id: clientId
    };

    try {
      const response = await axios.post('http://localhost:8000/contacts/createContact', contactData, {
        headers: {
          Authorization: token
        }
      });

      // Reset form after successful submission
      setNom("");
      setPrenom("");
      setNumeroTelephone("");
      setLabel("");

      alert('Contact added successfully!');
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('Failed to add contact');
    }
  }; */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si le numéro de téléphone est valide
    if (!/^06\d{8}$/.test(numeroTelephone)) {
      setError("Le numéro de téléphone doit être de 10 caractères et commencer par 06.");
      return;
    }

    const contactData = {
      nom,
      prenom,
      numero_telephone: numeroTelephone,
      label,
      date_ajout: new Date().toISOString().split('T')[0], // Formater la date
      client_id: clientId
    };

    try {
      // Vérifier les doublons de numéros de téléphone
      const existingContactsResponse = await axios.get(`http://localhost:8000/contacts/getAllContactsForClient`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const existingContacts = existingContactsResponse.data;
      const isDuplicatePhoneNumber = existingContacts.some(existingContact => existingContact.numero_telephone === numeroTelephone);

      if (isDuplicatePhoneNumber) {
        setError("Le numéro de téléphone existe déjà.");
        return;
      }

      const response = await axios.post('http://localhost:8000/contacts/createContact', contactData, {
        headers: {
          Authorization: token
        }
      });

      // Reset form after successful submission
      setNom("");
      setPrenom("");
      setNumeroTelephone("");
      setLabel("");
      setError(""); // Reset error

      alert('Contact ajouté avec succès!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact:', error);
      alert('Échec de l\'ajout du contact');
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
              <a href="/clientspage" style={{textDecoration: 'none',cursor: 'pointer' }}>
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
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="eager"
                  alt=""
                  src="/icroundpermcontactcalendar.svg"
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
              top: "299px",
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
                <a href="/clientspage" style={{textDecoration: 'none',cursor: 'pointer' }}>
                Pages / Contacts / Ajouter un contact{" "} </a>
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
                Ajouter un nouveau contact{" "}
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
            width:"1410px",
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
                placeholder="Nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
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
                placeholder="Prénom"
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
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
                placeholder="Libellé"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
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
                placeholder="Numéro de téléphone"
                type="text"
                value={numeroTelephone}
                onChange={(e) => setNumeroTelephone(e.target.value)}
              />
            </div>{" "}
          </div>{" "}
          
        </header>{" "}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          style={{
            marginTop:"400px",
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
            Ajouter le contact{" "}
          </b>{" "}
        </button>{" "}
      </form>
    </div>

        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default AddClient;
