import Link from "next/link";
import { useState } from "react";


const FAQ = () => {

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Qu'est-ce que Sendmob ?",
      answer:
        "Sendmob est une plateforme d'envoi de SMS en masse conçue pour les entreprises clientes d'ATM Mobilis. Elle permet d'envoyer des messages texte à un grand nombre de destinataires de manière rapide et efficace.",
    },
    {
      question: "Comment puis-je m'inscrire sur Sendmob ?",
      answer:
        "Pour vous inscrire sur Sendmob, vous devez faire une demande d'inscription auprès de l'administration d'ATM Mobilis. Veuillez contacter votre représentant Mobilis ou visiter notre site web pour plus d'informations sur le processus d'inscription.",
    },
    {
      question: "Quels sont les avantages de l'utilisation de Sendmob ?",
      answer:
        "Sendmob offre plusieurs avantages, notamment la capacité d'envoyer des SMS en masse à un large public, une interface utilisateur intuitive, des rapports détaillés sur les campagnes, et une intégration facile avec d'autres systèmes via API.",
    },
    {
      question: "Combien coûte l'utilisation de Sendmob ?",
      answer:
        "Les coûts d'utilisation de Sendmob varient en fonction du plan choisi par chaque client. Chaque entreprise a un plan tarifaire personnalisé. Pour obtenir des détails spécifiques sur votre plan, veuillez contacter votre représentant Mobilis ou consulter votre contrat de service.",
    },
    {
      question: "Comment puis-je ajouter des contacts à ma liste de diffusion ?",
      answer:
        "Vous pouvez ajouter des contacts à votre liste de diffusion en téléchargeant un fichier CSV contenant les numéros de téléphone de vos destinataires. Alternativement, vous pouvez les ajouter manuellement via l'interface de Sendmob.",
    },
    {
      question: "Est-il possible de personnaliser les messages envoyés via Sendmob ?",
      answer:
        "Oui, Sendmob permet de personnaliser les messages en utilisant des balises de fusion. Vous pouvez insérer des variables telles que le nom du destinataire pour rendre vos messages plus personnalisés et engageants.",
    },
    {
      question: "Comment puis-je suivre les performances de mes campagnes SMS ?",
      answer:
        "Sendmob fournit des rapports détaillés sur les performances de vos campagnes, incluant des statistiques sur le taux de livraison, le taux d'ouverture, et les clics sur les liens inclus dans les messages.",
    },
    {
      question: "Quels types de messages puis-je envoyer avec Sendmob ?",
      answer:
        "Avec Sendmob, vous pouvez envoyer divers types de messages, y compris des notifications, des alertes, des promotions, des rappels, et des messages transactionnels.",
    },
    {
      question: "Comment puis-je contacter le support technique de Sendmob ?",
      answer:
        "Pour contacter le support technique de Sendmob, vous pouvez envoyer un e-mail à support@sendmob.com ou appeler notre service clientèle au numéro indiqué sur notre site web. Nous sommes disponibles pour vous aider 24/7.",
    },
    {
      question: "Mes données sont-elles sécurisées sur Sendmob ?",
      answer:
        "Oui, la sécurité de vos données est notre priorité. Sendmob utilise des protocoles de sécurité avancés pour protéger vos informations personnelles et garantir la confidentialité de vos communications.",
    },
  ];


  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0px 0px 72px",
        boxSizing: "border-box",
        gap: "69px",
        letterSpacing: "normal",
      }}
    >
      <header
        style={{
          alignSelf: "stretch",
          backgroundColor: "#344767",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "42px 42px 43px",
          boxSizing: "border-box",
          top: "0",
          zIndex: "99",
          position: "sticky",
          maxWidth: "100%",
          textAlign: "left",
          fontSize: "20px",
          color: "#fff",
          fontFamily: "'DM Sans'",
        }}
      >
        <div
          style={{
            width: "1672px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            maxWidth: "100%",
          }}
        >
          <Link href="/" >
          <div
            style={{
              height: "44px",
              width: "115.2px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              style={{
                alignSelf: "stretch",
                height: "18px",
                position: "relative",
                maxWidth: "100%",
                overflow: "hidden",
                flexShrink: "0",
                objectFit: "cover",
              }}
              loading="eager"
              alt=""
              src="/sendmob@2x.png"
            />
            <img
              style={{
                width: "63.4px",
                height: "15px",
                position: "relative",
                objectFit: "cover",
              }}
              loading="eager"
              alt=""
              src="/image 1.png"
            />
          </div>{" "}
          </Link>
          <div
            style={{
              width: "760px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: "100%",
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
              <Link href="/faqpage" style={{textDecoration:"none", color:"#54b848"}}>
              <b style={{ position: "relative" }}> FAQ </b>{" "} </Link>
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
              <b style={{ position: "relative", whiteSpace: "nowrap" }}>
                Aide paiement en ligne{" "}
              </b>{" "}
              </Link>
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
              <b style={{ position: "relative" }}> Politique de confidentialité </b>{" "}
              </Link>
              
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
              <b
                style={{
                  height: "26px",
                  position: "relative",
                  display: "inline-block",
                }}
              >

                Conditions d’utilisation{" "}
              </b>{" "}
              </Link>
            </div>{" "}
          </div>{" "}
          
      
          
        </div>{" "}
        
      </header>{" "}
     
      <main
  style={{
    width: "100%",
    maxWidth: "1700px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    boxSizing: "border-box",
    gap: "20px",
  }}
>
  <h1 style={{ color: "#344767", fontSize: "32px", fontFamily: "'DM Sans'", marginBottom: "20px" }}>
    FAQ
  </h1>
  <div
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    {faqs.map((faq, index) => (
      <div
        key={index}
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => toggleFAQ(index)}
          style={{
            width: "100%",
            backgroundColor: "#f7f7f7",
            padding: "25px",
            textAlign: "left",
            fontSize: "20px",
            fontFamily: "'DM Sans'",
            color: "#344767",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}
        >
          {faq.question}
        </button>
        {openFAQ === index && (
          <div
            style={{
              padding: "25px",
              backgroundColor: "#fff",
              borderTop: "1px solid #ccc",
              fontFamily: "'DM Sans'",
              color: "#344767",
              fontSize: "20px",
            }}
          >
            {faq.answer}
          </div>
        )}
      </div>
    ))}
  </div>
</main>



    </div>
  );
};

export default FAQ;
