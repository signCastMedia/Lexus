const Unit = require("../models/Units");

module.exports = {
  createUnit,
  seed,
  getUnitsById,
  updateUnit,
  deleteUnit,
};

const Data2 = [
  {
    tenant: "Mrs. Jaspreet Kaur",
    companyName: "JH Click Immigration Consultancy Inc.",
    catergories: "",
    floor: 1,
    suite: 101,
    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "",
    companyName: "",
    catergories: "",
    floor: 1,
    suite: 102,
    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },
  {
    tenant: "Bunmi Jospeh",
    companyName: "Community Alliance for Support & Empowerment",
    catergories: "",
    floor: 1,
    suite: 103,

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Kalyan Paul",
    companyName: "Global Vision Immigration Inc.",
    catergories: "",
    floor: 1,
    suite: 104,

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Shannon Holmes",
    companyName: "Healing Through Play Therapeutic Counselling",
    catergories: "",
    floor: 1,
    suite: 105,

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Marlene Spence",
    companyName: "Hope Endoors Community Services",
    catergories: "",
    floor: 1,
    suite: 106,

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },
  {
    tenant: "Elizabeth Duarte",
    companyName: "Elite Personnel Inc.",
    catergories: "",
    floor: 2,
    suite: 201,

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Marci Gray",
    companyName: "Gray Matter Health",
    catergories: "",
    floor: 2,
    suite: 203,

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },
  {
    tenant: "Maureen Hall",
    companyName: "Homeless Health Peel",
    catergories: "",
    floor: 2,
    suite: 204,

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Alan Lever",
    companyName: "The Papillon Learning Centre Ltd.",
    catergories: "",
    floor: 2,
    suite: 205,

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Stephanie Cabanatan",
    companyName: "Beyond Body Massage Centre",
    catergories: "",
    floor: 2,
    suite: 206,

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Kevin Khanija",
    companyName: "Brampton SMP",
    catergories: "",
    floor: 2,
    suite: 207,
    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },
  {
    tenant: "Roger (Rajamoorthy) Rajendram",
    companyName: "Tracks Brew Pub",
    catergories: "",
    floor: 0,
    suite: "L01",

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Ken Duffy",
    companyName: "Rayonier A.M. Canada G.P.",
    catergories: "",
    floor: 0,
    suite: "L02",

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Allison Beaunuler",
    companyName: "Dentistry at the Mill",
    catergories: "",
    floor: 0,
    suite: "L03",

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Mikesh Patel",
    companyName: "Patel Law Firm",
    catergories: "",
    floor: 0,
    suite: "L06",

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },
  {
    tenant: "Ignatius Nwafor",
    companyName: "Charismatic Renewal Ministries Inc.",
    catergories: "",
    floor: 0,
    suite: "L08",

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },
  {
    tenant: "Roxanne Bennett",
    companyName: "FreightOnTime",
    catergories: "",
    floor: 0,
    suite: "L09",
    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },
  {
    tenant: "Takiar Vritika",
    companyName: "Vvakre Immigration Consultants Inc.",
    catergories: "",
    floor: 0,
    suite: "L12",

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

  {
    tenant: "Taureef Riaz",
    companyName: "TS Care Givers Inc.",
    catergories: "",
    floor: 0,
    suite: "L14",

    hide: false,
    projectId: "64657d1749446b25ff6876de",
  },

];



// Unit.watch().on('change', data => console.log('data'));


//ADD IMAGE TO GALLERY
async function createUnit(req, res) {
  const {projectId,floor,suite} = req.body
  

  try {
    let unit = await Unit.create({projectId,floor,suite,tenant:'sample name', companyName:'sample company'})
    res.status(200).json(unit);
  } catch (err) {
    res.status(400);
    res.json({ ERROR: err });
  }
}

//SEED DATABASE

//seed
async function seed(req, res) {
  try {
    await Unit.insertMany(Data2);
    res.status(200);
    res.json("Successfully seeded");
  } catch (err) {
    res.status(400);
    res.json({ Error: err });
  }
}

//get all products that match product ID
async function getUnitsById(req, res) {
  const { projectId } = req.params;
  try {
    let data = await Unit.find({ projectId: projectId });
    res.status(200).json(data);
  } catch (err) {
    res.status(400);
    res.json({ Error: err });
  }
}

//delete unit
async function deleteUnit(req, res) {
  const { unitId } = req.params;
  try {
    let data = await Unit.findByIdAndDelete(unitId);
    res.status(200).json(data);
  } catch (err) {
    res.status(400);
    res.json({ Error: err });
  }
}

//delete unit
async function updateUnit(req, res) {
  const { unitId, tenant, companyName, hide, logo } = req.body;
  try {
    let data = await Unit.findById(unitId);
    data.tenant = tenant ? tenant : data.tenant;
    data.companyName = companyName ? companyName : data.companyName;
    data.logo = logo ? logo : data.logo;
    data.hide = hide;
    await data.save()
    res.status(200).json(data);
  } catch (err) {
    res.status(400);
    res.json({ Error: err });
  }
}
