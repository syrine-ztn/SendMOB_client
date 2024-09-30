import Link from "next/link";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/historique_paiements_interface.module.css';


const Report = () => {

  const [signalements, setSignalements] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const messagesPerPage = 6;

  const [isFrameVisible, setIsFrameVisible] = useState(false);
  const [selectedSignalementId, setSelectedSignalementId] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');

  const visibilityClick = (signalementId) => {
    setIsFrameVisible((prevVisibility) => !prevVisibility);
    setSelectedSignalementId(signalementId);

    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8000/signalements/getSignalementById/${signalementId}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => setPopupMessage(response.data.entete))
      .catch(error => console.error('Error fetching signalement details:', error));
  };

  const handlePopUpClick = (elementId) => {
    switch (elementId) {
      case 'rectangle4429':
        setIsFrameVisible(!isFrameVisible);
        break;
      case 'phX':
        setIsFrameVisible(false);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const fetchSignalements = async () => {
      try {
        const token = localStorage.getItem('token');
        const response1 = await axios.get(`http://localhost:8000/signalements/getSignalementsOfClient/`, {
          headers: {
            Authorization: token,
          },
        });
        const response = await axios.get(`http://localhost:8000/signalements/getSignalementsOfClient/${page}`, {
          headers: {
            Authorization: token,
          },
        });
        setSignalements(response.data);

        const totalCount = response1.data.length; // Adjust this according to your API response
        const totalPagesCount = Math.ceil(totalCount / messagesPerPage);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error("Error fetching signalements:", error);
      }
    };

    fetchSignalements();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
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
        padding: "0px 33px 0px 0px",
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
              < a href="/reportpage" style={{textDecoration: 'none',cursor: 'pointer'}}>
              <div
                style={{
                  alignSelf: "stretch",
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
                  src="/material-symbols_warning-rounded.png"
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
              <div  onClick={handleLogout}
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
              bottom: "331px",
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
          minWidth: "993px",
          maxWidth: "100%",
          textAlign: "left",
          fontSize: "18px",
          color: "#707eae",
          fontFamily: "'DM Sans'",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            padding: "0px 0px 0px 2px",
            boxSizing: "border-box",
            gap: "20px",
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
                }}
              >
                Pages / Signaler un problème{" "}
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
                Signalements et rapports{" "}
              </h2>{" "}
            </div>{" "}
            <div
              style={{
                width: "472px",
                borderRadius: "30px",
                backgroundColor: "#fff",
                boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "11px 10px 12px 12px",
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
                  gap: "8px",
                  minWidth: "90px",
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
                  gap: "20px",
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
                  src="/notifications-none1.svg"
                />
                </a>
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
                />
                </a>
                
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "0px 7px 0px 0px",
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
                    src="/info-outline.svg"
                  />
                  </a>
                </div>
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
          </div>{" "}
          <button
            style={{
              cursor: "pointer",
              border: "none",
              padding: "13px 4px",
              backgroundColor: "#fff",
              borderRadius: "20px",
              boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a href="/sendreportpage" style={{textDecoration:"none", color:"#344767"}}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "0px 13px",
                gap: "5px",
              }}
            >
              <img
                style={{
                  height: "24px",
                  width: "24px",
                  position: "relative",
                  overflow: "hidden",
                  flexShrink: "0",
                  minHeight: "24px",
                }}
                alt=""
                src="/ic_round-report-gmailerrorred.png"
              />
              <div
                style={{
                  position: "relative",
                  fontSize: "18px",
                  fontWeight: "500",
                  fontFamily: "'DM Sans'",
                  color: "#344767",
                  textAlign: "right",
                }}
              >
                Envoyer un rapport{" "}
              </div>{" "}
            </div>{" "}
            </a>
          </button>{" "}
          {/*table */}
          {/*<div
      style={{
        width: "1525px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
        overflowX: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "15px 0px",
        boxSizing: "border-box",
        gap: "5px",
        maxWidth: "100%",
        color: "#344767",
      }}
    >
      <div
        style={{
          width: "1525px",
          borderRadius: "5px 5px 0px 0px",
          backgroundColor: "#fff",
          overflowX: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0px 0px 0px 35px",
          boxSizing: "border-box",
          gap: "10px",
          flexShrink: "0",
        }}
      >
        <div
          style={{
            width: "290px",
            flexShrink: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "12px 10px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ position: "relative" }}>Signalement ID</div>{" "}
        </div>{" "}
        <div
          style={{
            height: "38px",
            width: "560px",
            flexShrink: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "12px 10px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              height: "23px",
              position: "relative",
              display: "inline-block",
            }}
          >
            Entete{" "}
          </div>{" "}
        </div>{" "}
        <div
          style={{
            height: "38px",
            width: "230px",
            flexShrink: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "12px 10px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ position: "relative" }}>Date d’envoi</div>{" "}
        </div>{" "}
        <div
          style={{
            height: "38px",
            width: "210px",
            flexShrink: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 10px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ position: "relative" }}>Action</div>{" "}
        </div>{" "}
      </div>{" "}
      <img
        style={{ width: "1525px", height: "1px", position: "relative" }}
        loading="eager"
        alt=""
        src="/vector-2.svg"
      />
      {signalements.map(signalement => (
        <div
          key={signalement.signalement_id}
          style={{
            width: "1300px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            flexShrink: "0",
            textAlign: "left",
            paddingLeft:"35px",
            fontSize: "18px",
            color: "#344767",
            fontFamily: "'DM Sans'",
          }}
        >
          <div
            style={{
              width: "290px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "12px 10px",
              boxSizing: "border-box",
            }}
          >
            {signalement.signalement_id}
          </div>{" "}
          <div
            style={{
              height: "38px",
              width: "650px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: "80px",
              boxSizing: "border-box",
              overflow:"hidden", 
              textWrap:"nowrap", 
              textOverflow:"ellipsis"

            }}
          >
            {signalement.entete}
          </div>{" "}
          <div
            style={{
              height: "38px",
              width: "410px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "12px 130px",
              boxSizing: "border-box",
            }}
          >
            {signalement.date_envoi}
          </div>{" "}
          <div
            style={{
              height: "38px",
              width: "210px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 10px",
              boxSizing: "border-box",
            }}
          >
            <img
                style={{ width: "24px", height: "24px", overflow: "hidden", flexShrink: "0" }}
                src="/octiconeye24.svg"
                alt=""
              />
          </div>{" "}
        </div>
      ))}
      <Pagination
          handlePageChange={handlePageChange}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={page}
          totalPages={totalPages}
        />
    </div>*/}
    <div
  style={{
    position: 'absolute',
    marginTop: '130px',
    marginRight: '500px',
    width: '657px',
    height: '435px',
    display: isFrameVisible ? 'block' : 'none',
    zIndex:'2'
  }}
>
  <div
    style={{
      position: 'absolute',
      width: '957px',
      height: '335px',
      marginTop: '100px',
      marginRight: '1000px',
      background: '#FFFFFF',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
      borderRadius: '20px'
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: '26px',
        height: '26px',
        marginTop: '15px',
        marginLeft: '910px',
        backgroundImage: 'url(X.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center'
      }}
      onClick={() => handlePopUpClick('phX')}
    ></div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0px',
        gap: '30px',
        position: 'absolute',
        width: '857px',
        height: '235px',
        left: '50px',
        top: '30px'
      }}
    >
      <p
        style={{
          fontFamily: 'DM Sans',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '27px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'left',
          color: '#344767',
          flex: 'none',
          order: '1',
          flexGrow: '0'
        }}
      >
        {popupMessage}
      </p>
    </div>
  </div>
</div>;

   <div
  style={{
    width: "1425px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: "15px 0px",
    boxSizing: "border-box",
    gap: "5px",
    color: "#344767",
  }}
>
  <div
    style={{
      width: "1425px",
      borderRadius: "5px 5px 0px 0px",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: "0px 0px 0px 35px",
      boxSizing: "border-box",
      gap: "10px",
      flexShrink: "0",
    }}
  >
    <div
      style={{
        width: "200px",
        flexShrink: "0",
        display: "flex",
        flexDirection: "row",
        padding: "12px 10px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "relative" }}>Signalement ID</div>{" "}
    </div>{" "}
    <div
      style={{
        height: "38px",
        width: "250px",
        flexShrink: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: "12px 10px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "relative" }}>Objet</div>{" "}
    </div>{" "}
    <div
      style={{
        height: "38px",
        width: "550px",
        flexShrink: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: "12px 10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: "23px",
          position: "relative",
          display: "inline-block",
        }}
      >
        Entete{" "}
      </div>{" "}
    </div>{" "}
    <div
      style={{
        height: "38px",
        width: "210px",
        flexShrink: "0",
        display: "flex",
        flexDirection: "row",
        padding: "12px 10px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "relative" }}>Date d’envoi</div>{" "}
    </div>{" "}
    <div
      style={{
        height: "38px",
        width: "210px",
        flexShrink: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: "12px 10px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "relative" }}>Action</div>{" "}
    </div>{" "}
  </div>{" "}
  <img
    style={{ width: "1525px", height: "1px", position: "relative" }}
    loading="eager"
    alt=""
    src="/vector-2.svg"
  />
  {signalements.map(signalement => (
    
    <div
      key={signalement.signalement_id}
      style={{
        width: "1200px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        flexShrink: "0",
        textAlign: "left",
        paddingLeft: "35px",
        fontSize: "18px",
        color: "#344767",
        fontFamily: "'DM Sans'",
      }}
    >
      <div
        style={{
          width: "200px",
          flexShrink: "0",
          display: "flex",
          flexDirection: "row",
          padding: "12px 10px",
          boxSizing: "border-box",
        }}
      >
        {signalement.signalement_id}
      </div>{" "}
      <div
        style={{
          height: "38px",
          width: "250px",
          flexShrink: "0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: "12px 10px",
          boxSizing: "border-box",
        }}
      >
        {signalement.objet}
      </div>{" "}
      <div
        style={{
          height: "38px",
          width: "580px",
          flexShrink: "0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: "12px 10px",
          boxSizing: "border-box",
          overflow: "hidden",
          textWrap: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {signalement.entete}
      </div>{" "}
      <div
        style={{
          height: "38px",
          width: "210px",
          flexShrink: "0",
          display: "flex",
          flexDirection: "row",
          padding: "12px 10px",
          boxSizing: "border-box",
        }}
      >
        {signalement.date_envoi}
      </div>{" "}
      <div
        style={{
          height: "38px",
          width: "210px",
          flexShrink: "0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: "12px 10px",
          boxSizing: "border-box",
          cursor: "pointer"

        }}
      >
        <button style={{backgroundColor:"white", border:"none", cursor:"pointer"}} onClick={() => visibilityClick(signalement.signalement_id)}>
        
        <img
          style={{
            width: "24px",
            height: "24px",
            overflow: "hidden",
            flexShrink: "0",
          }}
          src="/octiconeye24.svg"
          alt=""
        />
        </button>
      </div>{" "}
    </div>
  ))}
  <Pagination
    handlePageChange={handlePageChange}
    handlePrevPage={handlePrevPage}
    handleNextPage={handleNextPage}
    currentPage={page}
    totalPages={totalPages}
  />
</div>




          
        </div>{" "}
      </section>{" "}
    </div>
  );
};

const Pagination = ({ handlePageChange, handlePrevPage, handleNextPage, currentPage, totalPages }) => (
  <div className={styles.page}>
    <div className={styles.chevronDown}>
      <button onClick={handlePrevPage}></button>
    </div>
    <div className={styles.circle}>
      <div className={styles.text1}>{currentPage}</div>
      {currentPage > 1 && <button onClick={() => handlePageChange(currentPage - 1)}></button>}
    </div>
    <div className={styles.circle2}>
      <div className={styles.text2}>{currentPage + 1}</div>
      {currentPage + 1 <= totalPages && <button onClick={() => handlePageChange(currentPage + 1)}></button>}
    </div>
    <div className={styles.circle3}>
      <div className={styles.text3}>{currentPage + 2}</div>
      {currentPage + 2 <= totalPages && <button onClick={() => handlePageChange(currentPage + 2)}></button>}
    </div>
    <div className={styles.chevronUp}>
      <button onClick={handleNextPage}></button>
    </div>
  </div>
);

export default Report;
