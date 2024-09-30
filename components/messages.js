import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/historique_paiements_interface.module.css';


const Messages = () => {

  const [smsList, setSMSList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const messagesPerPage = 6;

  const [isFrameVisible, setIsFrameVisible] = useState(false);
  const [selectedSMSId, setSelectedSMSId] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');

  const visibilityClick = (smsId) => {
    setIsFrameVisible((prevVisibility) => !prevVisibility);
    setSelectedSMSId(smsId);

    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8000/gestionSMS/getSMSById/${smsId}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => setPopupMessage(response.data.entete))
      .catch(error => console.error('Error fetching sms details:', error));
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
    /*const fetchSMSList = async () => {
      try {
        const token = localStorage.getItem('token');
        const response1 = await axios.get(`http://localhost:8000/gestionSMS/getSMSForClient`, {
          headers: {
            Authorization: token,
          },
        });
        const response = await axios.get(`http://localhost:8000/gestionSMS/getSMSForClient/${page}`, {
          headers: {
            Authorization: token,
          },
        });
        setSMSList(response.data);
        
        const totalCount = response1.data.length;
        const totalPagesCount = Math.ceil(totalCount / messagesPerPage);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error("Error fetching SMS list:", error);
      }
    };*/


    const fetchSMSList = async () => {
      try {
        const token = localStorage.getItem('token');
    
        // Fetch all SMS data without pagination for totalCount
        const response1 = await axios.get(`http://localhost:8000/gestionSMS/getSMSForClient`, {
          headers: {
            Authorization: token,
          },
        });
    
        // Fetch paginated SMS data for current page
        const response = await axios.get(`http://localhost:8000/gestionSMS/getSMSForClient/${page}`, {
          headers: {
            Authorization: token,
          },
        });
    
        // Calculate total pages based on total count of SMS
        const totalCount = response1.data.length;
        const totalPagesCount = Math.ceil(totalCount / messagesPerPage);
        setTotalPages(totalPagesCount);
    
        // Function to filter unique SMS based on criteria
        const filterUniqueSMS = (smsList) => {
          const uniqueSMS = [];
          const encounteredSMS = new Set();
    
          smsList.forEach(sms => {
            const key = `${sms.heure_envoi}_${sms.date_envoi}_${sms.entete}_${sms.client_id}_${sms.status}`;
            if (!encounteredSMS.has(key)) {
              encounteredSMS.add(key);
              uniqueSMS.push(sms);
            }
          });
    
          return uniqueSMS;
        };
    
        // Filter unique SMS messages based on multiple criteria
        const uniqueSMSList = filterUniqueSMS(response.data);
    
        // Set unique SMS list to state
        setSMSList(uniqueSMSList);
      } catch (error) {
        console.error("Error fetching SMS list:", error);
      }
    };
    

    fetchSMSList();
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



  /*const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/gestionSMS/getSMSForClient', {
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      setMessages(response.data);
    })
    .catch(error => {
      setError("Une erreur s'est produite lors de la récupération des messages.");
    });
  }, []); */

  const handleLogout = () => {
    // Supprimer le token JWT du stockage local
    localStorage.removeItem('token');
    // Rediriger vers la page de connexion
    window.location.href = '/';
  };

  return (
    <div
      style={{
        width: "1920px",
        backgroundColor: "#f4f7fe",
        height: "844px",
        overflow: "hidden",
        textAlign: "left",
        fontSize: "18px",
        color: "#344767",
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
          color: "#707eae",
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
            Pages / Boite d’ envoi{" "}
          </div>{" "}
          <b
            style={{
              position: "relative",
              fontSize: "34px",
              lineHeight: "42px",
              color: "#2b3674",
            }}
          >
            Mes messages{" "}
          </b>{" "}
        </div>{" "}
        <div
          style={{
            width: "470px",
            position: "relative",
            height: "68px",
            fontSize: "16px",
            color: "#b8b8b8",
            right:"90px"
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
              <a href='/notificationpage'>
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
          top: "130px",
          left: "1300px",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          gap: "0px 12px",
          textAlign: "right",
        }}
      >
        <div
          style={{
            width: "226px",
            borderRadius: "20px",
            backgroundColor: "#fff",
            boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
            height: "50px",
            overflow: "hidden",
            flexShrink: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "4px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              flex: "1",
              height: "24px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0px 13px",
              boxSizing: "border-box",
            }}
          >
            <img
              style={{
                width: "24px",
                position: "relative",
                height: "24px",
                overflow: "hidden",
                flexShrink: "0",
              }}
              alt=""
              src="/solarcalendaroutline1.svg"
            />
            <div style={{ position: "relative", fontWeight: "500" }}>
              Date de paiement{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div
          style={{
            width: "130px",
            borderRadius: "20px",
            backgroundColor: "#fff",
            boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
            height: "50px",
            overflow: "hidden",
            flexShrink: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "4px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              flex: "1",
              height: "24px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0px 13px",
              boxSizing: "border-box",
            }}
          >
            <img
              style={{
                width: "24px",
                position: "relative",
                height: "24px",
                overflow: "hidden",
                flexShrink: "0",
              }}
              alt=""
              src="/pajamasstatus.svg"
            />
            <div style={{ position: "relative", fontWeight: "500" }}>
              Status{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div
          style={{
            width: "50px",
            borderRadius: "20px",
            backgroundColor: "#fff",
            boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
            height: "50px",
            overflow: "hidden",
            flexShrink: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px",
            boxSizing: "border-box",
          }}
        >
          <img
            style={{ width: "24px", position: "relative", height: "24px" }}
            alt=""
            src="/fluentarrowexportup20regular.svg"
          />
        </div>{" "}
        <div
          style={{
            width: "50px",
            borderRadius: "20px",
            backgroundColor: "#fff",
            boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
            height: "50px",
            overflow: "hidden",
            flexShrink: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "24px",
              position: "relative",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                position: "absolute",
                left: "1px",
                top: "0px",
                transform: "scale(1.442)",
              }}
              alt=""
              src="/fluentarrowexportup20regular-1.svg"
            />
          </div>{" "}
        </div>{" "}
      </div>{" "}

      {/*table */}

      <div
  style={{
    position: 'absolute',
    marginTop: '180px',
    marginLeft: '600px',
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
      marginRight: '500px',
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
        position: "absolute",
        top: "200px",
        left: "360px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        gap: "20px 0px",
      }}
    >
      <div
        style={{
          width: "1450px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "15px 0px",
          boxSizing: "border-box",
          gap: "5px 0px",
        }}
      >
        <div
          style={{
            borderRadius: "5px 5px 0px 0px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "10px 0px 30px 35px",
            gap: "0px 10px",
          }}
        >
          <div style={{ position: "relative", width: "165px" }}>SMS ID</div>
          <div style={{ position: "relative", width: "550px" }}>Entete</div>
          <div style={{ position: "relative", width: "210px" }}>Heure d’envoi</div>
          <div style={{ position: "relative", width: "210px" }}>Date d’envoi</div>
          <div style={{ position: "relative", width: "130px" }}>Status</div>
          <div style={{ position: "relative", width: "100px" }}>Action</div>
        </div>
        {smsList.map((sms) => (
          <div
            key={sms.sms_id}
            style={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "0px 0px 20px 35px",
              gap: "0px 10px",
            }}
          >
            <div style={{ width: "165px", position: "relative" }}>{sms.sms_id}</div>
            <div style={{ width: "550px", position: "relative", overflow: "hidden", textOverflow: "ellipsis", textWrap:"nowrap" }}>{sms.entete}</div>
            <div style={{ width: "210px", position: "relative" }}>{sms.heure_envoi}</div>
            <div style={{ width: "210px", position: "relative" }}>{sms.date_envoi}</div>
            <div style={{ width: "130px", position: "relative" }}>{sms.status}</div>
            <div style={{ width: "100px", position: "relative" }}>
            <button style={{backgroundColor:"white", border:"none"}} onClick={() => visibilityClick(sms.sms_id)}>
              <img
                style={{ width: "24px", height: "24px", overflow: "hidden", flexShrink: "0" }}
                src="/octiconeye24.svg"
                alt=""
              />
              </button>
            </div> 
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
    </div>
      


      <div
        style={{
          position: "absolute",
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
                <a href="/messagespage" style={{textDecoration: 'none',cursor: 'pointer' }}>
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
                    src="/antdesignmessagefilled2.svg"
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
          <div
            style={{
              position: "absolute",
              top: "calc(50% - 59px)",
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

export default Messages;
