import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: "079022e00cb86110d476a7bb740c48d5",
    secretAccessKey:
      "fc67dcb14d01754a7afd96dbe2cd1c6ddc7af187eea9fc9e151d27761672a7e3"
  },
  endpoint: "https://uutmhyjcvbahkpyygqke.supabase.co/storage/v1/s3",
  region: "us-west-1",
  forcePathStyle: true  
});

export default s3Client;