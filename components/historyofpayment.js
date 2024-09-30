import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/historique_paiements_interface.module.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


const HistoryOfPayment = () => {

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const transactionsPerPage = 6;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const clientId = localStorage.getItem('userId');

    const response1 = axios.get(`http://localhost:8000/transactions/getAllTransactionsForClient/${clientId}`, {
          headers: {
            Authorization: token,
          },
    });

    axios.get(`http://localhost:8000/transactions/getAllTransactionsForClient/${clientId}?page=${page}`, {
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      setTransactions(response.data); 
      
      // Calculate total pages
      const totalCount = response1.data.length;
      const totalPagesCount = Math.ceil(totalCount / transactionsPerPage);
      setTotalPages(totalPagesCount);
    })
    .catch(error => {
      console.error('Error fetching transactions:', error);
    });
  }, [page]); // Dependency on page

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

  const factureClick = async (rowData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8000/plans/getPlanById/${rowData.plan_id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const plan = response.data;
      const client = plan.plans_clients[0]?.client;

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text('Facture', 14, 20);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Détails de la transaction', 14, 32);
      doc.setFont('helvetica', 'normal');
      doc.text(`ID de transaction: ${rowData.transaction_id}`, 14, 38);
      doc.text(`Méthode de paiement: ${rowData.methode_paiement}`, 14, 44);
      doc.text(`Date de paiement: ${rowData.date_paiement}`, 14, 50);

      doc.setFont('helvetica', 'bold');
      doc.text('Détails du plan', 14, 60);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nom du plan: ${plan.nom_plan}`, 14, 66);
      doc.text(`Prix du plan: ${plan.prix} DA`, 14, 72);
      doc.text(`Durée du plan: ${plan.duree} mois`, 14, 78);
      doc.text(`Nombre de messages: ${plan.nombre_message}`, 14, 84);

      doc.setFont('helvetica', 'bold');
      doc.text('Détails du client', 14, 94);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nom de la corporation: ${client?.corporation_name}`, 14, 100);

      doc.autoTable({
        startY: 110,
        head: [['Id transaction', 'Nom du plan', 'Quantité', 'Prix unitaire', 'Prix total']],
        body: [
          [rowData.transaction_id, plan.nom_plan, '1', `${plan.prix} DA`, `${rowData.montant_paye} DA`],
        ],
      });

       // Ajout de la ligne statique Montant total
        doc.setFont('helvetica', 'bold');
        doc.text('Montant total:', 14, doc.previousAutoTable.finalY + 10);
        doc.setFont('helvetica', 'normal');
        doc.text(`${rowData.montant_paye} DA`, 50, doc.previousAutoTable.finalY + 10);

      doc.save(`facture_${rowData.transaction_id}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la récupération du plan:', error);
    }
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
                  alt=""
                  src="/octiconhistory16.svg"
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
              <div onClick={handleLogout}
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
              bottom: "394px",
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
                Pages / Mes transactions{" "}
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
                {`Historique de paiement `}{" "}
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
                <a href="/dashboardpage">
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
          <div
            style={{
              width: "492px",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "12px",
              maxWidth: "100%",
            }}
          >
            <button
              style={{
                cursor: "pointer",
                border: "none",
                padding: "4px",
                backgroundColor: "#fff",
                flex: "1",
                borderRadius: "20px",
                boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                boxSizing: "border-box",
                minWidth: "147px",
                minHeight: "50px",
              }}
            >
              <div
                style={{
                  flex: "1",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0px 13px",
                  gap: "15px",
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
                  src="/solarcalendaroutline1.svg"
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
                  Date de paiement{" "}
                </div>{" "}
              </div>{" "}
            </button>{" "}
            <button
              style={{
                cursor: "pointer",
                border: "none",
                padding: "4px",
                backgroundColor: "#fff",
                height: "50px",
                width: "130px",
                borderRadius: "20px",
                boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                overflow: "hidden",
                flexShrink: "0",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  flex: "1",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0px 13px",
                  gap: "17px",
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
                  src="/pajamasstatus.svg"
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
                  Status{" "}
                </div>{" "}
              </div>{" "}
            </button>{" "}
            <button
              style={{
                cursor: "pointer",
                border: "none",
                padding: "4px",
                backgroundColor: "#fff",
                height: "50px",
                width: "50px",
                borderRadius: "20px",
                boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                overflow: "hidden",
                flexShrink: "0",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <img
                style={{ height: "24px", width: "24px", position: "relative" }}
                alt=""
                src="/fluentarrowexportup20regular.svg"
              />
            </button>{" "}
            <button
              style={{
                cursor: "pointer",
                border: "none",
                padding: "4px",
                backgroundColor: "#fff",
                height: "50px",
                width: "50px",
                borderRadius: "20px",
                boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                overflow: "hidden",
                flexShrink: "0",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  height: "24px",
                  width: "24px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
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
            </button>{" "}
          </div>{" "}
{/*table */}

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
      width: "1420px",
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
      <div style={{ position: "relative", width: "165px" }}>Opération ID</div>
      <div style={{ position: "relative", width: "250px" }}>Plan choisi</div>
      <div style={{ position: "relative", width: "210px" }}>Méthode de paiement</div>
      <div style={{ position: "relative", width: "210px" }}>Montant payé</div>
      <div style={{ position: "relative", width: "190px" }}>Date de paiement</div>
      <div style={{ position: "relative", width: "200px" }}>Facture</div>
      <div style={{ position: "relative", width: "100px" }}>Status</div>
    </div>
    
    {transactions.map((transaction, index) => (
      <div
        key={index}
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
        <div style={{ width: "165px", position: "relative" }}>{transaction.transaction_id}</div>
        <div style={{ width: "250px", position: "relative" }}>{transaction.plan.nom_plan}</div>
        <div style={{ width: "210px", position: "relative" }}>{transaction.methode_paiement}</div>
        <div style={{ width: "210px", position: "relative" }}>{transaction.montant_paye} DA</div>
        <div style={{ width: "190px", position: "relative" }}>{transaction.date_paiement}</div>
        <div style={{ width: "200px", position: "relative" }}>
          <button style={{backgroundColor:"white", border:"none", cursor:"pointer"}} onClick={() => factureClick(transaction)}>
          <img
            style={{ width: "24px", height: "24px", overflow: "hidden", flexShrink: "0" }}
            src="/vector.svg"
            alt=""
            onClick={() => factureClick(transaction)}
          />
          </button>
        </div>
        <div style={{ width: "100px", position: "relative" }}>{transaction.status_transaction}</div>
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
</div>;


          
         
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

export default HistoryOfPayment;
