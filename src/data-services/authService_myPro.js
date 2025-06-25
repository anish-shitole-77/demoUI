const BASE_URL = "https://demo-d099.onrender.com/myProd";

export const authService_myPro = {
  getMyproduct: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  addProduct: async (data) => {
    const newProduct = { ...data, id: Date.now().toString() };
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    return res.json();
  },

  getMyProductById: async (p_id) => {
    const res = await fetch(`${BASE_URL}?id=${p_id}`);
    const data = await res.json();
    return data;
  },
  getMyproductByColor: async (color) => {
    const res = await fetch(`${BASE_URL}?color=${color}`);
    const data = await res.json();
    return data;
  },

  // POST new data
  uploadFashion: async (data) => {
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
