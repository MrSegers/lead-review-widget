
ZohoEmbeddedApp.on("PageLoad", function(data) {
  const recordId = data.EntityId[0];

  ZohoCRM.API.getRecord({ Entity: "Leads", RecordID: recordId })
    .then(response => {
      const lead = response.data[0];
      document.getElementById("Budget").value = lead.Budget || "";
      document.getElementById("Building").value = lead.Building || "";
      document.getElementById("Lead_First_Point_Of_Contact").value = lead.Lead_First_Point_Of_Contact || "";
    });

  document.getElementById("leadForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const updatedData = {
      Budget: document.getElementById("Budget").value,
      Building: document.getElementById("Building").value,
      Lead_First_Point_Of_Contact: document.getElementById("Lead_First_Point_Of_Contact").value
    };
    ZohoCRM.API.updateRecord({
      Entity: "Leads",
      RecordID: recordId,
      APIData: updatedData
    }).then(() => {
      alert("Lead updated successfully.");
      ZohoEmbeddedApp.close();
    });
  });
});

ZohoEmbeddedApp.init();
