const BASE_URL = "https://demo-d099.onrender.com/sadeeData";

export const authService_sadee = {
  // GET all
  getSadee: async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data;
  },

  getSadeeById: async (p_id) => {
    const res = await fetch(`${BASE_URL}?id=${p_id}`);
    const data = await res.json();
    return data;
  },

   getSadeeByColor: async (color) => {
    const res = await fetch(`${BASE_URL}?color=${color}`);
    const data = await res.json();
    return data;
  },

  // POST new data
  uploadSadee: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id: Date.now() }), // Optional: you can let json-server auto-assign ID
    });

    const result = await res.json();
    return result;
  },
};
