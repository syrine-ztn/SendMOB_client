import { useMemo } from "react";

const getStyleValue = (key, value) => {
  if (value === undefined || value === "") return;
  return { [key]: value };
};

const WidgetsSet = ({ title, body, date , propBackgroundColor }) => {
  const widgetsSetStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor),
    };
  }, [propBackgroundColor]);

  return (
    <div
      style={{
        alignSelf: "stretch",
        borderRadius: "16px",
        backgroundColor: "#e7e7e7",
        boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: "24px 13px 24px 16px",
        boxSizing: "border-box",
        gap: "16px",
        maxWidth: "100%",
        flexShrink: "0",
        textAlign: "left",
        fontSize: "20px",
        color: "#344767",
        fontFamily: "'DM Sans'",
        ...widgetsSetStyle,
      }}
    >
      <img
        style={{
          height: "58px",
          width: "58px",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          flexShrink: "0",
          minHeight: "58px",
        }}
        loading="eager"
        alt=""
        src="/emjbrandedframe32.svg"
      />
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "5px",
          minWidth: "857px",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            lineHeight: "140%",
            fontWeight: "500",
            display: "inline-block",
            maxWidth: "100%",
          }}
        >
          {title}
        </div>
        <div
          style={{
            alignSelf: "stretch",
            position: "relative",
            fontSize: "18px",
            lineHeight: "140%",
          }}
        >
          {body}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          textAlign: "right",
          fontSize: "15px",
        }}
      >
        <div
          style={{
            position: "relative",
            lineHeight: "140%",
            fontWeight: "500",
          }}
        >
          {date}
        </div>
      </div>
    </div>
  );
};

export default WidgetsSet;
