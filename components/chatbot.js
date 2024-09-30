import React, { useState } from "react";


const Chatbot = () => {
  
  const handleLogout = () => {
    // Supprimer le token JWT du stockage local
    localStorage.removeItem('token');
    // Rediriger vers la page de connexion
    window.location.href = '/';
  };
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleMessageSubmit = async () => {
    if (!inputValue.trim()) return;

    // Add user message to the messages state
    const newUserMessage = {
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "user"
    };

    // Set new state using callback to ensure correct update
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputValue("");

    // Call the API
    const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: "user",
        message: inputValue,
      }),
    });

    // Get and add bot response to messages state
    const responseData = await response.json();
    if (responseData && responseData.length > 0 && responseData[0].text) {
      const botResponse = responseData[0].text;
      const newBotMessage = {
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sender: "bot", // Ajoutez le sender si nécessaire
      };
    
      // Mettre à jour l'état des messages avec la nouvelle réponse du bot
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    } else {
      // Gérer le cas où responseData[0].text est indéfini ou non présent
      console.error("Réponse de l'API invalide ou vide");
      // Vous pouvez également afficher un message à l'utilisateur ou prendre une autre action appropriée
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
        padding: "0px 30px 0px 0px",
        boxSizing: "border-box",
        gap: "31px",
        letterSpacing: "normal",
        textAlign: "left",
        fontSize: "20px",
        color: "#b8b8b8",
        fontFamily: "'DM Sans'",
      }}
    >
      <div
        style={{
          height: "844px",
          width: "329px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "60px 38px 60px 40px",
          boxSizing: "border-box",
          gap: "60px",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            width: "124px",
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
            <a href="/dashboardpage" style={{textDecoration: 'none',cursor: 'pointer',  color: '#B8B8B8' }}>

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
            <a href="/sendsmspage"style={{textDecoration: 'none',cursor: 'pointer',  color: '#B8B8B8' }}>
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
            <a href="/clientspage"style={{textDecoration: 'none',cursor: 'pointer',  color: '#B8B8B8' }}>
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
            <a href="/messagespage"style={{textDecoration: 'none',cursor: 'pointer',  color: '#B8B8B8' }}>
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
            <a href="/historyofpaymentpage"style={{textDecoration: 'none',cursor: 'pointer',  color: '#B8B8B8' }}>
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
                src="/octiconhistory1611.svg"
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
            <a href="/reportpage"style={{textDecoration: 'none',cursor: 'pointer',  color: '#B8B8B8' }}>
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
                <a href="/settingspage"style={{textDecoration: 'none',cursor: 'pointer',  color: '#B8B8B8' }}>
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
            <div href="/"  onClick={handleLogout}
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
      <section
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "42px 0px 0px",
          boxSizing: "border-box",
          minWidth: "994px",
          maxWidth: "100%",
          textAlign: "left",
          fontSize: "18px",
          color: "#4c4c66",
          fontFamily: "'DM Sans'",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "0px 5px 0px 0px",
            boxSizing: "border-box",
            gap: "35px",
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
                Pages / Assistance Client{" "}
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
                Assistance Virtuelle{" "}
              </h2>{" "}
            </div>{" "}
            <div
              style={{
                width: "475px",
                borderRadius: "30px",
                backgroundColor: "#fff",
                boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "11px 7px 12px 12px",
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
                  gap: "8px",
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
                    width: "75px",
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
                  gap: "21px",
                }}
              >
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
                  src="/notifications-none3.svg"
                />
                </a>
                
                <div
                  style={{
                    height: "24px",
                    width: "24px",
                    position: "relative",
                    zIndex: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      height: "100%",
                      width: "100%",
                      zIndex: "1",
                      objectFit: "contain",
                      position: "absolute",
                      left: "0px",
                      top: "0px",
                      transform: "scale(1.667)",
                    }}
                    alt=""
                    src="/notifications-none-1.svg"
                  />
                </div>{" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "0px 5px 0px 0px",
                  }}
                >
                  <a href="/helppage">
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
                    src="/info-outline1.svg"
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
                </a>
              </div>{" "}
            </div>{" "}
          </header>{" "}
         
      {/*chatbot interface*/}

      <div
      style={{
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        maxWidth: "100%",
        overflowY: "auto",

      }}
    >
      <div
        style={{
          flex: "1",
          borderRadius: "0px 12px 12px 0px",
          boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            borderRadius: "20px 20px 0px 0px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "8px 16px",
            boxSizing: "border-box",
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "25px",
              backgroundColor: "#f4f7fe",
              overflow: "hidden",
              flexShrink: "0",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px 4px",
              boxSizing: "border-box",
            }}
          >
            <img
              style={{
                height: "20px",
                width: "16px",
                position: "relative",
              }}
              loading="eager"
              alt=""
              src="/vector1.svg"
            />
          </div>{" "}
          <b
            style={{
              flex: "1",
              position: "relative",
              lineHeight: "20px",
              display: "inline-block",
              maxWidth: "calc(100% - 56px)",
            }}
          >
            Assistant virtuel SendMOB{" "}
          </b>{" "}
        </div>{" "}
        <div
          style={{
            alignSelf: "stretch",
            borderRadius: "0px 0px 20px 20px",
            backgroundColor: "#efefef",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "24px 40px",
            boxSizing: "border-box",
            gap: "16px",
            height: "603px",
            color: "#fff",
            
            overflowY: "auto"
          }}
        >
          <div
          
  
          >

          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
                display: "inline-block",
                marginBottom: "8px",

              }}
            >
              <div
                style={{
                  backgroundColor: message.sender === "user" ? "#54b848" : "#fff",
                  color: message.sender === "user" ? "#fff" : "#344767",
                  borderRadius: "20px",
                  padding: "12px 16px",
                  maxWidth: "80%", // Adjusted width for message text
                }}
              >
                {message.text}
              </div>
              <div
                style={{
                  color: "#888",
                  fontSize: "12px",
                  marginTop: "4px",
                  textAlign: message.sender === "user" ? "right" : "left",
                }}
              >
                {message.time}
              </div>
            </div>
          ))}
          <div
            style={{
              alignSelf: "stretch",
              height: "56px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "8px 16px",
              boxSizing: "border-box",
              gap: "16px",
              maxWidth: "100%",
              
            }}
          >
            <input
              style={{
                width: "calc(100% - 56px)",
                border: "none",
                outline: "none",
                fontFamily: "Inter",
                fontSize: "16px",
                backgroundColor: "transparent",
                height: "20px",
                flex: "1",
                position: "relative",
                lineHeight: "20px",
                textAlign: "left",
                display: "inline-block",
                minWidth: "150px",
                maxWidth: "calc(100% - 40px)",
              }}
              placeholder="Message"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <img
              style={{
                height: "24px",
                width: "24px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
                cursor: "pointer",
              }}
              alt=""
              src="/send-icon.svg"
              onClick={handleMessageSubmit}
            />
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>


        </div>{" "}
      </section>{" "}
      <div
        style={{
          width: "340px",
          display: "none",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "20px",
          maxWidth: "100%",
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
    </div>
  );
};

export default Chatbot;
