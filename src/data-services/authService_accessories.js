const BASE_URL = "https://demo-d099.onrender.com/accessories";

export const authService_accessories = {
  getAccessories: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  addAccessory: async (data) => {
    const newData = { ...data, id: Date.now().toString() };
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    return res.json(); // Saved to db.json
  },

  getAccessariesById: async (p_id) => {
    const res = await fetch(`${BASE_URL}?id=${p_id}`);
    const data = await res.json();
    return data;
  },

  getAccessoriesByColor: async (color) => {
    const res = await fetch(`${BASE_URL}?color=${color}`);
    const data = await res.json();
    return data;
  },

  // POST new data
  uploadAccessaries: async (data) => {
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
