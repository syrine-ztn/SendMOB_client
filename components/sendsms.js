import Link from "next/link";
import React, { useState, useEffect } from 'react';
import axios from "axios";



const SendSMS = () => {

  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [contacts, setContacts] = useState([]);
  const [sendToLabels, setSendToLabels] = useState(true); // true for sending by labels, false for sending to specific contacts
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [stats, setStats] = useState({
    planChoisi: 0,
    tempsRestant: 0,
    totalSMS: 0,
    smsUtilises: 0,
    smsRestants: []
});

  useEffect(() => {
    const fetchStats = async() => {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:8000/statistiques/client/dashboard', {
              headers: {
                  Authorization: `${token}`
              }
          });
          setStats(response.data);
      } catch (error) {
          console.error('Erreur lors de la récupération des statistiques:', error);
      }
  };

  fetchStats();

    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/contacts/getAllContactsForClient', {
          headers: {
            Authorization: `${token}`
          }
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleCheckboxChange = (contactId) => {
    if (selectedRecipients.includes(contactId)) {
      setSelectedRecipients(selectedRecipients.filter((r) => r !== contactId));
    } else {
      setSelectedRecipients([...selectedRecipients, contactId]);
    }
  };

  const handleLabelCheckboxChange = (label) => {
    if (selectedRecipients.includes(label)) {
      setSelectedRecipients(selectedRecipients.filter((r) => r !== label));
    } else {
      setSelectedRecipients([...selectedRecipients, label]);
    }
  };

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const sendMessage = () => {
    const token = localStorage.getItem('token');
    const { tempsRestant, smsRestants } = stats;
    console.log(tempsRestant);
    console.log(smsRestants);

    // Vérifier si le bouton doit être désactivé
    if (tempsRestant <= 0 || smsRestants <= 0) {
      alert("Veuillez renouveler votre abonnement pour continuer à envoyer des messages.");
      setButtonDisabled(true);
      return;
    }

    const selectedContacts = contacts.filter(contact => selectedRecipients.includes(contact.contact_id) || selectedRecipients.includes(contact.label)); // Filter selected contacts

    const data = {
      message: message, // Assurez-vous que "message" est défini quelque part
      contacts: selectedContacts,
    };

    axios.post('http://localhost:8000/envoiSMS2/send-to-selected-contacts', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    .then(response => {
      // handle success
      console.log("Message envoyé avec succès !");
      alert("Message envoyé avec succès !");
    })
    .catch(error => {
      // handle error
      console.error("Une erreur s'est produite:", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    });
  };


  /*
  const [selectedRecipients, setSelectedRecipients] = useState([]);
const [inputValue, setInputValue] = useState('');
const [contacts, setContacts] = useState([]);

useEffect(() => {
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/contacts/getAllContactsForClient', {
        headers: {
          Authorization: `${token}`
        }
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  fetchContacts();
}, []);

const handleCheckboxChange = (label) => {
  if (selectedRecipients.includes(label)) {
    setSelectedRecipients(selectedRecipients.filter((r) => r !== label));
  } else {
    setSelectedRecipients([...selectedRecipients, label]);
  }
};

  

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const sendMessage = () => {
    const token = localStorage.getItem('token');
    const selectedContacts = contacts.filter(contact => selectedRecipients.includes(contact.label)); // Filter selected contacts
  
    const data = {
      message: message,
      contacts: selectedContacts,
    };
  
    axios.post('http://localhost:8000/envoiSMS2/send-to-selected-contacts', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    .then(response => {
      // handle success
      console.log("Message envoyé avec succès !");
      alert("Message envoyé avec succès !");
    })
    .catch(error => {
      // handle error
      console.error("Une erreur s'est produite:", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    });
  };
  */


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
        padding: "0px 34px 0px 0px",
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
              <a href="/dashboardpage"style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8' }}>
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
              </a>{" "}
              <a href="/sendsmspage"style={{textDecoration: 'none',cursor: 'pointer' }}>
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
                    margin: "0",
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="eager"
                  alt=""
                  src="/mingcute_send-fill.png"
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
              <a href="/clientspage"style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8' }}>
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
                <a href="/messagespage"style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8' }}>
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
              </a>{" "}
              <a href="/historyofpaymentpage"style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8' }}>
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
              </a>{" "}
              <a href="/reportpage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8' }}>
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
              </a>{" "}
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
              <a href="/settingspage"  style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8' }}>
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
              </a>{" "}
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
                <div href="/"  onClick={handleLogout}
                  style={{
                    position: "relative",
                    lineHeight: "30px",
                    fontWeight: "500",
                    cursor: 'pointer'
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
              top: "232px",
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
          minWidth: "992px",
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
            padding: "0px 1px 0px 0px",
            boxSizing: "border-box",
            gap: "34px",
            maxWidth: "100%",
          }}
        >
          <header
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
                flexShrink: "0",
              }}
            >
              <div
                style={{
                  position: "relative",
                  lineHeight: "24px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                Pages / Envoi des SMS{" "}
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
                  whiteSpace: "nowrap",
                }}
              >
                Création et Envoi des SMS{" "}
              </h2>{" "}
            </div>{" "}
            <div
              style={{
                height: "45.7px",
                width: "238.6px",
                position: "relative",
                display: "none",
                fontSize: "16px",
                color: "#b8b8b8",
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
                  display: "none",
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
                  display: "none",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "7px",
                }}
              >
                <img
                  style={{
                    height: "15px",
                    width: "15px",
                    position: "relative",
                  }}
                  alt=""
                  src="/search-icon.svg"
                />
                <div
                  style={{ height: "20px", flex: "1", position: "relative" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(50% - 10px)",
                      left: "0px",
                      lineHeight: "20px",
                      display: "inline-block",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    Recherche{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div
              style={{
                borderRadius: "30px",
                backgroundColor: "#fff",
                boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "11px 12px 12px 26px",
                gap: "20px",
              }}
            >
              <div
                style={{
                  height: "68px",
                  width: "220px",
                  position: "relative",
                  borderRadius: "30px",
                  backgroundColor: "#fff",
                  boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                  display: "none",
                }}
              />{" "}
              <a href="/notificationpage">
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
                />{" "}
              </a>{" "}
              <a href="/chatbotpage">
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
                />{" "}
              </a>{" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  padding: "0px 7px 0px 0px",
                }}
              >
                <a href='/helppage'>
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
              
              <a href="/settingspage">
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
                  src="/avatar-style-6@2x.png"
                />
              </a>{" "}
            </div>{" "}
          </header>{" "}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "150px",
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
                gap: "25px",
                maxWidth: "100%",
              }}
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  border: "1px solid #e7e7e7",
                  backgroundColor: "#fff",
                  height: "355px",
                  width: "auto",
                  outline: "none",
                  alignSelf: "stretch",
                  borderRadius: "20px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  padding: "20px",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                }}
                placeholder="Ecrivez votre SMS à envoyer *"
                rows={18}
                cols={76}
              />{" "}
             {/*dropdown list */}

            {/* <footer
  style={{
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '25px',
    maxWidth: '100%',
  }}
>
  <div
    style={{
      flex: '1',
      borderRadius: '20px',
      backgroundColor: '#fff',
      border: '1px solid #e7e7e7',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
      minWidth: '487px',
      gap: '20px',
      maxWidth: '100%',
    }}
  >
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '242px',
              border: 'none',
              outline: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '18px',
              backgroundColor: 'transparent',
              height: '25px',
              lineHeight: '140%',
              color: '#b8b8b8',
              textAlign: 'left',
              display: 'inline-block',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  height: '25px',
                  lineHeight: '140%',
                  color: '#b8b8b8',
                  textAlign: 'left',
                  display: 'inline-block',
                  width: '200px',
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Choisissez les destinataires *"
              />
              <img
                style={{
                  height: '14.1px',
                  width: '14.1px',
                  position: 'absolute',
                  right: '10px',
                  top: '6px',
                }}
                alt=""
                src="/Frame 48095625.png"
              />
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              position: 'absolute',
              top: '35px',
              left: '0',
              width: '200px',
              zIndex: '10',
              display: inputValue ? 'block' : 'none',
            }}
          >
            {contacts && contacts.length > 0 && (
              <div>
                {contacts
                  .filter((contact, index, self) => self.findIndex((c) => c.label === contact.label) === index)
                  .map((contact) => (
                    <label key={contact.contact_id} style={{ display: 'block', padding: '5px 10px' }}>
                      <input
                        type="checkbox"
                        value={contact.label}
                        checked={selectedRecipients.includes(contact.label)}
                        onChange={() => handleCheckboxChange(contact.label)}
                        style={{ marginRight: '5px' }}
                      />
                      {contact.label}
                    </label>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
             </footer>*/}
    {/*<footer
      style={{
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '25px',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          flex: '1',
          borderRadius: '20px',
          backgroundColor: '#fff',
          border: '1px solid #e7e7e7',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          minWidth: '487px',
          gap: '20px',
          maxWidth: '100%',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '10px' }}>
                <label>
                  <input
                    type="radio"
                    checked={sendToLabels}
                    onChange={() => setSendToLabels(true)}
                  />
                  Envoyer par Libellé
                </label>
              </div>
              <div style={{ marginRight: '10px' }}>
                <label>
                  <input
                    type="radio"
                    checked={!sendToLabels}
                    onChange={() => setSendToLabels(false)}
                  />
                  Envoyer à une liste pérsonnalisée
                </label>
              </div>
            </div>

            
          </div>
        </div>
      </div>
      
    </footer>
    <footer
      style={{
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '25px',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          flex: '1',
          borderRadius: '20px',
          backgroundColor: '#fff',
          border: '1px solid #e7e7e7',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          minWidth: '487px',
          gap: '20px',
          maxWidth: '100%',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative' }}>
           

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {sendToLabels ? (
                <div
                  style={{
                    width: '242px',
                    border: 'none',
                    outline: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '18px',
                    backgroundColor: 'transparent',
                    height: '25px',
                    lineHeight: '140%',
                    color: '#b8b8b8',
                    textAlign: 'left',
                    display: 'inline-block',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      style={{
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        height: '25px',
                        lineHeight: '140%',
                        color: '#b8b8b8',
                        textAlign: 'left',
                        display: 'inline-block',
                        width: '200px',
                      }}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Choisissez des libellés *"
                    />
                    <img
                      style={{
                        height: '14.1px',
                        width: '14.1px',
                        position: 'absolute',
                        right: '10px',
                        top: '6px',
                        cursor: 'pointer'
                      }}
                      alt=""
                      src="/Frame 48095625.png"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    />
                  </div>
                  <div
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      position: 'absolute',
                      top: '35px',
                      left: '0',
                      width: '200px',
                      zIndex: '10',
                      display: inputValue ? 'block' : 'none',
                    }}
                  >
                    {contacts && contacts.length > 0 && (
                      <div>
                        {contacts
                          .filter((contact, index, self) => self.findIndex((c) => c.label === contact.label) === index)
                          .map((contact) => (
                            <label key={contact.contact_id} style={{ display: 'block', padding: '5px 10px' }}>
                              <input
                                type="checkbox"
                                value={contact.label}
                                checked={selectedRecipients.includes(contact.label)}
                                onChange={() => handleLabelCheckboxChange(contact.label)}
                                style={{ marginRight: '5px' }}
                              />
                              {contact.label}
                            </label>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: '242px',
                    border: 'none',
                    outline: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '18px',
                    backgroundColor: 'transparent',
                    height: '25px',
                    lineHeight: '140%',
                    color: '#b8b8b8',
                    textAlign: 'left',
                    display: 'inline-block',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      style={{
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        height: '25px',
                        lineHeight: '140%',
                        color: '#b8b8b8',
                        textAlign: 'left',
                        display: 'inline-block',
                        width: '200px',
                      }}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Choisissez des contacts *"
                    />
                    <img
                      style={{
                        height: '14.1px',
                        width: '14.1px',
                        position: 'absolute',
                        right: '10px',
                        top: '6px',
                        cursor: 'pointer'
                      }}
                      alt=""
                      src="/Frame 48095625.png"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    />
                  </div>
                  <div
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      position: 'absolute',
                      top: '35px',
                      left: '0',
                      width: '200px',
                      zIndex: '10',
                      display: inputValue ? 'block' : 'none',
                    }}
                  >
                    {contacts && contacts.length > 0 && (
                      <div>
                        {contacts
                          .filter((contact) =>
                            contact.nom.toLowerCase().includes(inputValue.toLowerCase()) ||
                            contact.prenom.toLowerCase().includes(inputValue.toLowerCase()) ||
                            contact.numero_telephone.includes(inputValue)
                          )
                          .map((contact) => (
                            <label key={contact.contact_id} style={{ display: 'block', padding: '5px 10px' }}>
                              <input
                                type="checkbox"
                                value={contact.contact_id}
                                checked={selectedRecipients.includes(contact.contact_id)}
                                onChange={() => handleCheckboxChange(contact.contact_id)}
                                style={{ marginRight: '5px' }}
                              />
                              {contact.nom} {contact.prenom} - {contact.numero_telephone}
                            </label>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </footer> */}

<footer
      style={{
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '25px',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          flex: '1',
          borderRadius: '20px',
          backgroundColor: '#fff',
          border: '1px solid #e7e7e7',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          minWidth: '487px',
          gap: '20px',
          maxWidth: '100%',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '10px' }}>
                <label>
                  <input
                    type="radio"
                    checked={sendToLabels}
                    onChange={() => setSendToLabels(true)}
                  />
                  Envoyer par Libellé
                </label>
              </div>
              <div style={{ marginRight: '10px' }}>
                <label>
                  <input
                    type="radio"
                    checked={!sendToLabels}
                    onChange={() => setSendToLabels(false)}
                  />
                  Liste de contacts pérsonnalisée
                </label>
              </div>
            </div>

            
          </div>
        </div>
      </div>
</footer>

<footer
      style={{
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '25px',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          flex: '1',
          borderRadius: '20px',
          backgroundColor: '#fff',
          border: '1px solid #e7e7e7',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          minWidth: '487px',
          gap: '20px',
          maxWidth: '100%',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {sendToLabels ? (
                <div
                  style={{
                    width: '242px',
                    border: 'none',
                    outline: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '18px',
                    backgroundColor: 'transparent',
                    height: '25px',
                    lineHeight: '140%',
                    color: '#b8b8b8',
                    textAlign: 'left',
                    display: 'inline-block',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      style={{
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        height: '25px',
                        lineHeight: '140%',
                        color: '#b8b8b8',
                        textAlign: 'left',
                        display: 'inline-block',
                        width: '200px',
                      }}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Choisissez des libellés *"
                    />
                    <img
                      style={{
                        height: '14.1px',
                        width: '14.1px',
                        position: 'absolute',
                        right: '10px',
                        top: '6px',
                        cursor: 'pointer' // Add cursor pointer to indicate it's clickable
                      }}
                      alt=""
                      src="/Frame 48095625.png"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility on click
                    />
                  </div>
                  <div
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      position: 'absolute',
                      top: '35px',
                      left: '0',
                      width: '200px',
                      zIndex: '10',
                      display: isDropdownOpen ? 'block' : 'none', // Use isDropdownOpen to control visibility
                      maxHeight: '200px', // Set max height for scrollability
                      overflowY: 'auto', // Enable vertical scroll if content exceeds maxHeight
                    }}
                  >
                    {contacts && contacts.length > 0 && (
                      <div>
                        {contacts
                          .filter((contact, index, self) => self.findIndex((c) => c.label === contact.label) === index)
                          .map((contact) => (
                            <label key={contact.contact_id} style={{ display: 'block', padding: '5px 10px' }}>
                              <input
                                type="checkbox"
                                value={contact.label}
                                checked={selectedRecipients.includes(contact.label)}
                                onChange={() => handleLabelCheckboxChange(contact.label)}
                                style={{ marginRight: '5px' }}
                              />
                              {contact.label}
                            </label>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: '242px',
                    border: 'none',
                    outline: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '18px',
                    backgroundColor: 'transparent',
                    height: '25px',
                    lineHeight: '140%',
                    color: '#b8b8b8',
                    textAlign: 'left',
                    display: 'inline-block',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      style={{
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        height: '25px',
                        lineHeight: '140%',
                        color: '#b8b8b8',
                        textAlign: 'left',
                        display: 'inline-block',
                        width: '200px',
                      }}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Choisissez des contacts *"
                    />
                    <img
                      style={{
                        height: '14.1px',
                        width: '14.1px',
                        position: 'absolute',
                        right: '10px',
                        top: '6px',
                        cursor: 'pointer' // Add cursor pointer to indicate it's clickable
                      }}
                      alt=""
                      src="/Frame 48095625.png"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility on click
                    />
                  </div>
                  <div
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      position: 'absolute',
                      top: '35px',
                      left: '0',
                      width: '200px',
                      zIndex: '10',
                      display: isDropdownOpen ? 'block' : 'none', // Use isDropdownOpen to control visibility
                      maxHeight: '200px', // Set max height for scrollability
                      overflowY: 'auto', // Enable vertical scroll if content exceeds maxHeight
                    }}
                  >
                    {contacts && contacts.length > 0 && (
                      <div>
                        {contacts
                          .filter((contact) =>
                            contact.nom.toLowerCase().includes(inputValue.toLowerCase()) ||
                            contact.prenom.toLowerCase().includes(inputValue.toLowerCase()) ||
                            contact.numero_telephone.includes(inputValue)
                          ).map((contact) => (
                            <label key={contact.contact_id} style={{ display: 'block', padding: '5px 10px' }}>
                              <input
                                type="checkbox"
                                value={contact.contact_id}
                                checked={selectedRecipients.includes(contact.contact_id)}
                                onChange={() => handleCheckboxChange(contact.contact_id)}
                                style={{ marginRight: '5px' }}
                              />
                              {contact.nom} {contact.prenom} - {contact.numero_telephone}
                            </label>
                          ))
                        }
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
</footer>

            </div>{" "}
            
              <button

                onClick={sendMessage}
                style={{
                  cursor: "pointer",
                  border: "none",
                  padding: "20px 21px 20px 20px",
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
                  marginTop:"-70px",
                }}
                disabled={buttonDisabled} 
              >
                
                <div
                  style={{
                    height: "65px",
                    width: "442px",
                    position: "relative",
                    borderRadius: "20px",
                    backgroundColor: buttonDisabled ? "#ccc" : "#54b848", // Gris si désactivé, vert si activé
                    display: "none",
                    maxWidth: "100%",
                  }}
                />
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
                  Envoyer le message{" "}
                </b>{" "}
              </button>{" "}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default SendSMS;
