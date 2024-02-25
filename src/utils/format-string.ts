import numeral from 'numeral';

// ----------------------------------------------------------------------

type InputValue = string | number | null;

export const extractStringFromUrl = (inputValue: string) => {
  const pdfRegex = /\/([^\/]+)\.pdf$/;
  const docxRegex = /\/([^\/]+)\.docx$/;
  const docRegex = /\/([^\/]+)\.doc$/;
  const pptRegex = /\/([^\/]+)\.ppt$/;

  const pdfMatch = inputValue.match(pdfRegex);
  const docxMatch = inputValue.match(docxRegex);
  const docMatch = inputValue.match(docRegex);
  const pptMatch = inputValue.match(pptRegex);

  if (pdfMatch && pdfMatch[1]) {
    return pdfMatch[1]; // Found a match for PDF
  } else if (docxMatch && docxMatch[1]) {
    return docxMatch[1]; // Found a match for DOCX
  } else if (docMatch && docMatch[1]) {
    return docMatch[1]; // Found a match for DOCX
  } else if (pptMatch && pptMatch[1]) {
    return pptMatch[1]; // Found a match for DOCX
  } else {
    return null; // No match found for PDF or DOCX
  }
};

export const extractURLName = (url: string) => {
  const match = url.match(/www\.([^.]+)\.([^\/]+)/);
  if (match) {
    const firstWord = match[1];
    const secondWord = match[2].split('.')[0];
    return `${firstWord}.${secondWord}`;
  }
  return extractNameFromUrl(url); // Handle cases where the pattern doesn't match
};



export const extractNameFromUrl = (url: string) => {
  // Check if the URL contains "/projekat/"
  if (url.includes('/pregled-projekta/')) {
    return url;
  }

  // Define a regular expression to match the first case
  const regex = /^https?:\/\/(?:www\.)?([^/]+)\.\w+\/?/;

  // Use the regex to match the URL
  const match = url.match(regex);

  // Check if there is a match and if there is a captured group
  if (match && match.length > 1) {
    // Return the content of the first captured group (index 1)
    return match[1];
  }

  // Return an empty string if no match is found
  return '';
};
