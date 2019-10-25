var express = require('express');
var router = express.Router();
const wineryModel = require("../models/wineryModel")

router.get("/", async function (req, res, next) {
    const wineryData = await wineryModel.getAll();
  
    res.render("template", {
          locals: {
              title: "Wineries",
              data: wineryData
          },
          partials: {
              partial: "partial-single"
          }
          }
      )
})

router.post("/addwinery", async (req, res) => {
    const{ name, address, street, city, state, primary_vine, zip } = req.body;
    const new_winery = new wineryModel(name, address, street, city, state, primary_vine, zip)
    const addWinery = await new_winery.addNewWinery();

    if (addWinery){
        res.status(200).redirect("/");
    }
    else {
        res.sendStatus(500);
    }
})

router.get("/:winery_id", async (req, res, next) => {
    const { winery_id } = req.params;
    console.log("req param:", req.params)
    const winery = await wineryModel.getById(winery_id);
    const reviews = await wineryModel.reviewsById(winery_id);
    res.render("template", {
      locals: {
        title: winery.name,
        wineryData: winery,
        reviewsData: reviews,
      },
      partials: {
        partial: "partial-single"
      }
    })
  });



module.exports = router;