import React, { useState, useEffect } from "react";
import axios from "axios";

const SendReport = () => {
  
  const [entete, setEntete] = useState("");
  const [fichier, setFichier] = useState(null);
  const [token, setToken] = useState("");
  const [clientId, setClientId] = useState("");
  const [objetReclamation, setObjetReclamation] = useState('');


  useEffect(() => {
    // Retrieve token and clientId from localStorage
    const storedToken = localStorage.getItem('token');
    const storedClientId = localStorage.getItem('userId');
    setToken(storedToken);
    setClientId(storedClientId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signalementData = {
      objet: objetReclamation,
      entete,
      date_envoi: new Date().toISOString(),
      client_id: clientId,
      fichiers_joints: fichier
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/signalements/createSignalement",
        signalementData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      setEntete("");
      setFichier(null);

      alert("Rapport envoyé avec succès!");
    } catch (error) {
      console.error("Error sending signalement:", error);
      alert("Échec de l'envoi du rapport");
    }
  };

  const handleFileChange = (e) => {
    setFichier(e.target.files[0]);
  };
  const handleDeleteFile = () => {
    setFichier(null);
  };

  /*const [entete, setEntete] = useState("");
  const [fichier, setFichier] = useState(null);
  const [clientId, setClientId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Retrieve clientId and token from localStorage
    const storedClientId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    if (storedClientId && storedToken) {
      setClientId(storedClientId);
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("entete", entete);
    formData.append("fichier", fichier);
    formData.append("date_envoi", new Date());
    formData.append("client_id", clientId);

    try {
      const response = await axios.post(
        "http://localhost:8000/signalements/createSignalement",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
          },
        }
      );

      setEntete("");
      setFichier(null);

      alert("Rapport envoyé avec succès!");
    } catch (error) {
      console.error("Error sending signalement:", error);
      alert("Échec de l'envoi du rapport");
    }
  };

  const handleFileChange = (e) => {
    setFichier(e.target.files[0]);
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
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "0px 35px 0px 0px",
        boxSizing: "border-box",
        gap: "0px 31px",
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
          overflow: "hidden",
          flexShrink: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            height: "844px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "60px 39px 40.20000000000073px",
            boxSizing: "border-box",
            gap: "60px 0px",
          }}
        >
          <div
            style={{
              width: "124.6px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "13px 0px",
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
              loading="lazy"
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
              loading="lazy"
              alt=""
              src="/image-1@2x.png"
            />
          </div>{" "}
          <div
            style={{
              alignSelf: "stretch",
              flex: "1",
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
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="lazy"
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
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="lazy"
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
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="lazy"
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
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="lazy"
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
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="lazy"
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
              <a href="/reportpage" style={{textDecoration: 'none',cursor: 'pointer'}}>
              <div
                style={{
                  alignSelf: "stretch",
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
                    height: "35px",
                    width: "35px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: "0",
                  }}
                  loading="lazy"
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
                  }}
                  loading="lazy"
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
                  height: "35px",
                  width: "35px",
                  position: "relative",
                  overflow: "hidden",
                  flexShrink: "0",
                }}
                loading="lazy"
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
        </div>{" "}
        <div
          style={{
            marginRight: "-5px",
            width: "340px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            maxWidth: "103%",
            flexShrink: "0",
            gap: "20px",
            zIndex: "1",
            marginTop: "-350px",
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
      <section
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "42px 0px 0px",
          boxSizing: "border-box",
          width:"1200px",
          textAlign: "center",
          fontSize: "18px",
          color: "#fff",
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
            gap: "34px 0px",
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
              maxWidth: "100%",
              gap: "20px",
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
                gap: "2px 0px",
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
                <a href="/reportpage" style={{textDecoration:"none",cursor:"pointer" }}>
                Pages / Signaler un problème / Envoyer un rapport{" "}</a>
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
                {`Envoyer un rapport `}{" "}
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
                padding:
                  "11.100000000000364px 11.100000000000025px 11.199999999998909px",
                boxSizing: "border-box",
                gap: "26.3px",
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
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  padding: "13px 20px 12.700000000000728px",
                  gap: "7px",
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "2.5px 0px 0px",
                  }}
                >
                  <img
                    style={{
                      width: "15px",
                      height: "15px",
                      position: "relative",
                      zIndex: "2",
                    }}
                    alt=""
                    src="/search-icon1.svg"
                  />
                </div>{" "}
                <input
                  style={{
                    width: "79px",
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
                    padding: "0",
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
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  gap: "0px 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "0px 0px 10.800000000001091px",
                  }}
                >
                  <a href="/notificationpage" >
                  <img
                    style={{
                      width: "24px",
                      height: "24px",
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: "0",
                      zIndex: "1",
                    }}
                    loading="lazy"
                    alt=""
                    src="/notifications-none1.svg"
                  />
                  </a>

                </div>{" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "0px 0px 11.300000000001091px",
                  }}
                >
                  <a href="/chatbotpage" >
                  <img
                    style={{
                      width: "22.1px",
                      height: "23px",
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: "0",
                      zIndex: "1",
                    }}
                    loading="lazy"
                    alt=""
                    src="/carbonchatbot.svg"
                  />
                  </a>
                </div>{" "}
                <div
                  style={{
                    height: "34.8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "0px 6px 0px 0px",
                    boxSizing: "border-box",
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
                    loading="lazy"
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
                  loading="lazy"
                  alt=""
                  src="/avatar-style-61@2x.png"
                />
                </a>
              </div>{" "}
            </div>{" "}
          </header>{" "}

          {/*form */}
          <div>
      <form onSubmit={handleSubmit}>
      <select
        style={{
          width: '100%',
          padding: '20px',
          borderRadius: '20px',
          border: '1px solid #e7e7e7',
          marginBottom: '20px',
          fontFamily: 'inherit',
          fontSize: '18px',
        }}
        value={objetReclamation}
        onChange={(e) => setObjetReclamation(e.target.value)}
      >
       
        <option value=""  >Objet de réclamation</option>
        <option value="" style={{fontSize:'5pt'}} disabled>&nbsp;</option>
        <option value="Problèmes techniques" style={{ ':hover': { backgroundColor: '#54B848', color: '#fff'}}}>Problèmes techniques</option>
        <option value="" style={{fontSize:'5pt'}} disabled>&nbsp;</option>
        <option value="Qualité du service" style={{ marginBottom: '10px' }}>Qualité du service</option>
        <option value="" style={{fontSize:'5pt'}} disabled>&nbsp;</option>
        <option value="Facturation et coûts" style={{ marginBottom: '10px' }}>Facturation et coûts</option>
        <option value="" style={{fontSize:'5pt'}} disabled>&nbsp;</option>
        <option value="Sécurité et confidentialité" style={{ marginBottom: '10px' }}>Sécurité et confidentialité</option>
        <option value="" style={{fontSize:'5pt'}} disabled>&nbsp;</option>
        <option value="Support client" style={{ marginBottom: '10px' }}>Support client</option>
        <option value="" style={{fontSize:'5pt'}} disabled>&nbsp;</option>
        <option value="Interface utilisateur" style={{ marginBottom: '10px'  }}>Interface utilisateur</option>
        <option value="" style={{fontSize:'5pt'}} disabled>&nbsp;</option>
        <option value="Personnalisation et fonctionnalités" style={{ marginBottom: '10px'  }}>Personnalisation et fonctionnalités</option>
        <option value="" style={{fontSize:'5pt'}} disabled>&nbsp;</option>
        <option value="Personnalisation et fonctionnalités" style={{ marginBottom: '10px'  }}>Autres</option>
      </select>
        <textarea
          style={{
            border: "1px solid #e7e7e7",
            backgroundColor: "#fff",
            height: "155px",
            
            width: "100%",
            outline: "none",
            alignSelf: "stretch",
            borderRadius: "20px",
            boxSizing: "border-box",
            marginBottom:"20px",
            padding: "20px 19px",
            fontFamily: "'DM Sans'",
            fontSize: "18px",
            
          }}
          placeholder="Ecrivez votre rapport"
          value={entete}
          onChange={(e) => setEntete(e.target.value)}
        />
        <footer
        style={{
          borderRadius: "20px",
          backgroundColor: "#fff",
          border: "0.8px dashed #e7e7e7",
          padding: "52px 20px 51px 67px",
          fontSize: "12px",
          color: "#b8b8b8",
          fontFamily: "'DM Sans'",
          width:"1350px",
          justifyContent: "center"
        }}
      >
        
        {fichier ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                padding: "10px",
                borderRadius: "5px",
                marginLeft: "500px",
                backgroundColor: "#fff",
                border: "0.8px dashed #e7e7e7",
              }}
            >
              
              {fichier.name}{" "}
              <button onClick={handleDeleteFile} style={{borderRadius: "20px",
            backgroundColor: "#54b848",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            padding:"9px",
            
            }}>Supprimer</button>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "744px",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 20px",
              gap: "0px 9px",
              zIndex: "1"
            }}
          >
            <label htmlFor="fileInput" style={{ cursor: "pointer" , alignItems:"center"}}>
              <img
                src="/group-18316.png"
                alt=""
                style={{ height: "17px", width: "20px", marginLeft: "400px" }}
              />
              Importer un fichier
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        )}
      </footer>
        <button
          type="submit"
          style={{
            width: "442px",
            borderRadius: "20px",
            backgroundColor: "#54b848",
            padding: "20px",
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            marginTop: "20px",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginTop: "120px",
            marginRight:"1000px",
            fontSize: "17px",
            fontWeight: "700",
            fontFamily: "inherit",
            

          }}
        >
          Envoyer le rapport
        </button>
      </form>
    </div>
          
        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default SendReport;
