import {onRequest} from "firebase-functions/v1/https";
import fetch from "node-fetch";
exports.getAsset = onRequest(async (req: any, res: any) => {
  // Grab the text parameter.
  const owner = req.query.owner;
  const assetId = req.query.assetId;
  const url = "https://dev.thinkingadditive.com/v0/providers/export/requests"; // Sostituisci con l'URL del tuo server backend esterno
  const urlFactory = (url:string, owner:string, assetId:string) => {
    return `${url}?owner=${owner}&id=${assetId}`;
  };
  try {
    const response = await fetch(urlFactory(url, owner, assetId));
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Errore durante la richiesta:", error);
    res.status(500)
        .send({text: "Errore durante la richiesta al server backend.", error,
        });
  }
});
