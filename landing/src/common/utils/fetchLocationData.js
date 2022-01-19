const fetchLocationData = async () => {
  let IpJson;
  try {
    const location = await fetch("https://geoip-db.com/json/");
    IpJson = await location.json();
  } catch (error) {
    console.log(error);
    IpJson = {};
  }
  return IpJson;
};

export default fetchLocationData;
