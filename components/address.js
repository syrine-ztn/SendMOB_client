import { useEffect, useState } from "react";
import axios from "axios";
import styles from '../styles/historique_paiements_interface.module.css';




const Address = () => {
  const [page, setPage] = useState(1); // Set the initial page to 1
  const [totalPages, setTotalPages] = useState(1); // Set the total number of pages
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response1 = await axios.get(`http://localhost:8000/adresses/getAllAdressesForClient/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        const response = await axios.get(`http://localhost:8000/adresses/getAllAdressesForClient/${userId}/${page}`, {
          headers: {
            Authorization: token,
          },
        });
        setAddresses(response.data);
        // Calculate the total number of pages based on the length of the contacts data
        const totalCount = response1.data.length;
        const contactsPerPage = 6; 
        const totalPagesCount = Math.ceil(totalCount / contactsPerPage);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchAddresses();
  }, [page]);// Update when the page changes

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
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

  const deleteAddress = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/adresses/deleteAdresse/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setAddresses(addresses.filter(address => address.adresse_id !== id));
      alert('Address deleted successfully');
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Failed to delete address');
    }
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: "#f4f7fe",
        height: "1044px",
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
          width: "1500px",
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
            gap: "2px",
          }}
        >
          <div
            style={{
              position: "relative",
              lineHeight: "24px",
              fontWeight: "500",
            }}
          >
            Pages / Mes adresses {" "}
          </div>{" "}
          <b
            style={{
              position: "relative",
              fontSize: "34px",
              lineHeight: "42px",
              color: "#2b3674",
            }}
          >
            Adresses de l’entreprise{" "}
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
              gap: "20px",
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
                  gap: "7px",
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
                gap: "20px",
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
              </a>{" "}
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
              </a>{" "}
              <a href='/helppage'>
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
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div
        style={{
          position: "absolute",
          top: "130px",
          left: "1520px",
          borderRadius: "20px",
          backgroundColor: "#fff",
          boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
          width: "243px",
          height: "50px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "9px",
          boxSizing: "border-box",
          textAlign: "right",
        }}
      >
        <a href="/addaddresspage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#344767'}}>
          <div
            style={{
              flex: "1",
              height: "24px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0px 17px",
              boxSizing: "border-box",
            }}
          >
            <img
              style={{ width: "24px", position: "relative", height: "24px" }}
              alt=""
              src="/fluent_location-add-24-regular.svg"
            />
            <div style={{ position: "relative", fontWeight: "500" ,padding: "0px 11px"}}>
              Ajouter une adresse{" "}
            </div>{" "}
          </div>{" "}
        </a>{" "}
      </div>{" "}

     
      

       {/*table  */}
     

       <div>
      <div style={{ position: "absolute", top: "200px", left: "235px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-start", gap: "20px" }}>
        <div style={{ width: "1400px", borderRadius: "12px", backgroundColor: "#fff", boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", padding: "15px 0px", boxSizing: "border-box", gap: "7px", overflowX:"auto" }}>
          <div style={{ borderRadius: "5px 5px 0px 0px", backgroundColor: "#fff", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "0px 0px 0px 35px", gap: "7px" }}>
            <div style={{ width: "120px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Adresse ID</div>
            </div>
            <div style={{ width: "130px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Nationalité</div>
            </div>
            <div style={{ width: "120px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>État/Province</div>
            </div>
            <div style={{ width: "150px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>District/Région</div>
            </div>
            <div style={{ width: "150px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Ville</div>
            </div>
            <div style={{ width: "150px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 32px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Rue</div>
            </div>
            <div style={{ width: "150px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 32px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Bloc</div>
            </div>
            <div style={{ width: "180px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Numéro de maison</div>
            </div>
            <div style={{ width: "180px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 32px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Code postal</div>
            </div>
            <div style={{ width: "180px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 32px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Type d'adresse</div>
            </div>
            <div style={{ width: "200px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 32px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Type d'opération</div>
            </div>
            <div style={{ width: "100px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "12px 32px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Action</div>
            </div>
          </div>
          
          {addresses.map(address => (
            
            <div key={address.adresse_id} style={{ width: "1400px", borderRadius: "12px", backgroundColor: "#fff",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", padding: "15px 0px",  gap: "7px" }}>
              
              <div style={{  backgroundColor: "#fff", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "0px 0px 0px 35px", gap: "7px" }}> 
              <div style={{ width: "120px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box", gap:"7px" }}>
                <div style={{ position: "relative" }}>#{address.adresse_id}</div>
              </div>
              <div style={{ width: "130px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{address.nationality}</div>
              </div>
              <div style={{ width: "120px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{address.state_province}</div>
              </div>
              <div style={{ width: "150px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{address.district_region}</div>
              </div>
              <div style={{ width: "150px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{address.city}</div>
              </div>
              <div style={{ width: "150px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 32px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{address.street}</div>
              </div>
              <div style={{ width: "150px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 32px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{address.block}</div>
              </div>
              <div style={{ width: "180px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{address.house_number}</div>
              </div>
              <div style={{ width: "180px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 32px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{address.postal_code}</div>
              </div>
              <div style={{ width: "180px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 32px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{address.address_type}</div>
              </div>
              <div style={{ width: "200px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 32px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{address.operation_type}</div>
              </div>
              <div style={{ width: "100px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "12px 32px", boxSizing: "border-box" }}>
                <img style={{ width: "24px", position: "relative", height: "24px", overflow: "hidden", flexShrink: "0" }} alt="" src="/mingcutedelete2line.svg" onClick={() => deleteAddress(address.adresse_id)} />
              </div>
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
        <img style={{ alignSelf: "stretch", position: "relative", maxWidth: "100%", overflow: "hidden", maxHeight: "100%" }} alt="" src="/vector-2.svg" />
      </div>
    </div>
      
 

 

     
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
              gap: "60px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "13px",
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
                </a>{" "}
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
                        width: "35px",
                        position: "relative",
                        height: "35px",
                        overflow: "hidden",
                        flexShrink: "0",
                      }}
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
                </a>{" "}
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
                </a>{" "}
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
                        width: "35px",
                        position: "relative",
                        height: "35px",
                        overflow: "hidden",
                        flexShrink: "0",
                      }}
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
                <a href="/reportpage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#B8B8B8'}}>
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
              top: "calc(50% + 135px)",
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


export default Address;
