const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//PRODUCT SCHEMA
const themeSchema = new Schema(
  {
    //PROJECT
    projectId: { type: String, required: "" },

    //HEADER

    headerWords: { type: String, default: "Property Managed by " },
    headerLogo: {
      type: String,
      default:
        "https://signcast-refresh.mystagingwebsite.com/wp-content/uploads/2018/05/logo_web-1.png",
    },
    headerBgColor: { type: String, default: "rgb(30, 94, 157)" },
    headerColor: { type: String, default: "#fff" },
    headerFontFamily: {
      type: String,
      default: "Helvetica Neue,Helvetica,Arial,sans-serif",
    },
    headerFontSize: { type: String, default: "4rem" },
    headerLayout: { type: Number, default: 0 },

    //FOOTER
    footerWords: { type: String, default: "Property Managed by " },
    footerLogo: {
      type: String,
      default:
        "https://signcast-refresh.mystagingwebsite.com/wp-content/uploads/2018/05/logo_web-1.png",
    },
    footerBgColor: { type: String, default: "rgb(30, 94, 157)" },
    footerColor: { type: String, default: "#fff" },
    footerFontFamily: {
      type: String,
      default: "Helvetica Neue,Helvetica,Arial,sans-serif",
    },
    footerFontSize: { type: String, default: "2rem" },

    //WEATHER
    weatherBgColor: { type: String, default: "rgb(30, 94, 157)" },
    weatherColor: { type: String, default: "#fff" },
    weatherLocation: { type: String, default: "Markham" },
    weatherDays: { type: Number },
    weatherLayout: { type: Number, default: 0 },

    //UNIT CARDS
    cardBgColor: { type: String, default: "#fff" },
    cardColor: { type: String, default: "black" },
    cardFontFamily: {
      type: String,
      default: "Helvetica Neue,Helvetica,Arial,sans-serif",
    },
    cardFontSize: { type: String, default: "1rem" },
    cardLayout: { type: Number, default: 0 },

    //DATE
    dateColor: { type: String, default: "#fff" },
    dateFontFamily: {
      type: String,
      default: "Helvetica Neue,Helvetica,Arial,sans-serif",
    },
    dateFontSize: { type: String, default: "1rem" },
    dateLayout: { type: Number, default: 0 },

    //TIME
    timeColor: { type: String, default: "#fff" },
    timeFontFamily: {
      type: String,
      default: "Helvetica Neue,Helvetica,Arial,sans-serif",
    },
    timeFontSize: { type: String, default: "1rem" },
    timeLayout: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Theme", themeSchema);
