const Theme = require("../models/Theme");

const createTheme = async (req, res) => {
  const { projectId } = req.body;
  try {
    await Theme.create();
    res.json("Theme created Successfully!");
  } catch (err) {
    res.status(400).json("Error creating theme");
  }
};
async function updateTheme(req, res, next) {
    const { themeData} = req.body;
  
    const theme = await Theme.findOne({ projectId:themeData.projectId });
   
  
    try {
      if (!theme) {
        const error = "Theme does not exist";
        throw error;
      } else {
        
        theme.headerText= themeData.headerText ? themeData.headerText : theme.headerText
        theme.headerLogo = themeData.headerLogo ? themeData.headerLogo : theme.headerLogo
        theme.headerBgColor= themeData.headerBgColor ? themeData.headerBgColor : theme.headerBgColor
        theme.headerColor= themeData.headerColor ? themeData.headerColor : theme.headerColor
        theme.headerFontFamily= themeData.headerFontFamily ? themeData.headerFontFamily : theme.headerFontFamily
        theme.headerFontSize= themeData.headerFontSize ? themeData.headerFontSize : theme.headerFontSize
        theme.headerLayout=themeData.headerLayout ? themeData.headerLayout: theme.headerLayout
  
      //header
      theme.footerText= themeData.footerText ? themeData.footerText : theme.footerText
      theme.footerLogo= themeData.footerLogo ? themeData.footerLogo : theme.footerLogo
      theme.footerBgColor= themeData.footerBgColor ? themeData.footerBgColor : theme.footerBgColor
      theme.footerColor= themeData.footerColor ? themeData.footerColor : theme.footerColor
      theme.footerFontFamily= themeData.footerFontFamily ? themeData.footerFontFamily : theme.footerFontFamily
      theme.footerFontSize= themeData.footerFontSize ? themeData.footerFontSize : theme.footerFontSize
      theme.footerLayout=themeData.footerLayout ? themeData.footerLayout: theme.footerLayout
  
      //WEATHER
      theme.weatherBgColor= themeData.weatherBgColor ? themeData.weatherBgColor : theme.weatherBgColor
      theme.weatherColor= themeData.weatherColor ? themeData.weatherColor : theme.weatherColor
      theme.weatherLocation= themeData.weatherLocation ? themeData.weatherLocation : theme.weatherLocation
      theme.weatherLayout=themeData.weatherLayout ? themeData.weatherLayout: theme.weatherLayout
  
      //UNIT CARDS
      theme.cardBgColor= themeData.cardBgColor ? themeData.cardBgColor : theme.cardBgColor
      theme.cardColor= themeData.cardColor ? themeData.cardColor : theme.cardColor
      theme.cardFamily= themeData.cardFamily ? themeData.cardFamily : theme.cardFamily
      theme.cardSize= themeData.cardSize ? themeData.cardSize : theme.cardSize
      theme.cardLayout=themeData.cardLayout ? themeData.cardLayout: theme.cardLayout
  
      //DATE
      theme.dateColor= themeData.dateColor ? themeData.dateColor : theme.dateColor
      theme.dateFontFamily= themeData.dateFontFamily ? themeData.dateFontFamily : theme.dateFontFamily
      theme.dateFontSize= themeData.dateFontSize ? themeData.dateFontSize : theme.dateFontSize
      theme.dateLayout=themeData.dateLayout ? themeData.dateLayout: theme.dateLayout
  
      //TIME
      theme.timeColor= themeData.timeColor ? themeData.timeColor : theme.timeColor
      theme.timeFontFamily= themeData.timeFontFamily ? themeData.timeFontFamily : theme.timeFontFamily
      theme.timeFontSize= themeData.timeFontSize ? themeData.timeFontSize : theme.timeFontSize
      theme.timeLayout=themeData.timeLayout ? themeData.timeLayout: theme.timeLayout
      let newData = await theme.save()
        res.status(200)
        res.json(newData)
      }
    } catch (err) {
      next(err);
    }
  }

  const getTheme = async (req, res) => {
    const { projectId } = req.params;

    // console.log(projectId)
    try {
      let theme = await Theme.findOne({projectId})
      res.status(200)
      res.json(theme)
    } catch (err) {
      res.status(400).json("Error creating theme");
    }
  };

  
  

module.exports = {
  createTheme,
  updateTheme,
  getTheme,
};
