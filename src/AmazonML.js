import { RekognitionClient, DetectCustomLabelsCommand } from "@aws-sdk/client-rekognition";

const creds = {
  region: import.meta.env.VITE_AWS_REGION,
  model: import.meta.env.VITE_AWS_MODEL,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  },
};

let rekognitionClient = null;

export async function analyzeImageML(imageData) {
  const uimage_bytes = base64ToUint8Array(imageData.split("data:application/octet-stream;base64,")[1]);
  const params = {
    Image: { Bytes: uimage_bytes },
    MaxLabels: 10,
    MinConfidence: 20,
    ProjectVersionArn: creds.model
  };
  
  var returnData = null;
  try {
      // If the client has not been initalized yet, create it
      if (!rekognitionClient)  
        rekognitionClient = new RekognitionClient(creds); // pass in the creds as parameter
      const query = new DetectCustomLabelsCommand(params);
      let response = await rekognitionClient.send(query);  
      returnData = {
        type: "success",
        text: response,
      };    
  
  } catch (error) {
    returnData = {
      type: "error" /* success info warning error */,
      text: "There was an error, please try again",
    }; 
  }
  return JSON.stringify(returnData);  
}

function base64ToUint8Array(base64Data) {
  const bytes = new Uint8Array(atob(base64Data).split('').map(char => char.charCodeAt(0)));
  return bytes;
}
