import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link'

const errorMessageStyle = {
  top: '130px',
  left: '0',
  position: 'absolute',
  fontFamily: 'DM Sans',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: '140%',
  color: '#F65656',
};

const errorBorderStyle = {
  borderColor: '#F65656',
};
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault(); // prevent the default form submission behavior
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password
      });
      const { token,userId,role } = response.data;


      if (!role) {
        setError("Impossible de récupérer le rôle de l'utilisateur");
        return;
      }

      if (role === 'client') {
        // Vérifier le statut du client
        const modResponse = await axios.get(`http://localhost:8000/clients/getClientById/${userId}`, {
          headers: {
            'Authorization': `${token}`
          }
        });

        const { status } = modResponse.data;

        if (status === 'Suspendu') {
          setError('Votre compte est suspendu. Veuillez contacter l\'administrateur.');
          return;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
        window.location.href = '/dashboardpage';
      } else {
        setError("Vous devez être un client pour accéder à cet espace");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Email ou mot de passe incorrect');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: "#fff",
        height: "844px",
        overflow: "hidden",
        textAlign: "left",
        fontSize: "18px",
        color: "#f4f7fe",
        fontFamily: "'DM Sans'",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "973px",
          height: "844px",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            position: "absolute",
            top: "calc(50% - 422px)",
            left: "calc(50% - 486.5px)",
            width: "1580px",
            height: "1039px",
            objectFit: "cover",
          }}
          alt=""
          src="/image-2@2x.png"
        />
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            background:
              "linear-gradient(180deg, #85d988, #31754c 99.97%, #4c8159 99.98%, #4c855b 99.99%, #4da767)",
            width: "973px",
            height: "844px",
            display: "none",
            opacity: "0.77",
          }}
        />{" "}
        <img
          style={{
            position: "absolute",
            top: "527px",
            right: "-332px",
            width: "979px",
            height: "699px",
            display: "none",
          }}
          alt=""
          src="/group-2.svg"
        />
        <img
          style={{
            position: "absolute",
            top: "-252px",
            left: "-469px",
            width: "573px",
            height: "645px",
            display: "none",
          }}
          alt=""
          src="/group-3.svg"
        />
        <nav
          style={{
            margin: "0",
            position: "absolute",
            top: "68px",
            left: "144px",
            width: "685px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "left",
            fontSize: "18px",
            color: "#f4f7fe",
            fontFamily: "'DM Sans'",
          }}
        >
          
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Link href="/faqpage" style={{textDecoration:"none", color:"white"}}>
            <b style={{ position: "relative" }}> FAQ </b>{" "}</Link>
          </div>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Link href="/helppage" style={{textDecoration:"none", color:"white"}}>
              <b style={{ position: "relative" }}> Aide paiement en ligne </b>{" "}
            </Link>{" "}
          </div>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <Link href="/privacypolicypage" style={{textDecoration:"none", color:"white"}}>
            <b style={{ position: "relative" }}> Politique de confidentialité </b>{" "}</Link>
            
          </div>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Link href="/conditionsofusepage" style={{textDecoration:"none", color:"white"}}>
            <b style={{ position: "relative" }}> Conditions d’utilisation </b>{" "}
            </Link>
          </div>{" "}
        </nav>{" "}
        <div
          style={{
            position: "absolute",
            top: "308px",
            left: "144px",
            width: "685px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "35px",
          }}
        >
          <img
            style={{
              width: "335.7px",
              position: "relative",
              height: "52.5px",
              objectFit: "cover",
            }}
            alt=""
            src="/sendmob@2x.png"
          />
          <div
            style={{
              width: "529px",
              position: "relative",
              fontWeight: "500",
              display: "inline-block",
            }}
          >
            <p style={{ margin: "" }}>
              Découvrez notre plateforme de gestion d 'envoi de SMS, développée
              par Mobilis.Une solution intelligente pour simplifier vos
              communications par SMS.{" "}
            </p>{" "}
            <p style={{ margin: "" }}>
              Notre solution est conçue pour vous offrir un contrôle complet et
              une expérience utilisateur fluide.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div
        style={{
          position: "absolute",
          top: "168px",
          left: "1170px",
          width: "578px",
          height: "501px",
          fontSize: "22px",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "0px",
            borderRadius: "20px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 30px rgba(0, 0, 0, 0.1)",
            width: "578px",
            height: "471px",
          }}
        />{" "}
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "100px",
            borderRadius: "20px",
            background:
              "linear-gradient(180deg, #85d988, #31754c 99.97%, #4c8159 99.98%, #4c855b 99.99%, #4da767)",
            width: "377px",
            height: "71px",
          }}
        >
          <b
            style={{
              position: "absolute",
              top: "calc(50% - 15.5px)",
              left: "calc(50% - 72.5px)",
              lineHeight: "140%",
            }}
          >
            Espace client{" "}
          </b>{" "}
        </div>{" "}
        <form onSubmit={handleSignIn}
          style={{
            margin: "0",
            position: "absolute",
            top: "calc(50% - 152px)",
            left: "calc(50% - 221px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "39px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "25px",
              }}

            >
              <input
                style={{
                  border: "1px solid" + (error ? "#F65656" : "#e7e7e7"),
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  width: "442px",
                  borderRadius: "20px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: "20px",
                  color: "#b8b8b8",
                }}
                placeholder="Email ou nom d’utilisateur"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />             
              <input
                style={{
                  border: "1px solid" + (error ? "#F65656" : "#e7e7e7"),
                  outline: "none",
                  fontFamily: "'DM Sans'",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  width: "442px",
                  borderRadius: "20px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px",
                  color: "#b8b8b8",
                }}
                placeholder="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                

              />
              
              {error && <div style={errorMessageStyle}>
              <br/> {error}</div>}
            </div>{" "}
      
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "6px",
              }}
            >
              <input
                style={{
                  cursor: "pointer",
                  margin: "0",
                  width: "34px",
                  position: "relative",
                  height: "20px",
                }}
                type="checkbox"
              />
              <div
                style={{
                  position: "relative",
                  fontSize: "18px",
                  lineHeight: "140%",
                  fontFamily: "'DM Sans'",
                  color: "#707eae",
                  textAlign: "left",
                }}
              >
                Se souvenir de moi{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
            <button 
             type="submit"
              style={{
                cursor: "pointer",
                border: "none",
                padding: "0",
                backgroundColor: "#54b848",
                width: "442px",
                position: "relative",
                borderRadius: "20px",
                height: "65px",
              }}
            >
              <b
                style={{
                  position: "absolute",
                  top: "calc(50% - 12.5px)",
                  left: "calc(50% - 59px)",
                  fontSize: "18px",
                  lineHeight: "140%",
                  fontFamily: "'DM Sans'",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Se connecter{" "}
              </b>{" "}

            </button>{" "}

          <div
            style={{
              alignSelf: "stretch",
              position: "relative",
              fontSize: "18px",
              lineHeight: "140%",
              textAlign: "center",
            }}
          >
            <span style={{ fontFamily: "'DM Sans'", color: "#707eae" }}>
              {" "}
              {`Mot de passe oublié? `}
            </span>
            <Link href="/resetpassword">
              <b style={{ fontFamily: "'DM Sans'", color: "#54b848" }}>
                Récupérer mot de passe
              </b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
 
};

export default Login;
