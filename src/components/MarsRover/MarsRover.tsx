import {
  Card,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import styles from "./MarsRover.module.scss";
import { useEffect, useState } from "react";
import { getMarsRoverImage } from "@/app/utils/apiService";
import { RoverCameras } from "@/app/utils/constants";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

export default function MarsRover() {
  const minDate = moment("2015-01-01", "YYYY-MM-DD");
  const maxDate = moment("2019-12-31", "YYYY-MM-DD");
  const [images, setImages] = useState<any>(null);
  const [date, setDate] = useState<moment.Moment>(minDate);
  const [camera, setCamera] = useState<RoverCameras>(RoverCameras.FHAZ);

  useEffect(() => {
    fetchRoverImages();
  }, []);

  useEffect(() => {
    fetchRoverImages();
  }, [date, camera]);

  const fetchRoverImages = async () => {
    const images = await getMarsRoverImage(camera, date.format("YYYY-MM-DD"));
    setImages(images.photos);
  };

  const onChangeDate = (date: null | moment.Moment) => {
    if (date) {
      setDate(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Card className={styles.root}>
        <div className={styles.leftSection}>
          <nav aria-label="camera options">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setCamera(RoverCameras.FHAZ)}>
                  <ListItemText primary="Front Hazard Avoidance Camera" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  onClick={() => setCamera(RoverCameras.RHAZ)}
                >
                  <ListItemText primary="Rear Hazard Avoidance Camera" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  onClick={() => setCamera(RoverCameras.MAST)}
                >
                  <ListItemText primary="Mast Camera" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  onClick={() => setCamera(RoverCameras.CHEMCAM)}
                >
                  <ListItemText primary="Chemistry and Camera Complex" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  onClick={() => setCamera(RoverCameras.MAHLI)}
                >
                  <ListItemText primary="Mars Hand Lens Imager" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  onClick={() => setCamera(RoverCameras.MARDI)}
                >
                  <ListItemText primary="Mars Descent Imager" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  onClick={() => setCamera(RoverCameras.NAVCAM)}
                >
                  <ListItemText primary="Navigation Camera" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </div>
        <div className={styles.rightSection}>
          <DatePicker
            label="Image date"
            maxDate={maxDate}
            minDate={minDate}
            defaultValue={date}
            onChange={onChangeDate}
            sx={{
              '.MuiInputLabel-root': {
                color: '#fff',
              },
              '.MuiInputBase-root': {
                color: '#fff',
                backgroundColor: '#7b7b7b',
              },
              '.MuiSvgIcon-root': {
                fill: '#fff',
              },
            }}
          />
          {images && images.length > 0 && (
            <ImageList sx={{ height: 450 }} cols={3} rowHeight={164}>
              {images.map((item: any) => (
                <ImageListItem key={item.id}>
                  <img
                    srcSet={`${item.img_src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img_src}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.id}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          {images && images.length == 0 && (
            <Typography> No Images available for your selection </Typography>
          )}
        </div>
      </Card>
    </LocalizationProvider>
  );
}
