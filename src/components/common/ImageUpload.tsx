import React from "react";
import firebase from "firebase";
import { makeStyles, createStyles, Theme }from "@material-ui/core/styles";
import { Button, Grid, IconButton }from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

interface Image {
  image: null,
  url: "",
  progress: 0
}

interface IProps {
  imagesFolder?: string;
  onChange?: (url: any) => void;
}

const ImageUpload = (props: IProps) => {
  const classes = useStyles();
  const imagesFolder = 'event-profile-images';
  const [bucketFolder, setBucketFolder] = React.useState<string>(imagesFolder);
  const [image, setImage] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [imageDownloadUrl, setImageDownloadUrl] = React.useState<string>('');

  React.useEffect(() => {
    if(props.imagesFolder) {
      setBucketFolder(props.imagesFolder);
    }
  }, [props.imagesFolder]);

  React.useEffect(() => {
    if(props.onChange && imageDownloadUrl) {
      props.onChange(imageDownloadUrl);
    }
  }, [imageDownloadUrl]);
  // TODO not working if same image is uploaded after delete
  const handleChange = (e: any) => {
    if (!uploading && e.target.files[0]) {
      const uploadedImage = e.target.files[0];
      setImage(uploadedImage);
      handleUpload(uploadedImage);
    }
  };

  const handleUpload = (newImage: any) => {
    setUploading(true);
    // TODO generate unique image name
    const uploadTask = firebase.storage().ref(`${bucketFolder}/${newImage.name}`).put(newImage);
    uploadTask.on(
      "state_changed",
      null,
      error => {
        // Error function ...
        console.log(error);
        setUploading(false);
      },
      () => {
        // complete function ...
        firebase.storage()
          .ref(`${bucketFolder}`)
          .child(newImage.name)
          .getDownloadURL()
          .then((url: string) => {
            setImageDownloadUrl(url);
          });
      }
    );
  };

  const removeImage = () => {
    console.log(image);
    setUploading(false);
    firebase.storage()
      .ref(`${bucketFolder}`)
      .child(image.name)
      .delete()
      .then((res) => {
        setImage(null);
        setImageDownloadUrl('');
      })
  };

  return (

    <>
      <img
        src={imageDownloadUrl || '/assets/images/image-placeholder.png'}
        width="300"
        height="auto"
      />
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        disabled={uploading}
        onChange={handleChange}
      />
    <Grid className={classes.uploadLabel}>
      {
        (image && image.name) && (
          <p>
            {image.name}
            <IconButton
              color='secondary'
              onClick={removeImage}
              aria-label="delete"
              className={classes.margin}
              size="small"
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </p>
        )
      }
      <label htmlFor="contained-button-file">
        <Button disabled={uploading} variant="outlined" color="primary" component="span">
          Add image
        </Button>
      </label>
    </Grid>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: 'none',
    },
    uploadLabel: {
      margin: '10px 0',
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);


export default ImageUpload;
