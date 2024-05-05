"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Login.module.scss";
import { useEffect, useState } from "react";
import { useSession } from "../session-content";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserToken, userToken } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(userToken) {
      router.push("/");
    }
  }, [userToken])

  const handleLogin = async () => {
    const isAuthenticated =
      email === "user@example.com" && password === "password123";

    if (isAuthenticated) {
      const newUserToken = "exampleToken123";

      setUserToken(newUserToken);

      router.push("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <main className={styles.root}>
      <Card className={styles.loginContainer}>
        <CardContent className={styles.loginContainer}>
          <Typography>Login</Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            sx={{
              backgroundColor: "#aeaeae",
              borderRadius: "5px",
              width: "400px",
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            sx={{
              backgroundColor: "#aeaeae",
              borderRadius: "5px",
              width: "400px",
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            sx={{ backgroundColor: "#505050", color: "#fff" }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </main>
  );
}
