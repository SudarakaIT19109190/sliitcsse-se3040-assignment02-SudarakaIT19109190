import React, { useEffect, useState } from "react";
import styles from "./ImageCard.module.scss";
import { getImageOfTheDay } from "@/app/utils/apiService";
import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

export default function ImageCard() {
  const [imageOfTheDay, setImageOfTheDay] = useState<any>(null);

  useEffect(() => {
    fetchImageOfTheDay();
  }, []);

  const fetchImageOfTheDay = async () => {
    const image = await getImageOfTheDay();
    setImageOfTheDay(image);
  };

  return (
    <Card className={styles.imageCard}>
      <CardContent>
        {imageOfTheDay ? (
          <>
            <Typography sx={{ fontSize: 20 }}>
              {imageOfTheDay.title}
            </Typography>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {imageOfTheDay.date}
            </Typography>
            <div className={styles.imageContainer}>
              <Image src={imageOfTheDay?.url} fill alt="Image of the Day" />
            </div>
            <Typography sx={{ mb: 1.5 }}>
              {imageOfTheDay?.explanation ?? <p>imageOfTheDay?.explanation</p>}
            </Typography>
          </>
        ) : (
          <Typography sx={{ fontSize: 16 }} gutterBottom>
            Loading ...
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
