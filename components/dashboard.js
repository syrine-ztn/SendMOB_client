import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip } from 'chart.js';
import styles from '../styles/dashboard_interface.module.css';
import { Bar } from 'react-chartjs-2';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback } from 'react';
import { useRouter } from 'next/router';




const stripePromise = loadStripe("pk_test_51P5uDeP84FUA7AxbfIkFOojzMqLx8WNw6oJNzRO6pFQXPbyxdKjj2njrVmTeldyzzeFTzBnxt5okJZjFcMBXUrBg00jQQB1NP5");
const Dashboard = () => {


    const handleCheckout = useCallback(async() => {
        const stripe = await stripePromise;
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const response = await fetch(`/api/create-checkout-session?userId=${userId}&role=${role}&token=${token}`);
        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            alert(result.error.message);
        }
    }, []);

    const router = useRouter();
    const [success, setSuccess] = useState(null);
    const [transactionCreated, setTransactionCreated] = useState(false);

    useEffect(() => {
        const handleRouteChange = (url, { query }) => {
            if (query.success === 'true') {
                setSuccess(true);
            } else {
                setSuccess(false);
            }
        };

        // Listen for changes in router query
        router.events.on('routeChangeComplete', handleRouteChange);

        // Check initial query parameters
        if (router.query.success === 'true') {
            setSuccess(true);
        } else {
            setSuccess(false);
        }

        // Clean up event listener
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.query]);


    useEffect(() => {
        if (success === true && !transactionCreated) {
            // If payment was successful and transaction not created yet, create transaction
            const userId = localStorage.getItem('userId'); // You might need to adjust this based on your application logic
            const token = localStorage.getItem('token'); // You might need to adjust this based on your application logic

            const createTransaction = async() => {
                try {
                    const axiosOptions = {
                        headers: {
                            Authorization: `${token}`
                        }
                    };

                    const clientPlanResponse = await axios.get(`http://localhost:8000/plans/getPlanByclientId/${userId}`, axiosOptions);
                    const planId = clientPlanResponse.data.plan_id;

                    // Retrieve plan details if needed
                    const planResponse = await axios.get(`http://localhost:8000/plans/getPlanById/${planId}`, axiosOptions);
                    const prixAsString = planResponse.data.prix;

                    // Convert the price to the appropriate format
                    const prix = parseInt(prixAsString, 10);

                    // Create transaction data
                    const transactionData = {
                        methode_paiement: 'card', // Retrieve payment method
                        montant_paye: prix,
                        date_paiement: new Date().toISOString(),
                        facture: '...', // Determine how to generate an invoice
                        status_transaction: 'payé',
                        plan_id: planId,
                    };

                    await axios.post('http://localhost:8000/transactions/createTransaction', transactionData, axiosOptions);
                    setTransactionCreated(true); // Update transaction creation status
                } catch (error) {
                    console.error('Error creating transaction:', error);
                    // Handle error
                }
            };

            createTransaction();
        }
    }, [success, transactionCreated]);



    const GroupFrame = ({ icon, label }) => {
        return ( <div style = {
                {
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "1px 0px 0px",
                    boxSizing: "border-box",
                    minWidth: "294px",
                    maxWidth: "300px",
                    textAlign: "left",
                    fontSize: "18px",
                    color: "#a3aed0",
                    fontFamily: "'DM Sans'",
                }
            } >
            <div style = {
                {
                    alignSelf: "stretch",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "40px 13.5px",
                    gap: "0px 18px",
                }
            } >
            <img style = {
                {
                    height: "70px",
                    width: "70px",
                    position: "relative",
                    objectFit: "cover",
                    minHeight: "70px",
                }
            }
            loading = "lazy"
            alt = ""
            src = { icon }
            />{" "} <div style = {
                {
                    width: "144px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: "15px 0px",
                }
            } >
            <div style = {
                {
                    position: "relative",
                    lineHeight: "24px",
                    fontWeight: "500",
                }
            } >
            { label } { " " } </div>{" "} 
            <b style = {
                {
                    alignSelf: "stretch",
                    position: "relative",
                    fontSize: "30px",
                    lineHeight: "32px",
                    color: "#2b3674",
                }
            } >
            { stats.totalSMS } </b>{" "} </div>{" "} </div>{" "} </div>
        );
    };


    const GroupFrame1 = ({ icon, label }) => {
        return ( <div style = {
                {
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "1px 0px 0px",
                    boxSizing: "border-box",
                    minWidth: "294px",
                    maxWidth: "300px",
                    textAlign: "left",
                    fontSize: "18px",
                    color: "#a3aed0",
                    fontFamily: "'DM Sans'",
                }
            } >
            <div style = {
                {
                    alignSelf: "stretch",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "40px 13.5px",
                    gap: "0px 18px",
                }
            } >
            <img style = {
                {
                    height: "70px",
                    width: "70px",
                    position: "relative",
                    objectFit: "cover",
                    minHeight: "70px",
                }
            }
            loading = "lazy"
            alt = ""
            src = { icon }
            />{" "} 
            <div style = {
                {
                    width: "144px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: "15px 0px",
                }
            } >
            <div style = {
                {
                    position: "relative",
                    lineHeight: "24px",
                    fontWeight: "500",
                }
            } >
            { label } { " " } </div>{" "} <b style = {
                {
                    alignSelf: "stretch",
                    position: "relative",
                    fontSize: "30px",
                    lineHeight: "32px",
                    color: "#2b3674",
                }
            } >
            { stats.smsUtilises } 
            </b>{" "} 
            </div>{" "} 
            </div>{" "} 
            </div>
        );
    };

    const GroupFrame2 = ({ icon, label }) => {
        return ( <div style = {
                {
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "1px 0px 0px",
                    boxSizing: "border-box",
                    minWidth: "294px",
                    maxWidth: "300px",
                    textAlign: "left",
                    fontSize: "18px",
                    color: "#a3aed0",
                    fontFamily: "'DM Sans'",
                }
            } >
            < div style = {
                {
                    alignSelf: "stretch",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "40px 13.5px",
                    gap: "0px 18px",
                }
            } >
            <img style = {
                {
                    height: "70px",
                    width: "70px",
                    position: "relative",
                    objectFit: "cover",
                    minHeight: "70px",
                }
            }
            loading = "lazy"
            alt = ""
            src = { icon }
            />{" "} 
            <div style = {
                {
                    width: "144px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: "15px 0px",
                }
            } >
            <div style = {
                {
                    position: "relative",
                    lineHeight: "24px",
                    fontWeight: "500",
                }
            } >
            { label } { " " } 
            </div>{" "} 
            <b style = {
                {
                    alignSelf: "stretch",
                    position: "relative",
                    fontSize: "30px",
                    lineHeight: "32px",
                    color: "#2b3674",
                }
            } >
            { stats.smsRestants } 
            </b>{" "} 
            </div>{" "} 
            </div>{" "} 
            </div>
        );
    };





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
    }, []);

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

        if (transactionCreated) {
            fetchStats();
        }
    }, [transactionCreated]);

    const [year, setYear] = useState(new Date().getFullYear());
    const [monthlyStats, setMonthlyStats] = useState([]);

    useEffect(() => {
        const fetchMonthlyStats = async() => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/statistiques/client/monthly-stats/${year}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                setMonthlyStats(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des statistiques mensuelles:', error);
            }
        };

        fetchMonthlyStats();
    }, [year]);

    // Enregistrer les composants ChartJS requis
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip);

    // Tableau contenant les noms des mois
    const monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    // Données du graphique
    const data = {
        labels: monthlyStats.map(stat => monthNames[stat.month - 1]), // Utilisez les noms des mois au lieu des nombres
        datasets: [{
            label: `SMS envoyés en ${year}`,
            data: monthlyStats.map(stat => stat.count), // Utilisez le nombre de SMS retourné par l'API comme données
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const downloadReport = async(format) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/statistiques/client/report/${year}/${format}`, {
                headers: {
                    Authorization: `${token}`
                },
                responseType: 'blob' // spécifie que la réponse est un fichier binaire
            });

            // Créer un objet URL à partir des données blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Créer un élément <a> pour le téléchargement
            const link = document.createElement('a');
            link.href = url;

            // Spécifier le nom du fichier à télécharger
            link.setAttribute('download', `rapport_client_${year}.${format}`);

            link.setAttribute('target', '_blank');

            // Cliquez sur le lien pour déclencher le téléchargement
            document.body.appendChild(link);
            link.click();

            // Libérer l'URL de l'objet blob
            window.URL.revokeObjectURL(url);

            console.log('Rapport téléchargé avec succès');
        } catch (error) {
            console.error('Erreur lors du téléchargement du rapport:', error);
        }
    };

    const handleLogout = () => {
        // Supprimer le token JWT du stockage local
        localStorage.removeItem('token');
        // Rediriger vers la page de connexion
        window.location.href = '/';
    };




    return ( 
    <div style = {
            {
                width: "100%",
                height: "1000px",
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
            }
        } >
        <div style = {
            {
                height: "844px",
                width: "329px",
                overflow: "hidden",
                flexShrink: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                maxWidth: "100%",
                
            }
        } >
        <div style = {
            {
                alignSelf: "stretch",
                height: "844px",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "60px 39px 40.19999999999982px",
                boxSizing: "border-box",
                gap: "60px 0px",
                position:"fixed"
            }
        } >
        <div style = {
            {
                width: "124.6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "13px 0px",
            }
        } >
        <img style = {
            {
                alignSelf: "stretch",
                height: "19.5px",
                position: "relative",
                maxWidth: "100%",
                overflow: "hidden",
                flexShrink: "0",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/sendmob.svg" />
        <img style = {
            {
                width: "71.8px",
                height: "17px",
                position: "relative",
                objectFit: "cover",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/image-1@2x.png" />
        </div>{" "} 
        <div style = {
            {
                alignSelf: "stretch",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
            }
        } >
        <div style = {
            {
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "30px 0px",
            }
        } >
        <a href = "/dashboardpage"
        style = {
            { textDecoration: 'none', cursor: 'pointer' } } >
        <div style = {
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0px 15px",
                color: "#54b848",
            }
        } >
        <img style = {
            {
                height: "35px",
                width: "35px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/icon.svg" />
        <div style = {
            {
                position: "relative",
                lineHeight: "30px",
                fontWeight: "500",
            }
        } >
        Dashboard { " " } 
        </div>{" "} 
        </div>{" "} 
        </a> 
        <a href = "/sendsmspage"
        style = {
            { textDecoration: 'none', cursor: 'pointer', color: '#B8B8B8' } } >
        <div style = {
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0px 15px",
            }
        } >
        <img style = {
            {
                height: "35px",
                width: "35px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
                objectFit: "cover",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/mingcutesendfill@2x.png" />
        <div style = {
            {
                position: "relative",
                lineHeight: "30px",
                fontWeight: "500",
            }
        } >
        Envoi des SMS { " " } 
        </div>{" "} 
        </div>{" "} 
        </a> 
        <a href = "/clientspage"
        style = {
            { textDecoration: 'none', cursor: 'pointer', color: '#B8B8B8' } } >
        <div style = {
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0px 15px",
            }
        } >
        <img style = {
            {
                height: "35px",
                width: "35px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
                objectFit: "cover",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/icroundpermcontactcalendar@2x.png" />
        <div style = {
            {
                position: "relative",
                lineHeight: "30px",
                fontWeight: "500",
            }
        } >
        Contacts { " " } 
        </div>{" "} 
        </div>{" "} 
        </a> 
        <a href = "/messagespage"
        style = {
            { textDecoration: 'none', cursor: 'pointer', color: '#B8B8B8' } } >
        <div style = {
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0px 15px",
            }
        } >
        <img style = {
            {
                height: "35px",
                width: "35px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
                objectFit: "cover",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/antdesignmessagefilled@2x.png" />
        <div style = {
            {
                position: "relative",
                lineHeight: "30px",
                fontWeight: "500",
            }
        } >
        Boite d’ envoi { " " } 
        </div>{" "} 
        </div>{" "} 
        </a> 
        <a href = "/historyofpaymentpage"
        style = {
            { textDecoration: 'none', cursor: 'pointer', color: '#B8B8B8' } } >
        <div style = {
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0px 15px",
            }
        } >
        <img style = {
            {
                height: "35px",
                width: "35px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
                objectFit: "cover",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/octiconhistory161@2x.png" />
        <div style = {
            {
                position: "relative",
                lineHeight: "30px",
                fontWeight: "500",
            }
        } >
        Mes transactions { " " } 
        </div>{" "} 
        </div>{" "} 
        </a> 
        <a href = "/reportpage"
        style = {
            { textDecoration: 'none', cursor: 'pointer', color: '#B8B8B8' } } >
        <div style = {
            {
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0px 15px",
            }
        } >
        <img style = {
            {
                height: "35px",
                width: "35px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
                objectFit: "cover",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/materialsymbolswarningrounded@2x.png" />
        <div style = {
            {
                position: "relative",
                lineHeight: "30px",
                fontWeight: "500",
            }
        } >
        Signaler un problème { " " } </div>{" "} </div>{" "} 
        
        
        
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
        <a href = "/settingspage"
        style = {
            { textDecoration: 'none', cursor: 'pointer', color: '#B8B8B8' } } >
        <div style = {
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0px 15px",
            }
        } >
        <img style = {
            {
                height: "35px",
                width: "35px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/antdesignsettingfilled.svg" />
        <div style = {
            {
                position: "relative",
                lineHeight: "30px",
                fontWeight: "500",
            }
        } >
        Paramètres { " " } 
        </div>{" "} 
        </div>{" "} 
        </a> 
        </div>{" "} 
        
        <div

        style = {
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0px 15px",
            }
        } >
        <img style = {
            {
                height: "35px",
                width: "35px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
                objectFit: "cover",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/solarlogout3bold@2x.png" />

        <div href = "/"
        onClick = { handleLogout }
        style = {
            {
                position: "relative",
                lineHeight: "30px",
                fontWeight: "500",
                cursor: 'pointer',

            }
        } >
        Se déconnecter { " " } 
        </div>{" "}

        </div> 
        </div>{" "} 
        </div>{" "} 
        <div style = {
            {
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
                marginTop: "-675px",
            }
        } >
        <div style = {
            {
                height: "39px",
                width: "12px",
                position: "relative",
                borderRadius: "25px",
                backgroundColor: "#54b848",
            }
        }
        />{" "} 
        <div style = {
            {
                height: "39px",
                width: "12px",
                position: "relative",
                borderRadius: "25px",
                backgroundColor: "#54b848",
            }
        }
        />{" "} 
        </div>{" "} 
        </div>{" "} 
        <section style = {{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "42px 0px 0px",
                boxSizing: "border-box",
                minWidth: "991px",
                maxWidth: "100%",
                textAlign: "left",
                fontSize: "18px",
                color: "#707eae",
                fontFamily: "'DM Sans'",
            }} >
        <div style = {
            {
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "35px 0px",
                maxWidth: "100%",
            }
        } >
        <div style = {
            {
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                maxWidth: "100%",
                gap: "20px",
            }
        } >
        <div style = {
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "2px 0px",
                maxWidth: "100%",
            }
        } >
        <div style = {
            {
                position: "relative",
                lineHeight: "24px",
                fontWeight: "500",
            }
        } >
        Pages / Dashboard { " " } 
        </div>{" "} 
        <h2 style = {
            {
                margin: "0",
                position: "relative",
                fontSize: "34px",
                lineHeight: "42px",
                fontWeight: "700",
                fontFamily: "inherit",
                color: "#2b3674",
            }
        } >
        Statistiques Générales { " " } 
        </h2>{" "} 
        </div>{" "} 
        <div style = {
            {
                width: "470px",
                borderRadius: "30px",
                backgroundColor: "#fff",
                boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "11.099999999999907px 11.099999999999907px 11.200000000000273px",
                boxSizing: "border-box",
                gap: "0px 26.3px",
                maxWidth: "100%",
            }
        } >
        <div style = {
            {
                flex: "1",
                borderRadius: "49px",
                backgroundColor: "#f4f7fe",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "13px 20px 12.699999999999818px",
                boxSizing: "border-box",
                gap: "0px 7px",
                minWidth: "94px",
            }
        } >
        <div style = {
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "2.5px 0px 0px",
            }
        } >
        <img style = {
            {
                width: "15px",
                height: "15px",
                position: "relative",
                objectFit: "cover",
            }
        }
        alt = ""
        src = "/search-icon@2x.png" />
        </div>{" "} 
        <input style = {
            {
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
            }
        }
        placeholder = "Recherche"
        type = "text" 
        />
        </div>{" "} 
        <div style = {
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                gap: "0px 20px",
            }
        } >
        <a href = "/notificationpage"
           style = {
            { cursor: 'pointer' } } >
        <div style = {
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "0px 0px 10.799999999999727px",
            }
        } >
        <img style = {
            {
                width: "24px",
                height: "24px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
                objectFit: "cover",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/notifications-none@2x.png" />
        </div>{" "} 
        </a> 
        <a href = "/chatbotpage"
        style = {
            { cursor: 'pointer' } } >
        <div style = {
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "0px 0px 11.299999999999727px",
            }
        } >
        <img style = {
            {
                width: "22.1px",
                height: "23px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/carbonchatbot.svg" />
        </div>{" "} 
        </a> 
        <a href = "/helppage"
        style = {
            { cursor: 'pointer' } } >
        <div style = {
            {
                height: "34.8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "0px 6.300000000000182px 0px 0px",
                boxSizing: "border-box",
            }
        } >
        <img style = {
            {
                width: "24px",
                height: "24px",
                position: "relative",
                overflow: "hidden",
                flexShrink: "0",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/info-outline.svg" />
        </div>{" "} 
        </a> 
        <a href = '/settingspage' >
        <img style = {
            {
                height: "45.7px",
                width: "45.7px",
                position: "relative",
                objectFit: "cover",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/avatar-style-61@2x.png" />
        </a> 
        </div>{" "} 
        </div>{" "} 
        </div>{" "} 
        <div style = {
            {
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "19px 0px",
                maxWidth: "100%",
                color: "#a3aed0",
            }
        } >
        <div style = {
            {
                alignSelf: "stretch",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "0px 6.25px",
            }
        } >
        <div style = {
            {
                flex: "0.91",
                borderRadius: "20px",
                backgroundColor: "#fff",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "40px 13.5px",
                boxSizing: "border-box",
                gap: "0px 18px",
                minWidth: "194px",
                maxWidth: "300px",
            }
        } >
        <img style = {
            {
                height: "70px",
                width: "70px",
                position: "relative",
                objectFit: "cover",
                minHeight: "70px",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/icon-11@2x.png" />
        <div style = {
            {
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "15px 0px",
            }
        } >
        <div style = {
            {
                position: "relative",
                lineHeight: "24px",
                fontWeight: "500",
            }
        }

        >
        Plan Choisi { " " } 
        </div>{" "} 
        <b style = {
            {
                alignSelf: "stretch",
                position: "relative",
                fontSize: "20px",
                lineHeight: "32px",
                color: "#2b3674",
            }
        } >
        { stats.planChoisi } 
        </b>{" "} 
        </div>{" "} 
        </div>{" "} 
        <div style = {
            {
                flex: "0.8717",
                borderRadius: "20px",
                backgroundColor: "#fff",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "40px 25px 40px 13.5px",
                boxSizing: "border-box",
                gap: "0px 18px",
                minWidth: "294px",
                maxWidth: "300px",
            }
        } >
        <div style = {
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "1px 0px 0px",
            }
        } >
        <img style = {
            {
                width: "70px",
                height: "70px",
                position: "relative",
                objectFit: "cover",
            }
        }
        loading = "lazy"
        alt = ""
        src = "/icon-21@2x.png" />
        </div>{" "} 
        <div style = {
            {
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "15px 0px",
            }
        } >
        <div style = {
            {
                position: "relative",
                lineHeight: "24px",
                fontWeight: "500",
            }
        } >
        Temps restant { " " } 
        </div>{" "} 
        <div style = {
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "0px 7.2px",
                fontSize: "30px",
                color: "#2b3674",
            }
        } >
        <b style = {
            { position: "relative", lineHeight: "32px" } } > { " " } { stats.tempsRestant } { " " } 
            </b>{" "} 
            <button onClick = { handleCheckout }
        style = {
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "1px 0px 0px",
                fontSize: "20px",
                color: "#fff",
                borderRadius: "16px",
                borderColor: "#54b848",
                backgroundColor: "#54b848"

            }
        } >

        <b style = {
            {
                position: "relative",
                lineHeight: "32px",
                zIndex: "1",
            }
        } >
        Renouveler { " " } 
        </b>{" "}

        </button>{" "} 
        </div>{" "} 
        </div>{" "} 
        </div>{" "}




        <GroupFrame icon = "/icon-1@2x.png"
        label = "Total SMS" />

        <GroupFrame1 icon = "/icon-4@2x.png"
        label = "SMS utilisés" />
        <GroupFrame2 icon = "/icon-5@2x.png"
        label = "SMS restants" />
        </div>{" "}

        { /*graph */ } 
        <div >
        <Component3 year = { year }
        setYear = { setYear }
        data = { data }
        downloadReport = { downloadReport }
        /> 
        </div> 
        </div> 
        </div> 
        </section> 
        </div>
    );
};

const Component3 = ({ year, setYear, data, downloadReport }) => {
    const handleChangeYear = (e) => {
        setYear(e.target.value);
    };

    const handleDownloadPDF = () => {
        downloadReport('pdf');
    };

    const handleDownloadCSV = () => {
        downloadReport('csv');
    };

    return ( <div className = { styles.large } >
        <div className = { styles.frame78 } >
        <div className = { styles.timelineButton } >
        <div className = { styles.timelineButtonIcon } > 
            </div> 
        <p className = { styles.timelineButtonText } > Année: </p> 
        <select className = { styles.timelineButtonText2 }
        value = { year }
        onChange = { handleChangeYear } > 
        {
            Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => ( <option key = { year }
                value = { year } > { year } </option>
            ))
        } 
        </select> </div> 
        <div className = { styles.buttonLink }
        onClick = { handleDownloadPDF } >
        <div className = { styles.button } >
        <div className = { styles.buttonIcon } > </div> <p className = { styles.buttonText } > Télécharger PDF </p> </div> </div> <div className = { styles.buttonLink2 }
        onClick = { handleDownloadCSV } >
        <div className = { styles.button } >
        <div className = { styles.buttonIcon } > </div> <p className = { styles.buttonText } > Télécharger CSV </p> </div> </div> </div> <div className = { styles.group156 } >
        <Component4 data = { data }
        /> </div> </div>
    );
};

const Component4 = ({ data }) => {
    return ( <div className = { styles.graph } >
        <Bar data = { data }
        options = {
            {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        type: 'category',
                        position: 'bottom'
                    }
                }
            }
        }
        /> 
        </div>
    );
};

export default Dashboard;