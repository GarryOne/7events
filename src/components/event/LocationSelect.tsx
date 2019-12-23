import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

function loadScript(src: string, position: HTMLElement | null, id: string) {

  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

interface PlaceType {
  structured_formatting: {
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      }
      ];
  };
}

export default function GoogleMaps() {
  const classes = useStyles();
  //TODO add to .env
  const gMapsApiKey = 'AIzaSyDEghbBwMptrjhaBo16TMRL3z4pK3UN438';

  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${gMapsApiKey}&v=3.exp&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }
  // TODO fix lat and long
  const initMap = () => {
    const map = new (window as any).google.maps.Map(document.querySelector('#map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 15
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const fetch = React.useMemo(
    () =>
      throttle((input, callback) => {
        (autocompleteService.current as any).getPlacePredictions(input, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
     <>
        <Autocomplete
          id="google-maps"
          getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
          filterOptions={x => x}
          options={options}
          autoComplete
          includeInputInList
          freeSolo
          disableOpenOnFocus
          renderInput={params => (
            <TextField
              {...params}
              label="Add a location"
              fullWidth
              onChange={handleChange}
            />
          )}
          renderOption={option => {
            const matches = option.structured_formatting.main_text_matched_substrings;
            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match: any) => [match.offset, match.offset + match.length]),
            );

            return (
              <Grid container alignItems="center">
                <Grid item>
                  <LocationOnIcon className={classes.icon} />
                </Grid>
                <Grid item xs>
                  {parts.map((part, index) => (
                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                      {part.text}
                    </span>
                  ))}
                  <Typography variant="body2" color="textSecondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
        />
       {/*<div id='map' style={ {width: '100%', height: '200px'} }></div>*/}
      </>
  );
}
