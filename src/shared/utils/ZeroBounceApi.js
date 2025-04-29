const baseUrl = "https://api.zerobounce.net/v2";

export const validateEmail = async ({ email }) => {
  const uri = `${baseUrl}/validate?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${email}`;

 try {
   const response = await fetch(uri, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ZeroBounce API:", error);
    throw error;
  }
};
