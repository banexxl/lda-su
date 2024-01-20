import numeral from 'numeral';

// ----------------------------------------------------------------------

type InputValue = string | number | null;

export const extractStringFromPDFUrl = (InputValue: string) => {
  const regex = /\/([^\/]+)\.pdf$/;
  const match = InputValue.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null; // No match found
  }
}

export const extractFileName = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 1]; // Get the last part (file name)
};


export const extractNameFromUrl = (url: string) => {
  const regex = /^https?:\/\/(?:www\.)?([^/]+)\.\w+\/?/;
  const match = url.match(regex);
  if (match && match.length > 1) {
    return match[1];
  }
  return ''; // Return empty string if the match is not found
};
