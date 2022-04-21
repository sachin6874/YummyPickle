import { supabase } from "../../../supabase";

class Order {
  constructor(data) {
    this[data.id] = { ...data.data };
    this[data.id].meta = {};
    this[data.id].meta.updated_at = data.updated_at;
    this[data.id].meta.created_at = data.created_at;
  }
}

export default async (req, res) => {
  try {
    if (req.method.toLowerCase() !== "get")
      throw { message: "invalid request method", status: 405 };
    let { authorization } = req.headers;
    if (!authorization) throw { message: "not authorized", status: 401 };
    const auth = await supabase.auth.api.getUser(authorization);
    if (auth.error) throw auth.error;
    let { data, error } = await supabase
      .from("orders")
      .select()
      .match({ owner: auth.user.id });
    if (error) throw error;
    data = data.map((e) => new Order(e));
    res.status(200).json({
      data,
      success: true,
    });
  } catch ({ message, status }) {
    message = message.toLowerCase();
    if (message.startsWith("invalid token: token is expired")) {
      message = "token expired";
    }
    res.status(status ? status : 500).json({
      message: message ? message : "an error occurred",
      success: false,
    });
  }
};
