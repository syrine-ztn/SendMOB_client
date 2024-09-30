import { useEffect, useState } from "react";
import axios from "axios";
import styles from '../styles/historique_paiements_interface.module.css';
import Papa from 'papaparse';




const Dashboard2 = () => {
  const [page, setPage] = useState(1); // Set the initial page to 1
  const [totalPages, setTotalPages] = useState(1); // Set the total number of pages
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response1 = await axios.get(`http://localhost:8000/contacts/getAllContactsForClient/`, {
          headers: {
            Authorization: token,
          },
        });
        const response = await axios.get(`http://localhost:8000/contacts/getAllContactsForClient/${page}`, {
          headers: {
            Authorization: token,
          },
        });
        setContacts(response.data);
        // Calculate the total number of pages based on the length of the contacts data
        const totalCount = response1.data.length;
        const contactsPerPage = 6; 
        const totalPagesCount = Math.ceil(totalCount / contactsPerPage);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [page]); // Update when the page changes

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

  const deleteContact = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/contacts/deleteContact/${id}`, {
        headers: {
          Authorization: token,
        },
      });
  
      // Mettre à jour l'état local en filtrant le contact supprimé
      setContacts(contacts.filter(contact => contact.contact_id !== id));
      console.log('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };
  const ImportContacts = () => {
    const [file, setFile] = useState(null);

  
    useEffect(() => {
      if (file) {
        handleImportContacts(); // Appeler handleImportContacts lorsque le fichier est sélectionné
      }
    }, [file]);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleImportContacts = async () => {
      if (!file) return;
   
  
      const importedContactNumbers = new Set(); // Set pour suivre les numéros déjà traités
      const results = await new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          complete: (results) => resolve(results),
          error: (error) => reject(error),
        });
      });
  
      const contacts = results.data.filter(contact => Object.values(contact).some(value => value.trim() !== '')); // Supprimer les lignes vides
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const newDate = new Date().toISOString().split('T')[0];
  
      try {
        // Récupérer tous les contacts existants
        const existingContactsResponse = await axios.get(`http://localhost:8000/contacts/getAllContactsForClient`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const existingContacts = existingContactsResponse.data;
  
        for (const contact of contacts) {
          // Nettoyer les espaces vides dans chaque champ du contact
          const cleanContact = {};
          Object.keys(contact).forEach((key) => {
            const value = contact[key]?.trim(); // Supprimer les espaces vides avant et après la valeur
            cleanContact[key] = value === '' ? null : value; // Remplacer les valeurs vides par null
          });
  
          // Valider le numéro de téléphone
          const phoneNumber = cleanContact.numero_telephone;
          if (!/^06\d{8}$/.test(phoneNumber)) {
            console.log(`Invalid phone number ${phoneNumber}. Skipping...`);
            continue; // Passer au contact suivant
          }
  
          // Vérifier les doublons de numéros de téléphone
          const isDuplicatePhoneNumber = existingContacts.some(existingContact => existingContact.numero_telephone === phoneNumber);
          if (isDuplicatePhoneNumber || importedContactNumbers.has(phoneNumber)) {
            console.log(`Contact with phone number ${phoneNumber} already exists. Skipping...`);
            continue; // Passer au contact suivant
          }
  
          // Ajouter le numéro de téléphone traité au Set
          importedContactNumbers.add(phoneNumber);
  
          // Mapper les champs du CSV aux champs de la base de données
          const mappedContact = {
            client_id: userId,
            nom: cleanContact.nom || '',
            prenom: cleanContact.prenom || '',
            numero_telephone: phoneNumber,
            date_ajout: newDate,
            label: cleanContact.label || '',
          };
  
          // Créer le contact s'il n'existe pas encore
          await axios.post('http://localhost:8000/contacts/createContact', mappedContact, {
            headers: {
              Authorization: `${token}`,
            },
          });
        }
  
    
      } catch (error) {
        console.error('Error creating contact:', error);

      }
    };
  
    return (
      <div style={{ marginTop: "4px" }}>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input" style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
        <img
          style={{ width: "24px", marginRight: "10px" }}
          alt=""
          src="/solarimportlinear.svg"
        />
        <div style={{ fontWeight: "500" }}>
          Importer une liste des contacts
        </div>
      </label>
    
    </div>
    );
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
            Pages / Contacts{" "}
          </div>{" "}
          <b
            style={{
              position: "relative",
              fontSize: "34px",
              lineHeight: "42px",
              color: "#2b3674",
            }}
          >
            Mes contacts{" "}
          </b>{" "}
        </div>{" "}
        <div
          style={{
            width: "470px",
            position: "relative",
            height: "68px",
            fontSize: "16px",
            color: "#b8b8b8",
            right:"100px"
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
        <a href="/addclientpage" style={{textDecoration: 'none',cursor: 'pointer',  color:'#344767'}}>
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
              src="/uiwuseradd.svg"
            />
            <div style={{ position: "relative", fontWeight: "500" ,padding: "0px 11px"}}>
              Ajouter un contact{" "}
            </div>{" "}
          </div>{" "}
        </a>{" "}
      </div>{" "}

     
      

       {/*table  */}
      

<div>
      <div style={{ position: "absolute", top: "200px", left: "235px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-start", gap: "20px" }}>
        <div style={{ width: "1400px", borderRadius: "12px", backgroundColor: "#fff", boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", padding: "15px 0px", boxSizing: "border-box", gap: "5px" }}>
          <div style={{ borderRadius: "5px 5px 0px 0px", backgroundColor: "#fff", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "0px 0px 0px 35px", gap: "10px" }}>
            <div style={{ width: "120px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Contact ID</div>
            </div>
            <div style={{ width: "200px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Nom</div>
            </div>
            <div style={{ width: "200px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Prénom</div>
            </div>
            <div style={{ width: "250px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Numéro de Téléphone</div>
            </div>
            <div style={{ width: "210px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Date d’ajout</div>
            </div>
            <div style={{ width: "150px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "12px 32px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Libellé</div>
            </div>
            <div style={{ width: "120px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "12px 32px", boxSizing: "border-box" }}>
              <div style={{ position: "relative" }}>Action</div>
            </div>
          </div>
          {contacts.map(contact => (
            <div key={contact.contact_id} style={{ alignSelf: "stretch", backgroundColor: "#fff", height: "75px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "0px 0px 0px 35px", boxSizing: "border-box", gap: "10px" }}>
              <div style={{ width: "120px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>#{contact.contact_id}</div>
              </div>
              <div style={{ width: "200px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{contact.nom}</div>
              </div>
              <div style={{ width: "200px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{contact.prenom}</div>
              </div>
              <div style={{ width: "250px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
                <b style={{ position: "relative" }}>{contact.numero_telephone}</b>
              </div>
              <div style={{ width: "210px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: "12px 10px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{contact.date_ajout}</div>
              </div>
              <div style={{ width: "150px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "12px 32px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>{contact.label}</div>
              </div>
              <div style={{ width: "120px", height: "38px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "12px 32px", boxSizing: "border-box" }}>
                <img style={{ width: "24px", position: "relative", height: "24px", overflow: "hidden", flexShrink: "0" }} alt="" src="/mingcutedelete2line.svg" onClick={() => deleteContact(contact.contact_id)} />
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
          position: "absolute",
          top: "130px",
          left: "1200px",
          borderRadius: "20px",
          backgroundColor: "#fff",
          boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
          width: "300px",
          height: "50px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "4px",
          boxSizing: "border-box",
          textAlign: "right",
        }}
      >
        <div
          style={{
            width: "310px",
            height: "24px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px 13px",
            boxSizing: "border-box",
          }}
        >
          
          <ImportContacts />
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
                <a href="/clientspage"style={{textDecoration: 'none',cursor: 'pointer' }}>
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
              top: "calc(50% - 123px)",
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


export default Dashboard2;
