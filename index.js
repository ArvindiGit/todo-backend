import app from "./app";

export default (req, res) => {
  app(req, res); // This turns your Express app into a Vercel function
};
