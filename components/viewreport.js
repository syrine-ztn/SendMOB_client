const ViewReport = () => {
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
            gap: "34px 0px",
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
              maxWidth: "100%",
              gap: "20px",
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
              <div style={{ position: "relative", lineHeight: "24px" }}>
                <span style={{ fontWeight: "500" }}>
                  {`Pages / Signaler un problème / Rapport `}{" "}
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
                {`Aperçu du rapport `}{" "}
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
                  "11.100000000000364px 11.099999999999907px 11.199999999998909px",
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
                  boxSizing: "border-box",
                  gap: "7px",
                  minWidth: "94px",
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
                </div>{" "}
                <div
                  style={{
                    height: "34.8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: "0px 6.300000000000182px 0px 0px",
                    boxSizing: "border-box",
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
                    loading="lazy"
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
                  loading="lazy"
                  alt=""
                  src="/avatar-style-61@2x.png"
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
                  padding: "20px 19px",
                  minHeight: "355px",
                  maxWidth: "100%",
                }}
              >
                <div
                  style={{
                    flex: "1",
                    position: "relative",
                    lineHeight: "140%",
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                >
                  <p style={{ margin: "" }}>
                    Borem ipsum dolor sit amet, consectetur adipiscing
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
                  <p style={{ margin: "" }}>
                    Curabitur tempor quis eros tempus lacinia.Nam bibendum
                    pellentesque quam a convallis.Sed ut vulputate nisi.Integer
                    in felis sed leo vestibulum venenatis.Suspendisse quis arcu
                    sem.Aenean feugiat ex eu vestibulum vestibulum.Morbi a
                    eleifend magna.Nam metus lacus, porttitor eu mauris a,
                    blandit ultrices nibh.Mauris sit amet magna non ligula
                    vestibulum eleifend.Nulla varius volutpat turpis sed
                    lacinia.Nam eget mi in purus lobortis eleifend.Sed nec ante
                    dictum sem condimentum ullamcorper quis venenatis nisi.Proin
                    vitae facilisis nisi, ac posuere leo.{" "}
                  </p>{" "}
                  <p style={{ margin: "" }}>
                    Nam pulvinar blandit velit, id condimentum diam faucibus
                    at.Aliquam lacus nisi, sollicitudin at nisi nec, fermentum
                    congue felis.Quisque mauris dolor, fringilla sed tincidunt
                    ac, finibus non odio.Sed vitae mauris nec ante pretium
                    finibus.Donec nisl neque, pharetra ac elit eu, faucibus
                    aliquam ligula.Nullam dictum, tellus tincidunt tempor
                    laoreet, nibh elit sollicitudin felis, eget feugiat sapien
                    diam nec nisl.Aenean gravida turpis nisi, consequat dictum
                    risus dapibus a.Duis felis ante, varius in neque eu, tempor
                    suscipit sem.Maecenas ullamcorper gravida sem sit amet
                    cursus.Etiam pulvinar purus vitae justo pharetra
                    consequat.Mauris id mi ut arcu feugiat maximus.Mauris
                    consequat tellus id tempus aliquet.{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default ViewReport;
