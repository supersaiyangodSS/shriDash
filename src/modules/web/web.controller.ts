import { HTTP_CODES } from "@/constants";
import { Request, Response } from "express";
import axios from "axios";
import { env } from "@/config";

const apiUrl = env.BASE_API_URL;

export const homePage = (req: Request, res: Response) => {
  res.render("home");
};

export const loginPage = (req: Request, res: Response) => {
  const flashError = req.flash("error")[0];
  const flashOld = req.flash("old")[0];

  let parsed = null;
  try {
    parsed = flashError ? JSON.parse(flashError) : null;
  } catch (error) {
    parsed = null;
  }

  let errorMessage: string | null = null;

  if (parsed) {
    if (parsed.errors?.password) {
      errorMessage = parsed.errors.password;
    } else {
      errorMessage = "Invalid credentials";
    }
  }

  const old = flashOld ? JSON.parse(flashOld) : {};

  res.render("pages/login", {
    errorMessage,
    old,
  });
};

export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const apiRes = await axios.post(
      `${apiUrl}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        validateStatus: () => true,
      },
    );
    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      res.setHeader("Set-Cookie", setCookie);
    }
    if (apiRes.status === 200) {
      return res.redirect("/");
    }
    req.flash(
      "error",
      JSON.stringify({
        errors: apiRes.data.errors || null,
      }),
    );

    req.flash("old", JSON.stringify({ email }));
    return res.redirect("/login");
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).render("pages/login", {
      error: "Something went wrong",
      old: { email },
    });
  }
};

export const logoutPost = async (req: Request, res: Response) => {
  try {
    const apiRes = await axios.post(
      `${apiUrl}/api/auth/logout`,
      {},
      {
        headers: {
          cookie: req.headers.cookie || "",
        },
        withCredentials: true,
        validateStatus: () => true,
      },
    );
    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      res.setHeader("Set-cookie", setCookie);
    }
    res.setHeader("HX-Redirect", "/login");
    return res.status(HTTP_CODES.OK).end();
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).end();
  }
};
