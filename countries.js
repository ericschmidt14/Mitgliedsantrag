const fs = require("fs");
const https = require("https");

const url = "https://restcountries.com/v3.1/all?fields=name,translations,cca2";

https
  .get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const countries = JSON.parse(data);

        const countryList = countries
          .map((country) => {
            const nameInGerman = country.translations?.deu?.common;
            const isoCode = country.cca2;

            if (nameInGerman && isoCode) {
              return {
                value: isoCode,
                label: nameInGerman,
              };
            }

            return null;
          })
          .filter(Boolean)
          .sort((a, b) => a.label.localeCompare(b.label));

        fs.writeFileSync(
          "./countries.json",
          JSON.stringify(countryList, null, 2)
        );

        console.log("✅ Country names and codes saved to countries.json");
      } catch (error) {
        console.error("❌ Error parsing JSON:", error);
      }
    });
  })
  .on("error", (err) => {
    console.error("❌ Request failed:", err);
  });
