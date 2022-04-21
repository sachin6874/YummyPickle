import Joi from "joi";
import { supabase } from "../../../supabase";

class Data {
  constructor(data) {
    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;
    this.expires_at = data.expires_at;
    this.expires_in = data.expires_in;
    this.token_type = data.token_type;
  }
}

const TokenSchema = Joi.object({
  token: Joi.string().required().error(new Error("invalid refresh token")),
});

export default async (req, res) => {
  try {
    if (req.method.toLowerCase() !== "post")
      throw { message: "invalid request method", status: 405 };
    let { token } = await TokenSchema.validateAsync(req.body);
    const { data, error } = await supabase.auth.api.refreshAccessToken(token);
    if (error) throw error;
    res.status(200).json({
      data: new Data(data),
      success: true,
    });
  } catch ({ message, status }) {
    res.status(status ? status : 500).json({
      message: message ? message.toLowerCase() : "an error occurred",
      success: false,
    });
  }
};
