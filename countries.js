const fs = require("fs");
const https = require("https");

const url = "https://restcountries.com/v3.1/all?fields=name,translations";

https
  .get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const countries = JSON.parse(data);

        const germanCountries = countries
          .map((country) => country.translations?.deu?.common)
          .filter(Boolean)
          .sort();

        fs.writeFileSync(
          "src/app/data/countries.json",
          JSON.stringify(germanCountries, null, 2)
        );

        console.log("✅ German country names saved to countries.json");
      } catch (error) {
        console.error("❌ Error parsing JSON:", error);
      }
    });
  })
  .on("error", (err) => {
    console.error("❌ Request failed:", err);
  });
