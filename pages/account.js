import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/account.module.scss";
import toast from "react-hot-toast";
import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";

const AccountPage = () => {
  const [state, setState] = useState("signin");
  const [form, setForm] = useState({
    username: null,
    email: null,
    password: null,
  });

  const _handleChange = (e) => {
    setForm((obj) =>
      Object.assign(
        { ...obj },
        { [e.target.getAttribute("name")]: e.target.value }
      )
    );
  };

  const _handleSubmit = async () => {
    try {
      if (state === "signup" && !form.username) throw "invalid username";
      if (!form.email) throw "invalid email";
      if (!form.password) throw "invalid password";
      let formData = { ...form };
      if (state === "signin") delete formData.username;
      toast.loading(`signing you ${state === "signin" ? "in" : "up"}`);
      const { data } = await axios.post(`/api/auth/${state}`, formData, {
        skipAuthRefresh: true,
      });
      toast.dismiss();
      localStorage.setItem("tokens", window?.btoa(JSON.stringify(data?.data)));
      toast.success("Signed In");
      Router.replace("/");
    } catch (error) {
      toast.dismiss();
      error.isAxiosError
        ? toast.error(error?.response?.data?.message)
        : toast.error("an error occurred");
    }
  };

  const options = {
    className: "input",
    onKeyUp: (e) => _handleChange(e),
    onKeyDown: (e) =>
      e.key === "Enter" || e.keyCode === 13 ? e.preventDefault() : null,
  };

  useEffect(() => {
    let tokens = localStorage?.getItem("tokens");
    if (tokens) Router.replace("/");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Yummy Pickle - Account</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.heading}>
            {state === "signin"
              ? "Sign In to your Account"
              : "Sign Up for a new Account"}
          </div>
          <div>
            {state === "signin" ? (
              <></>
            ) : (
              <div className={styles.input_container}>
                <label htmlFor="username">Pick a Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  {...options}
                />
              </div>
            )}
            <div className={styles.input_container}>
              <label htmlFor="email">Enter Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                {...options}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                {...options}
              />
            </div>
            <div className={styles.input_container}>
              <button
                className="button"
                style={{ width: "100%" }}
                onClick={() => _handleSubmit()}
              >
                {state === "signin" ? "Sign In" : "Sign Up"}
                <i
                  className="ri-arrow-right-s-line"
                  style={{
                    marginLeft: 2,
                  }}
                ></i>
              </button>
            </div>
          </div>

          <div className={styles.links}>
            {state === "signin" ? (
              <>
                <Link href={"/"}>
                  <a>
                    <i
                      className="ri-arrow-left-s-line"
                      style={{
                        marginRight: 2,
                        marginLeft: 0,
                      }}
                    ></i>
                    Home
                  </a>
                </Link>
                <a onClick={() => setState("signup")}>
                  Create a Account
                  <i className="ri-arrow-right-s-line"></i>
                </a>
              </>
            ) : (
              <a onClick={() => setState("signin")}>
                <i
                  className="ri-arrow-left-s-line"
                  style={{
                    marginRight: 2,
                    marginLeft: 0,
                  }}
                ></i>
                Back to Sign In
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
