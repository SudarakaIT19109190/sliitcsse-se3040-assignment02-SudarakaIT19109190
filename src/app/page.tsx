"use client";
import styles from "./page.module.scss";
import ImageCard from "@/components/ImageCard/ImageCard";
import NavBar from "@/components/NavBar/NavBar";
import { Typography } from "@mui/material";
import MarsRover from "@/components/MarsRover/MarsRover";
import { useSession } from "./session-content";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userToken } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!userToken) {
      router.push("/login");
    }
  }, [userToken, router]);

  if (!userToken) {
    return null;
  }

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.body}>
        <Typography>Astronomy Image of the day</Typography>
        <ImageCard />
        <Typography>Mars Rover Images</Typography>
        <MarsRover />
      </div>
    </main>
  );
}
