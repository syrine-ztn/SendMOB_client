import WidgetsSet from "../components/widgets-set";
import React, { useState, useEffect } from "react";
import axios from "axios";


const Notification = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace "your_token_here" with your actual token
        const response = await axios.get("http://localhost:8000/notifications/getNotifications", {
          headers: {
            Authorization: token
          }
        });
        const data = response.data;
        setNotifications(data.reverse());
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Retrieve read status from local storage
    const storedNotifications = JSON.parse(localStorage.getItem("notifications"));
    if (storedNotifications) {
      setNotifications(storedNotifications);
    }
  }, []);

  const markAsRead = async (notificationId, index) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/notifications/updateNotification/${notificationId}`, {vu: 'oui'}, {
        headers: {
          Authorization: token
        }
      });
      
      const updatedNotifications = [...notifications];
      updatedNotifications[index].vu = 'oui'; // Assuming 'vu' is the field indicating read status
      setNotifications(updatedNotifications);
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error("Error marking notification as read:", error);
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
            <a href="/dashboardpage"style={{textDecoration: 'none',cursor: 'pointer',  color: '#B8B8B8' }}>
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
          height: "845px",
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "42px 0px 0px",
          boxSizing: "border-box",
          minWidth: "993px",
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
            padding: "0px 2px 0px 0px",
            boxSizing: "border-box",
            gap: "35px",
            minHeight: "840px",
            maxWidth: "100%",
            flexShrink: "0",
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
                Pages / Notifications{" "}
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
                Notifications{" "}
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
                  gap: "20px",
                }}
              >
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
                  <a href="/notificationpage">
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
                    loading="eager"
                    alt=""
                    src="/notifications-none2.svg"
                  />
                  </a>
                </div>{" "}
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
                  src="/avatar-style-61@2x.png"
                />
                </a>
              </div>{" "}
            </div>{" "}
          </header>{" "}

          {/*notification */}
            
          <div
      style={{
        alignSelf: "stretch",
        height: "699px",
        overflowY: "auto",
        flexShrink: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "20px",
        maxWidth: "100%",
      }}
    >
      {notifications.map((notification, index) => (
        <a
          key={index}
          href="#"
          onClick={() => markAsRead(notification.notification_id,index)}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <WidgetsSet
            title={notification.type_notification}
            body={notification.contenu}
            date={notification.date_notification}
            propBackgroundColor={notification.vu === 'oui' ? "#fff" : "#f0f0f0"}
          />
        </a>
      ))}
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

export default Notification;
