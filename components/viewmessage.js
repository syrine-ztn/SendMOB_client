const ViewMessage = () => {
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
                  loading="eager"
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
              top: "363px",
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
          minWidth: "991px",
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
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "34px",
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
                  display: "inline-block",
                  maxWidth: "100%",
                }}
              >
                <span style={{ fontWeight: "500" }}>
                  {`Pages / Boite d’envoi / Afficher SMS `}{" "}
                </span>{" "}
                <span> #121212</span>
              </div>
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
                Aperçu de mon Modèle SMS{" "}
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
                padding: "11px 12px 12px 11px",
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
                  gap: "7px",
                  minWidth: "91px",
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
                    width: "76px",
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "0px 6px 0px 0px",
                  }}
                >
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
                </div>{" "}
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
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              minHeight: "660px",
              maxWidth: "100%",
              color: "#344767",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "25px",
                maxWidth: "100%",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  borderRadius: "20px",
                  backgroundColor: "#fff",
                  border: "1px solid #e7e7e7",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  padding: "20px 21px 20px 19px",
                  minHeight: "355px",
                  maxWidth: "100%",
                }}
              >
                <div
                  style={{
                    height: "300px",
                    flex: "1",
                    position: "relative",
                    lineHeight: "140%",
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                >
                  <p style={{ margin: "" }}>
                    Horem ipsum dolor sit amet, consectetur adipiscing
                    elit.Etiam eu turpis molestie, dictum est a, mattis
                    tellus.Sed dignissim, metus nec fringilla accumsan, risus
                    sem sollicitudin lacus, ut interdum tellus elit sed
                    risus.Maecenas eget condimentum velit, sit amet feugiat
                    lectus.Class aptent taciti sociosqu ad litora torquent per
                    conubia nostra, per inceptos himenaeos.Praesent auctor purus
                    luctus enim egestas, ac scelerisque ante pulvinar.Donec ut
                    rhoncus ex.Suspendisse ac rhoncus nisl, eu tempor
                    urna.Curabitur vel bibendum lorem.Morbi convallis convallis
                    diam sit amet lacinia.Aliquam in elementum tellus.Horem
                    ipsum dolor sit amet, consectetur adipiscing elit.Etiam eu
                    turpis molestie, dictum est a, mattis tellus.Sed dignissim,
                    metus nec fringilla accumsan, risus sem sollicitudin lacus,
                    ut interdum tellus elit sed risus.Maecenas eget condimentum
                    velit, sit amet feugiat lectus.Class aptent taciti sociosqu
                    ad litora torquent per conubia nostra, per inceptos
                    himenaeos.Praesent auctor purus luctus enim egestas, ac
                    scelerisque ante pulvinar.Donec ut rhoncus ex.Suspendisse ac
                    rhoncus nisl, eu tempor urna.Curabitur vel bibendum
                    lorem.Morbi convallis convallis diam sit amet
                    lacinia.Aliquam in elementum tellus.{" "}
                  </p>{" "}
                  <p style={{ margin: "" }}>
                    Horem ipsum dolor sit amet, consectetur adipiscing
                    elit.Etiam eu turpis molestie, dictum est a, mattis
                    tellus.Sed dignissim, metus nec fringilla accumsan, risus
                    sem sollicitudin lacus, ut interdum tellus elit sed
                    risus.Maecenas eget condimentum velit, sit amet feugiat
                    lectus.Class aptent taciti sociosqu ad litora torquent per
                    conubia nostra, per inceptos himenaeos.Praesent auctor purus
                    luctus enim egestas, ac scelerisque ante pulvinar.Donec ut
                    rhoncus ex.Suspendisse ac rhoncus nisl, eu tempor
                    urna.Curabitur vel bibendum lorem.Morbi convallis convallis
                    diam sit amet lacinia.Aliquam in elementum tellus.{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              <footer
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "25px",
                  maxWidth: "100%",
                  textAlign: "left",
                  fontSize: "18px",
                  color: "#344767",
                  fontFamily: "'DM Sans'",
                }}
              >
                <div
                  style={{
                    width: "750px",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    border: "1px solid #e7e7e7",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px",
                    minWidth: "487px",
                    gap: "-3.14px",
                    maxWidth: "100%",
                  }}
                >
                  <div style={{ position: "relative", lineHeight: "140%" }}>
                    AKKAL IMANE, ZITOUNI SERYNE ASSIA, AKKAL IMANE, ZITOUNI
                    SERYNE ASSIA, AKKA...{" "}
                  </div>{" "}
                  <img
                    style={{
                      height: "14.1px",
                      width: "14.1px",
                      position: "relative",
                      zIndex: "1",
                    }}
                    loading="eager"
                    alt=""
                    src="/calendar-icon-frame.svg"
                  />
                </div>{" "}
              </footer>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default ViewMessage;
